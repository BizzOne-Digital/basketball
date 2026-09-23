import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import {
  deleteStoredUploadByUrl,
  storeUploadedFile,
} from "@/lib/uploads/stored-uploads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (typeof folder !== "string" || !folder.trim()) {
      return NextResponse.json(
        { error: "Upload folder is required." },
        { status: 400 },
      );
    }

    const result = await storeUploadedFile(file, folder);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    const status = message.includes("Unauthorized")
      ? 401
      : message.includes("Forbidden")
        ? 403
        : message.includes("Invalid") ||
            message.includes("Unsupported") ||
            message.includes("exceeds")
          ? 400
          : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();

    const body = (await request.json()) as { url?: string };
    const url = body.url?.trim();

    if (!url) {
      return NextResponse.json({ error: "Upload URL is required." }, { status: 400 });
    }

    const deleted = await deleteStoredUploadByUrl(url);

    return NextResponse.json({
      success: true,
      deleted,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed.";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
