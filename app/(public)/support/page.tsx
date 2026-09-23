import type { Metadata } from "next";
import Link from "next/link";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SUPPORT_PROGRAM } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Support The Program",
  description: "Support Philipsburg-Osceola Mountaineer Basketball.",
};

export default function SupportPage() {
  return (
    <ProgramPageShell
      title={SUPPORT_PROGRAM.title}
      description={SUPPORT_PROGRAM.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Support The Program" },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <p className="text-lg leading-8 text-mountie-silver">
          {SUPPORT_PROGRAM.description}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Winner 1", "Winner 2", "Winner 3"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-gunmetal/30 p-6 text-center"
            >
              <p className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
                {item}
              </p>
              <p className="mt-2 text-sm text-mountie-silver">Details coming soon</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/sponsors"
            className="rounded-full border border-ice-blue/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:bg-ice-blue/10"
          >
            2026 Sponsors
          </Link>
          <Link
            href="/fundraising"
            className="rounded-full border border-ice-blue/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:bg-ice-blue/10"
          >
            Fundraising
          </Link>
          <Link
            href="/cash-bash"
            className="rounded-full border border-ice-blue/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:bg-ice-blue/10"
          >
            Cash Bash
          </Link>
        </div>
      </div>
    </ProgramPageShell>
  );
}
