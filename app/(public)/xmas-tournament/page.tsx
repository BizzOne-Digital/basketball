import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { XMAS_TOURNAMENT } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "P-O 7th Annual X-mass Tournament",
  description: "Mountaineer Basketball Christmas tournament information and awards.",
};

export default function XmasTournamentPage() {
  return (
    <ProgramPageShell
      title={XMAS_TOURNAMENT.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "X-mass Tournament" },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {XMAS_TOURNAMENT.body.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-8 text-mountie-silver">
            {paragraph}
          </p>
        ))}
      </div>
    </ProgramPageShell>
  );
}
