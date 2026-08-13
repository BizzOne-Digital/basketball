import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { OPPONENT_GYMS } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Opponent Gym Addresses",
  description: "Directions to opponent gyms for Mountaineer Basketball road games.",
};

export default function OpponentGymsPage() {
  return (
    <ProgramPageShell
      title="Opponent Gym Addresses"
      description="Road game locations for the Mounties schedule."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Opponent Gyms" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {OPPONENT_GYMS.map((gym, index) => (
          <article
            key={gym.school}
            className="rounded-2xl border border-white/10 bg-gunmetal/30 p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-ice-blue">
              {index + 1}
            </p>
            <h2 className="mt-2 font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
              {gym.school}
            </h2>
            <p className="mt-3 text-sm leading-7 text-mountie-silver">
              {gym.address}
            </p>
          </article>
        ))}
      </div>
    </ProgramPageShell>
  );
}
