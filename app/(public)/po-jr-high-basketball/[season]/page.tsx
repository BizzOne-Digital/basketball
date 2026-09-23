import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { JrHighPlayerGrid } from "@/components/public/JrHighPlayerGrid";
import { JrHighSeasonNav } from "@/components/public/JrHighSeasonNav";
import { JrHighSubNav } from "@/components/public/JrHighSubNav";
import {
  getJrHighSeason,
  JR_HIGH_SEASONS,
  JR_HIGH_TITLE,
} from "@/lib/content/jr-high-basketball";
import { getJrHighPlayerPhotos } from "@/lib/data/jr-high-player-photos";

interface JrHighSeasonPageProps {
  params: Promise<{ season: string }>;
}

export function generateStaticParams() {
  return JR_HIGH_SEASONS.map((season) => ({ season: season.slug }));
}

export async function generateMetadata({
  params,
}: JrHighSeasonPageProps): Promise<Metadata> {
  const { season: slug } = await params;
  const season = getJrHighSeason(slug);

  if (!season) {
    return { title: "Season Not Found" };
  }

  return {
    title: `${season.label} — Jr High Basketball`,
    description: season.description,
  };
}

export default async function JrHighSeasonPage({ params }: JrHighSeasonPageProps) {
  const { season: slug } = await params;
  const season = getJrHighSeason(slug);

  if (!season) {
    notFound();
  }

  const playerPhotos = getJrHighPlayerPhotos(season.playersFolder);

  return (
    <ProgramPageShell
      title={JR_HIGH_TITLE}
      description={season.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: JR_HIGH_TITLE, href: "/po-jr-high-basketball" },
        { label: season.label },
      ]}
    >
      <JrHighSeasonNav currentSlug={season.slug} />
      <JrHighSubNav season={season} />

      <div className="space-y-12">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue">
            {season.label}
          </p>

          {season.teamPicture ? (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/20">
              <Image
                src={season.teamPicture}
                alt={`${season.label} PO Jr High Basketball team picture`}
                width={1600}
                height={900}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          ) : null}
        </div>

        {season.showPlayersOnTeamPage ? (
          <JrHighPlayerGrid
            photos={playerPhotos}
            title={season.teamPicture ? "Player Pictures" : undefined}
          />
        ) : null}
      </div>
    </ProgramPageShell>
  );
}
