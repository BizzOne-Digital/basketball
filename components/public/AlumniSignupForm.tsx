"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  alumniSignupSchema,
  type AlumniSignupInput,
} from "@/lib/validation/alumni-signup";
import { submitAlumniSignup } from "@/lib/actions/alumni-signup";
import { cn } from "@/lib/utils/cn";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-mountie-white outline-none focus:border-ice-blue";
const labelClassName =
  "text-xs uppercase tracking-[0.16em] text-mountie-silver";

interface AlumniSignupFormProps {
  className?: string;
}

export function AlumniSignupForm({ className }: AlumniSignupFormProps) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AlumniSignupInput>({
    resolver: zodResolver(alumniSignupSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      cellPhone: "",
      email: "",
      graduationYear: "",
      sportsPlayed: "Basketball",
      gender: "",
      teammatesInContact: "",
      degreeEarned: "",
      occupation: "",
      company: "",
      favoriteMemory: "",
      consent: false,
      honeypot: "",
    },
  });

  function onSubmit(values: AlumniSignupInput) {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      const result = await submitAlumniSignup(values);

      if (result.success) {
        setMessage(result.data?.message ?? "Thank you for signing up.");
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
      noValidate
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...form.register("honeypot")}
      />

      <label className="block space-y-2">
        <span className={labelClassName}>Name *</span>
        <input className={inputClassName} {...form.register("name")} />
        {form.formState.errors.name ? (
          <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className={labelClassName}>Address</span>
        <input className={inputClassName} {...form.register("address")} />
      </label>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2">
          <span className={labelClassName}>City</span>
          <input className={inputClassName} {...form.register("city")} />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>State</span>
          <input className={inputClassName} {...form.register("state")} />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>Zip</span>
          <input className={inputClassName} {...form.register("zip")} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClassName}>Cell Phone</span>
          <input
            type="tel"
            className={inputClassName}
            {...form.register("cellPhone")}
          />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>E-Mail *</span>
          <input
            type="email"
            className={inputClassName}
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <p className="text-sm text-red-400">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClassName}>Graduation Year</span>
          <input
            className={inputClassName}
            placeholder="e.g. 2015"
            {...form.register("graduationYear")}
          />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>Sports Played *</span>
          <input className={inputClassName} {...form.register("sportsPlayed")} />
          {form.formState.errors.sportsPlayed ? (
            <p className="text-sm text-red-400">
              {form.formState.errors.sportsPlayed.message}
            </p>
          ) : null}
        </label>
      </div>

      <label className="block space-y-2">
        <span className={labelClassName}>Gender</span>
        <input className={inputClassName} {...form.register("gender")} />
      </label>

      <label className="block space-y-2">
        <span className={labelClassName}>
          Names of Teammates You Keep In Contact With
        </span>
        <textarea
          rows={3}
          className={inputClassName}
          {...form.register("teammatesInContact")}
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClassName}>Degree Earned</span>
          <input className={inputClassName} {...form.register("degreeEarned")} />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>Occupation</span>
          <input className={inputClassName} {...form.register("occupation")} />
        </label>
      </div>

      <label className="block space-y-2">
        <span className={labelClassName}>Company</span>
        <input className={inputClassName} {...form.register("company")} />
      </label>

      <label className="block space-y-2">
        <span className={labelClassName}>Favorite Mountie / P-O Basketball Memory</span>
        <textarea
          rows={5}
          className={inputClassName}
          {...form.register("favoriteMemory")}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-mountie-silver">
        <input type="checkbox" className="mt-1" {...form.register("consent")} />
        <span>
          I agree to be contacted about P-O Varsity Boys Basketball alumni news,
          events, and program updates.
        </span>
      </label>
      {form.formState.errors.consent ? (
        <p className="text-sm text-red-400">
          {form.formState.errors.consent.message}
        </p>
      ) : null}

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {message ? <p className="text-sm text-ice-blue">{message}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ice-blue px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-midnight transition-opacity disabled:opacity-60"
      >
        {pending ? "Submitting..." : "Submit Form"}
      </button>
    </form>
  );
}
