import nodemailer from "nodemailer";
import { config } from "../config.js";

let transporter;

function getTransporter() {
  if (!config.mail.isConfigured) {
    throw new Error("Email is not configured");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.mail.smtp.host,
      port: config.mail.smtp.port,
      secure: config.mail.smtp.secure,
      auth: {
        user: config.mail.smtp.user,
        pass: config.mail.smtp.pass,
      },
    });
  }

  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  const transport = getTransporter();

  await transport.sendMail({
    from: config.mail.from,
    to: config.mail.to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
}
