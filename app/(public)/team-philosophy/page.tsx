import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { TEAM_PHILOSOPHY } from "@/lib/content/mountie-program";
import { SITE_IMAGES } from "@/lib/images";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Team Philosophy",
  description: "Attitude, Commitment, & Class — the Mountaineer Basketball team philosophy.",
};

export default function TeamPhilosophyPage() {
  return (
    <ProgramPageShell
      title={TEAM_PHILOSOPHY.title}
      description={TEAM_PHILOSOPHY.subtitle}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Team Philosophy" },
      ]}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={SITE_IMAGES.team[1]}
            alt="Mountaineer Basketball team"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-mountie-white">
            {TEAM_PHILOSOPHY.subtitle}
          </h2>
          {TEAM_PHILOSOPHY.body.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-8 text-mountie-silver">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </ProgramPageShell>
  );
}
