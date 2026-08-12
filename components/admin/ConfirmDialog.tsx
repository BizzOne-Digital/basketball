"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive,
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#04101F]/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-label="Close dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-[#04101F]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[#343A40]">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-[#B7C0CC]/50 px-4 py-2 text-sm font-medium text-[#343A40] hover:bg-[#F7F9FC]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60",
              destructive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#0B2F63] hover:bg-[#04101F]"
            )}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
