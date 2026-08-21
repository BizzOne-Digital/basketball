import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { JrHighSubNav } from "@/components/public/JrHighSubNav";
import { JR_HIGH_BASKETBALL } from "@/lib/content/jr-high-basketball";

export const metadata: Metadata = {
  title: "Jr High Team Schedule",
  description:
    "2025-2026 Philipsburg-Osceola Mountaineer junior high boys basketball schedule.",
};

export default function JrHighTeamSchedulePage() {
  const { title, seasonLabel, images } = JR_HIGH_BASKETBALL;

  return (
    <ProgramPageShell
      title="Team Schedule"
      description={`${seasonLabel} — PO Jr High Basketball game schedule`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: title, href: "/po-jr-high-basketball" },
        { label: "Team Schedule" },
      ]}
    >
      <JrHighSubNav />

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/20">
        <Image
          src={images.teamSchedule}
          alt={`${seasonLabel} PO Jr High Basketball team schedule`}
          width={1600}
          height={900}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </ProgramPageShell>
  );
}
