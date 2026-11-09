import type { Metadata } from "next";
import Image from "next/image";
import { ImageReveal } from "@/components/public/ImageReveal";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { getSeasonCoachingPhoto } from "@/lib/content/seasons";
import { getContent } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Coaching Staff",
  description: "Meet the Philipsburg-Osceola Mountaineer Basketball coaching staff.",
};

export default async function CoachingStaffPage() {
  const COACHING_STAFF = (await getContent("coaching-staff")).members;
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
      <div className="space-y-12">
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

        <div>
          <h2 className="mb-6 font-display text-3xl uppercase tracking-[0.08em] text-mountie-white">
            Our Coaches
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COACHING_STAFF.map((member) => (
              <li
                key={member.name}
                className="rounded-2xl border border-white/10 bg-gunmetal/30 p-6"
              >
                {member.photo ? (
                  <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl">
                    <Image src={member.photo} alt={member.name} fill className="object-cover" />
                  </div>
                ) : null}
                <p className="text-xs uppercase tracking-[0.2em] text-ice-blue">
                  {member.role}
                </p>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
                  {member.name}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProgramPageShell>
  );
}
