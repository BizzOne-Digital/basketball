import type { Metadata } from "next";
import { CoachingStaffGrid } from "@/components/public/CoachingStaffGrid";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";

export const metadata: Metadata = {
  title: "Coaching Staff",
  description: "Meet the Philipsburg-Osceola Mountaineer Basketball coaching staff.",
};

export default function CoachingStaffPage() {
  return (
    <ProgramPageShell
      title="Coaching Staff"
      description="Experienced coaches committed to player development and Mountie tradition."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Coaching Staff" },
      ]}
    >
      <CoachingStaffGrid />
    </ProgramPageShell>
  );
}
