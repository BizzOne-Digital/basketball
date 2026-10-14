import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SeasonRosterGrid } from "@/components/public/SeasonRosterGrid";
import { SeniorSpotlightGallery } from "@/components/public/SeniorSpotlightGallery";
import { getSeasonRoster } from "@/lib/content/season-rosters";
import { getSeniorSpotlightForSeason } from "@/lib/data/senior-spotlight";
import {
  getSeason,
  getSeasonGameActions,
  getSeasonNeighbours,
  getSeasonPhotos,
  seasonHref,
  SEASONS,
} from "@/lib/content/seasons";

interface SeasonDetailPageProps {
  params: Promise<{ season: string }>;
}

export function generateStaticParams() {
  return SEASONS.map((season) => ({ season: season.slug }));
}

export async function generateMetadata({
  params,
}: SeasonDetailPageProps): Promise<Metadata> {
  const { season: slug } = await params;
  const season = getSeason(slug);

  if (!season) {
    return { title: "Season Not Found" };
  }

  const hasRoster = getSeasonRoster(season.slug).length > 0;

  return {
    title: hasRoster
      ? `${season.label} Roster Photos`
      : `${season.label} Team Pictures`,
    description: `${hasRoster ? "Player photos" : "Team and game pictures"} from the ${season.label} Philipsburg-Osceola Mountaineer Basketball season.`,
  };
}

export default async function SeasonDetailPage({
  params,
}: SeasonDetailPageProps) {
  const { season: slug } = await params;
  const season = getSeason(slug);

  if (!season) {
    notFound();
  }

  const roster = getSeasonRoster(season.slug);
  const gameActions = getSeasonGameActions(season.slug);
  const seniorSpotlight = getSeniorSpotlightForSeason(season.slug);
  const { previous, next } = getSeasonNeighbours(season.slug);

  return (
    <ProgramPageShell
      title={season.label}
      description={`${season.years} — ${roster.length > 0 ? "meet the players" : "team and game pictures"}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Meet the Mounties", href: "/meet-the-mounties" },
        { label: season.label },
      ]}
    >
      <Link
        href="/meet-the-mounties"
        className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue hover:text-mountie-white"
      >
        <ArrowLeft size={14} />
        All Seasons
      </Link>

      {roster.length > 0 ? (
        <SeasonRosterGrid players={roster} />
      ) : (
        <GalleryGrid images={getSeasonPhotos(season.slug)} columns={3} />
      )}

      {gameActions.length > 0 ? (
        <div className="mt-16">
          <h2 className="mb-8 font-display text-3xl uppercase tracking-[0.12em] text-mountie-white sm:text-4xl">
            Game Actions
          </h2>
          <GalleryGrid images={gameActions} columns={3} />
        </div>
      ) : null}

      {seniorSpotlight.length > 0 ? (
        <div className="mt-16">
          <h2 className="mb-8 font-display text-3xl uppercase tracking-[0.12em] text-mountie-white sm:text-4xl">
            Senior Spotlight
          </h2>
          <SeniorSpotlightGallery photos={seniorSpotlight} />
        </div>
      ) : null}

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
        {previous ? (
          <Link
            href={seasonHref(previous.slug)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-mountie-silver hover:text-ice-blue"
          >
            <ArrowLeft size={14} />
            {previous.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={seasonHref(next.slug)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-mountie-silver hover:text-ice-blue"
          >
            {next.label}
            <ArrowRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </ProgramPageShell>
  );
}
