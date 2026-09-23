import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { TEAM_SIGNUPS } from "@/lib/content/team-signups";

export const metadata: Metadata = {
  title: "Join Our Team",
  description:
    "Sign up for Philipsburg-Osceola Mountaineer Basketball — varsity and junior high registration.",
};

export default function JoinOurTeamPage() {
  return (
    <ProgramPageShell
      title={TEAM_SIGNUPS.title}
      description={TEAM_SIGNUPS.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Join Our Team" },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-10">
        <p className="text-lg leading-8 text-mountie-silver">
          {TEAM_SIGNUPS.intro}
        </p>

        <div className="space-y-6">
          {TEAM_SIGNUPS.forms.map((form) => (
            <article
              key={form.id}
              className="rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-8"
            >
              <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
                {form.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-mountie-silver">
                {form.description}
              </p>
              <Link
                href={form.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight transition-opacity hover:opacity-90"
              >
                {form.ctaLabel}
                <ExternalLink size={16} />
              </Link>
            </article>
          ))}
        </div>

        <p className="text-sm leading-7 text-mountie-silver">
          Questions about signups?{" "}
          <Link href="/contact" className="text-ice-blue hover:underline">
            Contact us
          </Link>{" "}
          and we will help you get registered.
        </p>
      </div>
    </ProgramPageShell>
  );
}
