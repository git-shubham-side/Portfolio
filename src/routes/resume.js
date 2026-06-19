import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import { config } from "../config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get("/", (_req, res) => {
  const resumePath = path.join(
    __dirname,
    "../../public/resume",
    config.resume.fileName,
  );

  if (!fs.existsSync(resumePath)) {
    res.status(404).json({
      error: `Resume not found. Add your PDF as public/resume/${config.resume.fileName}`,
    });
    return;
  }

  res.download(resumePath, config.resume.downloadName);
});

export default router;
