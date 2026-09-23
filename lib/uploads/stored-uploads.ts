import { randomBytes } from "node:crypto";
import connectDB from "@/lib/db/connect";
import StoredUpload from "@/models/StoredUpload";
import {
  ALLOWED_UPLOAD_MIME_TYPES,
  isUploadFolder,
  MAX_UPLOAD_SIZE_BYTES,
  STORED_UPLOAD_URL_PREFIX,
  type UploadFolder,
} from "@/lib/uploads/constants";

export interface StoredUploadResult {
  success: true;
  url: string;
  filename: string;
  size: number;
  folder: UploadFolder;
}

function sanitizeFilename(filename: string): string {
  if (
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\") ||
    filename.includes("\0")
  ) {
    throw new Error("Invalid filename");
  }

  return filename;
}

function sanitizeFolder(folder: string): UploadFolder {
  const normalized = folder.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");

  if (!isUploadFolder(normalized)) {
    throw new Error("Invalid upload folder");
  }

  return normalized;
}

function buildPublicUrl(folder: UploadFolder, filename: string): string {
  return `${STORED_UPLOAD_URL_PREFIX}${folder}/${filename}`;
}

function generateFilename(mimeType: string): string {
  const extension = ALLOWED_UPLOAD_MIME_TYPES.get(mimeType);

  if (!extension) {
    throw new Error("Unsupported file type");
  }

  return `${Date.now()}-${randomBytes(8).toString("hex")}${extension}`;
}

export function parseStoredUploadUrl(
  url: string,
): { folder: UploadFolder; filename: string } | null {
  if (!url.startsWith(STORED_UPLOAD_URL_PREFIX)) {
    return null;
  }

  const remainder = url.slice(STORED_UPLOAD_URL_PREFIX.length);
  const slashIndex = remainder.indexOf("/");

  if (slashIndex <= 0) {
    return null;
  }

  const folder = remainder.slice(0, slashIndex);
  const filename = remainder.slice(slashIndex + 1);

  if (!isUploadFolder(folder)) {
    return null;
  }

  try {
    return {
      folder,
      filename: sanitizeFilename(filename),
    };
  } catch {
    return null;
  }
}

export async function storeUploadedFile(
  file: File,
  folderInput: string,
): Promise<StoredUploadResult> {
  const folder = sanitizeFolder(folderInput);

  if (!ALLOWED_UPLOAD_MIME_TYPES.has(file.type)) {
    throw new Error("Unsupported file type. Use JPEG, PNG, WebP, or GIF.");
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("File exceeds maximum size of 8MB");
  }

  const data = Buffer.from(await file.arrayBuffer());
  const filename = generateFilename(file.type);

  await connectDB();

  await StoredUpload.create({
    folder,
    filename,
    mimeType: file.type,
    size: data.length,
    data,
  });

  return {
    success: true,
    url: buildPublicUrl(folder, filename),
    filename,
    size: data.length,
    folder,
  };
}

export async function getStoredUpload(
  folderInput: string,
  filenameInput: string,
): Promise<{ mimeType: string; size: number; data: Buffer } | null> {
  const folder = sanitizeFolder(folderInput);
  const filename = sanitizeFilename(filenameInput);

  await connectDB();

  const document = await StoredUpload.findOne({ folder, filename })
    .select("mimeType size data")
    .lean<{ mimeType: string; size: number; data: Buffer }>();

  if (!document?.data) {
    return null;
  }

  return {
    mimeType: document.mimeType,
    size: document.size,
    data: document.data,
  };
}

export async function deleteStoredUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseStoredUploadUrl(url);

  if (!parsed) {
    return false;
  }

  await connectDB();

  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });

  return result.deletedCount > 0;
}

export async function deleteStoredUpload(
  folderInput: string,
  filenameInput: string,
): Promise<boolean> {
  const folder = sanitizeFolder(folderInput);
  const filename = sanitizeFilename(filenameInput);

  await connectDB();

  const result = await StoredUpload.deleteOne({ folder, filename });
  return result.deletedCount > 0;
}
