import nodemailer from "nodemailer";
import type { ContactSubmissionInput } from "@/lib/validation/common";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

export function isContactEmailConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export async function sendContactNotificationEmail(
  submission: ContactSubmissionInput,
): Promise<void> {
  const smtp = getSmtpConfig();

  if (!smtp) {
    console.warn("Contact email skipped: SMTP is not configured.");
    return;
  }

  const from =
    process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "noreply@localhost";
  const to =
    process.env.CONTACT_TO_EMAIL ??
    process.env.SMTP_USER ??
    "admin@localhost";

  const transporter = nodemailer.createTransport(smtp);

  const lines = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    submission.phone ? `Phone: ${submission.phone}` : null,
    submission.programInterest
      ? `Program Interest: ${submission.programInterest}`
      : null,
    "",
    "Message:",
    submission.message,
  ].filter((line): line is string => line !== null);

  await transporter.sendMail({
    from: `Mountaineer Basketball <${from}>`,
    to,
    replyTo: submission.email,
    subject: `New contact form message from ${submission.name}`,
    text: lines.join("\n"),
    html: lines.map((line) => `<p>${line.replace(/\n/g, "<br>")}</p>`).join(""),
  });
}
