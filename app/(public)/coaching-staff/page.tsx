import type { Metadata } from "next";
import { ImageReveal } from "@/components/public/ImageReveal";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { getSeasonCoachingPhoto } from "@/lib/content/seasons";

export const metadata: Metadata = {
  title: "Coaching Staff",
  description: "Meet the Philipsburg-Osceola Mountaineer Basketball coaching staff.",
};

export default function CoachingStaffPage() {
  const coachingPhoto = getSeasonCoachingPhoto("2025-26");

  return (
    <ProgramPageShell
      title="Coaching Staff"
      description="Experienced coaches committed to player development and Mountie tradition."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Coaching Staff" },
      ]}
    >
      {coachingPhoto ? (
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue">
            2025-2026 Season
          </p>
          <ImageReveal
            src={coachingPhoto}
            alt="2025-2026 Philipsburg-Osceola Mountaineer Basketball coaching staff"
            className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10"
            priority
          />
        </div>
      ) : null}
    </ProgramPageShell>
  );
}
