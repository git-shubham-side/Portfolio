import http from "node:http";
import { createApp } from "./app.js";
import { config } from "./config.js";

const app = createApp();
const server = http.createServer(app);

const SHUTDOWN_TIMEOUT_MS = 10_000;

function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down...`);

  const forceExit = setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);

  forceExit.unref();

  server.close((err) => {
    clearTimeout(forceExit);
    if (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
      return;
    }
    console.log("Server closed.");
    process.exit(0);
  });
}

server.listen(config.port, () => {
  console.log(
    `Portfolio running at http://localhost:${config.port} [${config.nodeEnv}]`,
  );
});

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

server.on("error", (err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
