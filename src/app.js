import path from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config.js";
import routes from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const viewsDir = path.join(__dirname, "..", "views");

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  if (config.trustProxy) {
    app.set("trust proxy", 1);
  }

  app.set("view engine", "ejs");
  app.set("views", viewsDir);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", "https:", "data:"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.use(compression());
  app.use(morgan(config.isProduction ? "combined" : "dev"));
  app.use(express.json({ limit: "32kb" }));
  app.use(express.urlencoded({ extended: true, limit: "32kb" }));

  app.use(
    express.static(publicDir, {
      index: false,
      etag: true,
      maxAge: config.isProduction ? "1d" : 0,
    }),
  );

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
  });

  app.use(routes);

  app.use((req, res) => {
    if (req.path.startsWith("/api/")) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.status(404).send("Page not found");
  });

  app.use((err, _req, res, _next) => {
    if (config.isProduction) {
      res.status(500).send("Something went wrong.");
      return;
    }

    console.error(err);
    res.status(500).json({ error: err.message });
  });

  return app;
}
