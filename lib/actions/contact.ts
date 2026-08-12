"use server";

import { headers } from "next/headers";
import { connectDB } from "@/lib/db/connect";
import ContactSubmission from "@/models/ContactSubmission";
import {
  contactSubmissionSchema,
  type ContactSubmissionInput,
} from "@/lib/validation/common";
import type { ActionResult } from "@/lib/actions/admin/shared";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, number[]>();

function getClientKey(email: string, ip: string): string {
  return `${ip}:${email.toLowerCase()}`;
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

export async function submitContactForm(
  input: ContactSubmissionInput,
): Promise<ActionResult<{ message: string }>> {
  const parsed = contactSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid form submission.",
    };
  }

  if (parsed.data.honeypot) {
    return { success: true, data: { message: "Thank you for your message." } };
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

    await ContactSubmission.create({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      programInterest: parsed.data.programInterest,
      message: parsed.data.message,
      consent: parsed.data.consent,
      read: false,
    });

    return {
      success: true,
      data: {
        message:
          "Thank you for reaching out. A member of our team will respond soon.",
      },
    };
  } catch {
    return {
      success: false,
      error: "Unable to submit your message. Please try again later.",
    };
  }
}
