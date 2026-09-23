export {
  ALLOWED_UPLOAD_MIME_TYPES as ALLOWED_MIME_TYPES,
  MAX_UPLOAD_SIZE_BYTES as DEFAULT_MAX_FILE_SIZE_BYTES,
  UPLOAD_FOLDERS,
  type UploadFolder,
} from "@/lib/uploads/constants";

export {
  deleteStoredUpload,
  deleteStoredUploadByUrl,
  getStoredUpload,
  parseStoredUploadUrl,
  storeUploadedFile,
  type StoredUploadResult,
} from "@/lib/uploads/stored-uploads";

/** @deprecated Legacy disk uploads are no longer used in production. */
export async function deleteFile(): Promise<void> {
  return;
}
