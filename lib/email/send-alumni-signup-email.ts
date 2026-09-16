import nodemailer from "nodemailer";
import type { AlumniSignupInput } from "@/lib/validation/alumni-signup";

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

function formatField(label: string, value?: string | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return `${label}: ${trimmed}`;
}

export async function sendAlumniSignupNotificationEmail(
  submission: AlumniSignupInput,
): Promise<void> {
  const smtp = getSmtpConfig();

  if (!smtp) {
    console.warn("Alumni signup email skipped: SMTP is not configured.");
    return;
  }

  const from =
    process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "noreply@localhost";
  const to =
    process.env.ALUMNI_TO_EMAIL ??
    process.env.CONTACT_TO_EMAIL ??
    process.env.SMTP_USER ??
    "admin@localhost";

  const transporter = nodemailer.createTransport(smtp);

  const lines = [
    formatField("Name", submission.name),
    formatField("Email", submission.email),
    formatField("Cell Phone", submission.cellPhone),
    formatField("Address", submission.address),
    formatField("City", submission.city),
    formatField("State", submission.state),
    formatField("Zip", submission.zip),
    formatField("Graduation Year", submission.graduationYear),
    formatField("Sports Played", submission.sportsPlayed),
    formatField("Gender", submission.gender),
    formatField("Degree Earned", submission.degreeEarned),
    formatField("Occupation", submission.occupation),
    formatField("Company", submission.company),
    formatField(
      "Teammates You Keep In Contact With",
      submission.teammatesInContact,
    ),
    "",
    "Favorite Mountie / P-O Basketball Memory:",
    submission.favoriteMemory?.trim() || "(not provided)",
  ].filter((line): line is string => line !== null);

  const text = lines.join("\n");
  const html = lines
    .map((line) => `<p>${line.replace(/\n/g, "<br>")}</p>`)
    .join("");

  await transporter.sendMail({
    from: `Mountaineer Basketball <${from}>`,
    to,
    replyTo: submission.email,
    subject: `New P-O Basketball alumni sign-up: ${submission.name}`,
    text,
    html,
  });
}
