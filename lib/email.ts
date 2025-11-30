import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "@/emails/verification-email";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(
  to: string,
  name: string,
  verificationUrl: string
) {
  try {
    const emailHtml = await render(
      VerificationEmail({ name, verificationUrl })
    );

    await transporter.sendMail({
      // from: process.env.SMTP_FROM || "noreply@example.com",
      from: `"no-responder 🍫" <${process.env.SMTP_FROM}>`,
      to,
      subject: "Verifica tu dirección de correo electrónico",
      html: emailHtml,
    });

    console.log("[v0] Verification email sent to:", to);
  } catch (error) {
    console.error("[v0] Error sending verification email:", error);
    throw error;
  }
}
