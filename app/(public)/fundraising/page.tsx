import type { Metadata } from "next";
import Link from "next/link";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { FUNDRAISING } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Mountaineer Basketball fundraising opportunities.",
};

export default function FundraisingPage() {
  return (
    <ProgramPageShell
      title={FUNDRAISING.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fundraising" },
      ]}
    >
      <div className="mx-auto max-w-2xl space-y-4">
        {FUNDRAISING.items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-gunmetal/30 px-6 py-5"
          >
            <p className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
              {item}
            </p>
          </div>
        ))}
        <Link
          href="/cash-bash"
          className="inline-block pt-4 text-sm font-semibold uppercase tracking-[0.16em] text-ice-blue hover:underline"
        >
          View Cash Bash Details
        </Link>
      </div>
    </ProgramPageShell>
  );
}
