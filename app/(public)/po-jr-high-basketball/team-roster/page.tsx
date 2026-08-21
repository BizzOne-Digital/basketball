import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { JrHighSubNav } from "@/components/public/JrHighSubNav";
import { JR_HIGH_BASKETBALL } from "@/lib/content/jr-high-basketball";

export const metadata: Metadata = {
  title: "Jr High Team Roster",
  description:
    "2025-2026 Philipsburg-Osceola Mountaineer junior high boys basketball roster.",
};

export default function JrHighTeamRosterPage() {
  const { title, seasonLabel, images } = JR_HIGH_BASKETBALL;

  return (
    <ProgramPageShell
      title="Team Roster"
      description={`${seasonLabel} — PO Jr High Basketball roster`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: title, href: "/po-jr-high-basketball" },
        { label: "Team Roster" },
      ]}
    >
      <JrHighSubNav />

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/20">
        <Image
          src={images.teamRoster}
          alt={`${seasonLabel} PO Jr High Basketball team roster`}
          width={1600}
          height={900}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </ProgramPageShell>
  );
}
