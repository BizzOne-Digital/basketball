import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SeasonSections } from "@/components/public/SeasonSections";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getSeniorSpotlightSeasons } from "@/lib/data/senior-spotlight";

export const metadata: Metadata = {
  title: "Meet the Mounties",
  description:
    "Philipsburg-Osceola Mountaineer Basketball team pictures, season by season.",
};

export default function MeetTheMountiesPage() {
  const seniorSpotlightSeasons = getSeniorSpotlightSeasons();

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

      <section className="mt-20 border-t border-white/10 pt-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Profiles"
            title="Senior Spotlight"
            description="Senior profiles and photos from recent Mountaineer seasons."
          />
          <Link
            href="/meet-the-mounties/senior-spotlight"
            className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue hover:text-mountie-white"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seniorSpotlightSeasons.map((season) => (
            <Link
              key={season.slug}
              href={`/meet-the-mounties/senior-spotlight#${season.slug}`}
              className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-4 transition-colors hover:border-ice-blue/30"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ice-blue">
                Senior Spotlight
              </p>
              <h3 className="mt-2 font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
                {season.label}
              </h3>
              <p className="mt-2 text-sm text-mountie-silver">
                {season.photos.length} profile
                {season.photos.length === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </ProgramPageShell>
  );
}
