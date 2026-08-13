import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { MAXPREPS_SCHEDULE_URL } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Schedule & Results",
  description: "Mountaineer Basketball schedule, wins, and losses on MaxPreps.",
};

export default function SchedulePage() {
  return (
    <ProgramPageShell
      title="Schedule & Results"
      description="Follow the Mounties all season long — games, wins, and results."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Schedule & Results" },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <p className="text-lg leading-8 text-mountie-silver">
          View the full Philipsburg-Osceola Mounties basketball schedule, scores,
          and season record on MaxPreps.
        </p>
        <Link
          href={MAXPREPS_SCHEDULE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ice-blue px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-midnight transition-opacity hover:opacity-90"
        >
          View MaxPreps Schedule
          <ExternalLink size={16} />
        </Link>
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <iframe
            title="MaxPreps Schedule"
            src={MAXPREPS_SCHEDULE_URL}
            className="h-[720px] w-full bg-white"
          />
        </div>
      </div>
    </ProgramPageShell>
  );
}
