import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SectionHeading } from "@/components/public/SectionHeading";
import { SeniorSpotlightGallery } from "@/components/public/SeniorSpotlightGallery";
import { getSeniorSpotlightSeasons } from "@/lib/data/senior-spotlight";
import { seasonHref } from "@/lib/content/seasons";

export const metadata: Metadata = {
  title: "Senior Spotlight",
  description:
    "Philipsburg-Osceola Mountaineer Basketball senior spotlight profiles by season.",
};

export default function SeniorSpotlightPage() {
  const seasons = getSeniorSpotlightSeasons();

  return (
    <ProgramPageShell
      title="Senior Spotlight"
      description="Celebrating Mountaineer seniors — profiles and photos by season."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Meet the Mounties", href: "/meet-the-mounties" },
        { label: "Senior Spotlight" },
      ]}
    >
      <div className="space-y-16">
        {seasons.map((season) => (
          <section key={season.slug} id={season.slug} className="scroll-mt-24">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Senior Spotlight"
                title={season.label}
              />
              <Link
                href={seasonHref(season.slug)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue hover:text-mountie-white"
              >
                View Full Season
                <ArrowRight size={14} />
              </Link>
            </div>
            <SeniorSpotlightGallery photos={season.photos} />
          </section>
        ))}
      </div>
    </ProgramPageShell>
  );
}
