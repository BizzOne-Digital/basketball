import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { JrHighPlayerGrid } from "@/components/public/JrHighPlayerGrid";
import { JrHighImageStack } from "@/components/public/JrHighImageStack";
import { JrHighSeasonNav } from "@/components/public/JrHighSeasonNav";
import { JrHighSubNav } from "@/components/public/JrHighSubNav";
import {
  getJrHighSeason,
  JR_HIGH_SEASONS,
  JR_HIGH_TITLE,
} from "@/lib/content/jr-high-basketball";
import { getJrHighPlayerPhotos } from "@/lib/data/jr-high-player-photos";
import { resolveJrHighImageList } from "@/lib/data/jr-high-folder-images";

interface JrHighPlayersPageProps {
  params: Promise<{ season: string }>;
}

export function generateStaticParams() {
  return JR_HIGH_SEASONS.filter((season) => season.hasPlayersTab).map(
    (season) => ({ season: season.slug }),
  );
}

export async function generateMetadata({
  params,
}: JrHighPlayersPageProps): Promise<Metadata> {
  const { season: slug } = await params;
  const season = getJrHighSeason(slug);

  if (!season) {
    return { title: "Season Not Found" };
  }

  return {
    title: `${season.label} — Jr High Player Pictures`,
    description: `${season.label} boys' junior high basketball player pictures.`,
  };
}

export default async function JrHighPlayersPage({
  params,
}: JrHighPlayersPageProps) {
  const { season: slug } = await params;
  const season = getJrHighSeason(slug);

  if (!season || !season.hasPlayersTab) {
    notFound();
  }

  const playerPhotos = getJrHighPlayerPhotos(season.playersFolder);
  const featuredImages = resolveJrHighImageList(season.playersImages);

  return (
    <ProgramPageShell
      title="Players Pictures"
      description={`${season.label} — PO Jr High Basketball player pictures`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: JR_HIGH_TITLE, href: "/po-jr-high-basketball" },
        { label: season.label, href: `/po-jr-high-basketball/${season.slug}` },
        { label: "Players Pictures" },
      ]}
    >
      <JrHighSeasonNav currentSlug={season.slug} />
      <JrHighSubNav season={season} />

      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue">
        {season.label}
      </p>

      <div className="space-y-12">
        {featuredImages.length > 0 ? (
          <JrHighImageStack
            images={featuredImages}
            alt={`${season.label} PO Jr High Basketball player pictures`}
          />
        ) : null}

        <JrHighPlayerGrid photos={playerPhotos} />
      </div>
    </ProgramPageShell>
  );
}
