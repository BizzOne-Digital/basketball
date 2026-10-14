import type { Metadata } from "next";
import { Trophy, Medal, Award } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { XMAS_TOURNAMENT } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "P-O X-mas Tournament",
  description: "Annual Philipsburg-Osceola Christmas Basketball Tournament information.",
};

export default function XmasTournamentPage() {
  return (
    <ProgramPageShell
      title={XMAS_TOURNAMENT.title}
      description="Annual Holiday Basketball Tournament"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "X-mas Tournament" },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-8">
        {XMAS_TOURNAMENT.body.map((paragraph, index) => (
          <p key={index} className="text-lg leading-8 text-mountie-silver">
            {paragraph}
          </p>
        ))}

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-mountie-blue/10 p-6 text-center">
            <Trophy size={32} className="mx-auto text-ice-blue" />
            <h3 className="mt-4 font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
              Team Trophies
            </h3>
            <p className="mt-2 text-sm text-mountie-silver">
              1st and 2nd place teams
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6 text-center">
            <Medal size={32} className="mx-auto text-ice-blue" />
            <h3 className="mt-4 font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
              All-Tournament Team
            </h3>
            <p className="mt-2 text-sm text-mountie-silver">
              5 individual medals
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-midnight p-6 text-center">
            <Award size={32} className="mx-auto text-ice-blue" />
            <h3 className="mt-4 font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
              Special Awards
            </h3>
            <p className="mt-2 text-sm text-mountie-silver">
              MVP, Best Defense, Best Sportsmanship
            </p>
          </div>
        </div>
      </div>
    </ProgramPageShell>
  );
}
