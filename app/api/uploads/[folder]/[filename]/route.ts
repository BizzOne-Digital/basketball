import { NextResponse } from "next/server";
import { getStoredUpload } from "@/lib/uploads/stored-uploads";

export const runtime = "nodejs";

interface UploadAssetRouteProps {
  params: Promise<{ folder: string; filename: string }>;
}

export async function GET(_request: Request, { params }: UploadAssetRouteProps) {
  try {
    const { folder, filename } = await params;
    const asset = await getStoredUpload(folder, filename);

    if (!asset) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    return new Response(new Uint8Array(asset.data), {
      status: 200,
      headers: {
        "Content-Type": asset.mimeType,
        "Content-Length": String(asset.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load file.";
    const status =
      message.includes("Invalid") || message.includes("Unsupported") ? 400 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
