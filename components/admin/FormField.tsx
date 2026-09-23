"use client";

import { cn } from "@/lib/utils/cn";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  label: string;
  name: string;
  error?: FieldError;
  hint?: string;
  required?: boolean;
  children?: React.ReactNode;
  registration?: UseFormRegisterReturn;
  type?: "text" | "email" | "url" | "number" | "password" | "date" | "datetime-local";
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
  rows?: number;
  placeholder?: string;
  className?: string;
};

export function FormField({
  label,
  name,
  error,
  hint,
  required,
  children,
  registration,
  type = "text",
  as = "input",
  options,
  rows = 4,
  placeholder,
  className,
}: FormFieldProps) {
  const inputClasses = cn(
    "w-full rounded-lg border border-[#B7C0CC]/50 bg-white px-3 py-2 text-sm text-[#04101F] placeholder:text-[#B7C0CC] focus:border-[#5BB9FF] focus:outline-none focus:ring-2 focus:ring-[#5BB9FF]/20",
    error && "border-red-400 focus:border-red-400 focus:ring-red-200"
  );

  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={name} className="block text-sm font-medium text-[#04101F]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children ??
        (as === "textarea" ? (
          <textarea
            id={name}
            rows={rows}
            placeholder={placeholder}
            className={inputClasses}
            {...registration}
          />
        ) : as === "select" ? (
          <select id={name} className={inputClasses} {...registration}>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            className={inputClasses}
            {...registration}
          />
        ))}
      {hint && !error && <p className="text-xs text-[#B7C0CC]">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#B7C0CC]/40 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#04101F]">{title}</h2>
        {description && <p className="mt-1 text-sm text-[#B7C0CC]">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function SubmitButton({
  loading,
  label = "Save Changes",
}: {
  loading?: boolean;
  label?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="rounded-lg bg-[#0B2F63] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#04101F] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Saving..." : label}
    </button>
  );
}
