import { Router } from "express";
import { config } from "../config.js";
import { sendContactEmail } from "../services/mailer.js";

const router = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/", async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  if (!isValidEmail(email.trim())) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  if (message.trim().length < 10) {
    res
      .status(400)
      .json({ error: "Message must be at least 10 characters long." });
    return;
  }

  if (!config.mail.isConfigured) {
    res.status(503).json({
      error: "Email service is not configured. Set SMTP variables in .env",
    });
    return;
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (err) {
    console.error("Contact form error:", err);

    if (err.code === "EAUTH") {
      res.status(500).json({
        error: config.isProduction
          ? "Failed to send message. Please try again later."
          : "Gmail App Password required in SMTP_PASS (normal password won't work).",
      });
      return;
    }

    res.status(500).json({
      error: "Failed to send message. Please try again later.",
    });
  }
});

export default router;
