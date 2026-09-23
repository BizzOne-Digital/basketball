"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { resolveImagePath } from "@/lib/images";
import type { UploadFolder } from "@/lib/uploads/constants";
import { STORED_UPLOAD_URL_PREFIX } from "@/lib/uploads/constants";
import { toast } from "sonner";

type ImageUploadFieldProps = {
  label: string;
  folder: UploadFolder;
  value?: string;
  altValue?: string;
  onChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
  hint?: string;
  className?: string;
};

async function deleteStoredUpload(url: string) {
  if (!url.startsWith(STORED_UPLOAD_URL_PREFIX)) {
    return;
  }

  const res = await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? "Failed to delete image");
  }
}

export function ImageUploadField({
  label,
  folder,
  value,
  altValue,
  onChange,
  onAltChange,
  hint,
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const previewSrc = value ? resolveImagePath({ path: value, alt: altValue ?? "" }) : "";

  const handleUpload = async (file: File) => {
    setUploading(true);
    const previousUrl = value;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as {
        error?: string;
        url?: string;
      };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed");
      }

      onChange(data.url);
      toast.success("Image uploaded");

      if (previousUrl && previousUrl !== data.url) {
        try {
          await deleteStoredUpload(previousUrl);
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Uploaded, but failed to remove previous image",
          );
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!value) {
      return;
    }

    setUploading(true);

    try {
      await deleteStoredUpload(value);
      onChange("");
      toast.success("Image removed");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Remove failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-[#04101F]">{label}</label>
      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-[#B7C0CC]/40 bg-[#F7F9FC]">
          <div className="relative aspect-video max-h-48 w-full">
            <Image
              src={previewSrc}
              alt={altValue ?? "Preview"}
              fill
              className="object-cover"
              sizes="400px"
              unoptimized={previewSrc.startsWith(STORED_UPLOAD_URL_PREFIX)}
            />
          </div>
          <div className="flex items-center justify-between gap-2 p-3">
            <p className="min-w-0 truncate text-xs text-[#343A40]">{value}</p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="rounded-md bg-[#0B2F63] px-3 py-1 text-xs text-white hover:bg-[#04101F] disabled:opacity-60"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => void handleRemove()}
                disabled={uploading}
                className="rounded-md border border-red-200 p-1 text-red-600 hover:bg-red-50 disabled:opacity-60"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#B7C0CC]/50 bg-[#F7F9FC] px-6 py-10 text-[#343A40] hover:border-[#5BB9FF] hover:bg-[#5BB9FF]/5 disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-[#5BB9FF]" />
          ) : (
            <Upload className="h-8 w-8 text-[#5BB9FF]" />
          )}
          <span className="text-sm font-medium">
            {uploading ? "Uploading..." : "Click to upload image"}
          </span>
        </button>
      )}
      {onAltChange && (
        <input
          type="text"
          value={altValue ?? ""}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Alt text for accessibility"
          className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
        />
      )}
      {hint && <p className="text-xs text-[#B7C0CC]">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
