"use server";

import { headers } from "next/headers";
import { connectDB } from "@/lib/db/connect";
import AlumniSignupSubmission from "@/models/AlumniSignupSubmission";
import {
  alumniSignupSchema,
  type AlumniSignupInput,
} from "@/lib/validation/alumni-signup";
import type { ActionResult } from "@/lib/actions/admin/shared";
import { sendAlumniSignupNotificationEmail } from "@/lib/email/send-alumni-signup-email";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, number[]>();

function getClientKey(email: string, ip: string): string {
  return `alumni:${ip}:${email.toLowerCase()}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(key) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(key, timestamps);
  return false;
}

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown"
  );
}

export async function submitAlumniSignup(
  input: AlumniSignupInput,
): Promise<ActionResult<{ message: string }>> {
  const parsed = alumniSignupSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid form submission.",
    };
  }

  if (parsed.data.honeypot) {
    return {
      success: true,
      data: { message: "Thank you for joining the alumni network." },
    };
  }

  const ip = await getClientIp();
  const rateKey = getClientKey(parsed.data.email, ip);

  if (isRateLimited(rateKey)) {
    return {
      success: false,
      error: "Too many submissions. Please wait a minute and try again.",
    };
  }

  try {
    await connectDB();

    await AlumniSignupSubmission.create({
      name: parsed.data.name,
      email: parsed.data.email,
      address: parsed.data.address || undefined,
      city: parsed.data.city || undefined,
      state: parsed.data.state || undefined,
      zip: parsed.data.zip || undefined,
      cellPhone: parsed.data.cellPhone || undefined,
      graduationYear: parsed.data.graduationYear || undefined,
      sportsPlayed: parsed.data.sportsPlayed,
      gender: parsed.data.gender || undefined,
      teammatesInContact: parsed.data.teammatesInContact || undefined,
      degreeEarned: parsed.data.degreeEarned || undefined,
      occupation: parsed.data.occupation || undefined,
      company: parsed.data.company || undefined,
      favoriteMemory: parsed.data.favoriteMemory || undefined,
      consent: parsed.data.consent,
      read: false,
    });

    try {
      await sendAlumniSignupNotificationEmail(parsed.data);
    } catch (error) {
      console.error("Failed to send alumni signup notification email:", error);
    }

    return {
      success: true,
      data: {
        message:
          "Thank you for signing up. We are proud to have you in the Mountie alumni family.",
      },
    };
  } catch {
    return {
      success: false,
      error: "Unable to submit your form. Please try again later.",
    };
  }
}
