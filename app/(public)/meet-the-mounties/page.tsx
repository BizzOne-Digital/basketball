import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { RosterGrid } from "@/components/public/RosterGrid";

export const metadata: Metadata = {
  title: "Meet the Mounties",
  description: "Philipsburg-Osceola Mountaineer Basketball roster by class year.",
};

export default function MeetTheMountiesPage() {
  return (
    <ProgramPageShell
      title="Meet the Mounties"
      description="Our varsity roster — seniors, juniors, sophomores, and freshmen."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Meet the Mounties" },
      ]}
    >
      <RosterGrid />
    </ProgramPageShell>
  );
}
