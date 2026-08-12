export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;

export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024;

export const ALLOWED_UPLOAD_MIME_TYPES = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export const STORED_UPLOAD_URL_PREFIX = "/api/uploads/";

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}
