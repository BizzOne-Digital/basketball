import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { TEAM_PHILOSOPHY } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Team Philosophy",
  description:
    "PO Basketball — Attitude, Commitment, & Class. The 10 Commitments of Mountaineer Basketball.",
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
      <div className="mx-auto max-w-3xl space-y-12 text-center">
        {/* Screenshot 3 content */}
        <p className="text-lg leading-8 text-mountie-silver">
          {TEAM_PHILOSOPHY.circle}
        </p>

        <div className="space-y-4">
          <h2 className="font-display text-3xl uppercase tracking-[0.1em] text-mountie-white">
            {TEAM_PHILOSOPHY.philosophyTitle}
          </h2>
          <p className="font-display text-xl uppercase tracking-[0.14em] text-ice-blue">
            {TEAM_PHILOSOPHY.philosophyValues}
          </p>
          <p className="text-lg leading-8 text-mountie-silver">
            {TEAM_PHILOSOPHY.philosophyBody}
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="font-display text-2xl uppercase tracking-[0.1em] text-mountie-white sm:text-3xl">
            {TEAM_PHILOSOPHY.commitmentsHeading}
          </h2>

          {/* Screenshots 3 + 2: commitments #1–#10 */}
          <ol className="space-y-6">
            {TEAM_PHILOSOPHY.commitments.map((item) => (
              <li key={item.number} className="space-y-2">
                <p className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                  #{item.number}. {item.title}
                </p>
                <p className="text-base leading-7 text-mountie-silver">
                  ({item.detail})
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Screenshot 1 content */}
        <div className="space-y-5 border-t border-white/10 pt-10">
          {TEAM_PHILOSOPHY.closingNotes.map((note) => (
            <p key={note} className="text-lg leading-8 text-mountie-silver">
              {note}
            </p>
          ))}
        </div>
      </div>
    </ProgramPageShell>
  );
}
