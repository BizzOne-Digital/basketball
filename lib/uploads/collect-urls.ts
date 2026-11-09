import { STORED_UPLOAD_URL_PREFIX } from "@/lib/uploads/constants";

/** Finds every `/api/uploads/...` URL stored anywhere inside a JSON value. */
export function collectUploadUrls(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") {
    if (value.startsWith(STORED_UPLOAD_URL_PREFIX)) {
      found.push(value);
    }
  } else if (Array.isArray(value)) {
    for (const item of value) {
      collectUploadUrls(item, found);
    }
  } else if (typeof value === "object" && value !== null) {
    for (const item of Object.values(value)) {
      collectUploadUrls(item, found);
    }
  }

  return found;
}
