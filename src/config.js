import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const nodeEnv = process.env.NODE_ENV || "development";

const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const contactTo = process.env.CONTACT_TO || smtpUser;

export const config = {
  port: Number.isFinite(port) ? port : 3000,
  nodeEnv,
  isProduction: nodeEnv === "production",
  trustProxy: process.env.TRUST_PROXY === "true",
  resume: {
    fileName: process.env.RESUME_FILE || "resume.pdf",
    downloadName:
      process.env.RESUME_DOWNLOAD_NAME || "Shubham-Rathod-Resume.pdf",
  },
  mail: {
    isConfigured: Boolean(smtpUser && smtpPass && contactTo),
    to: contactTo,
    from: process.env.CONTACT_FROM || `Portfolio <${smtpUser}>`,
    smtp: {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      user: smtpUser,
      pass: smtpPass,
    },
  },
};
