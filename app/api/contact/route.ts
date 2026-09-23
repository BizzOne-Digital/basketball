import { NextResponse } from "next/server";
import { submitContactForm } from "@/lib/actions/contact";
import { contactSubmissionSchema } from "@/lib/validation/common";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors[0]?.message ?? "Invalid submission.",
        },
        { status: 400 },
      );
    }

    const result = await submitContactForm(parsed.data);

    if (!result.success) {
      return NextResponse.json(result, { status: 429 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }
}
