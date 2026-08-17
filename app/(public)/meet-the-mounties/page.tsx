import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SeasonSections } from "@/components/public/SeasonSections";

export const metadata: Metadata = {
  title: "Meet the Mounties",
  description:
    "Philipsburg-Osceola Mountaineer Basketball team pictures, season by season.",
};

export default function MeetTheMountiesPage() {
  return (
    <ProgramPageShell
      title="Meet the Mounties"
      description="Browse Mountaineer Basketball team pictures from every season."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Meet the Mounties" },
      ]}
    >
      <SeasonSections />
    </ProgramPageShell>
  );
}
