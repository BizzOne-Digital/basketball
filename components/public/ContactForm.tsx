"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSubmissionSchema,
  type ContactSubmissionInput,
} from "@/lib/validation/common";
import { submitContactForm } from "@/lib/actions/contact";
import { cn } from "@/lib/utils/cn";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactSubmissionInput>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      programInterest: "",
      message: "",
      consent: false,
      honeypot: "",
    },
  });

  function onSubmit(values: ContactSubmissionInput) {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      const result = await submitContactForm(values);

      if (result.success) {
        setMessage(result.data?.message ?? "Message sent.");
        form.reset();
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("space-y-5", className)}
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...form.register("honeypot")}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.16em] text-mountie-silver">
            Name
          </span>
          <input
            className="w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-mountie-white outline-none focus:border-ice-blue"
            {...form.register("name")}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.16em] text-mountie-silver">
            Email
          </span>
          <input
            type="email"
            className="w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-mountie-white outline-none focus:border-ice-blue"
            {...form.register("email")}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.16em] text-mountie-silver">
            Phone
          </span>
          <input
            className="w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-mountie-white outline-none focus:border-ice-blue"
            {...form.register("phone")}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.16em] text-mountie-silver">
            Program Interest
          </span>
          <input
            className="w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-mountie-white outline-none focus:border-ice-blue"
            {...form.register("programInterest")}
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-xs uppercase tracking-[0.16em] text-mountie-silver">
          Message
        </span>
        <textarea
          rows={6}
          className="w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-mountie-white outline-none focus:border-ice-blue"
          {...form.register("message")}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-mountie-silver">
        <input type="checkbox" className="mt-1" {...form.register("consent")} />
        <span>
          I agree to be contacted about Mountie Basketball programs and updates.
        </span>
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {message ? <p className="text-sm text-ice-blue">{message}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-midnight transition-opacity disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
