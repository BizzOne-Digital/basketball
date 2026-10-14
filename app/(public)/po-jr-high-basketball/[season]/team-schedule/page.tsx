import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { JrHighImageStack } from "@/components/public/JrHighImageStack";
import { JrHighSeasonNav } from "@/components/public/JrHighSeasonNav";
import { JrHighSubNav } from "@/components/public/JrHighSubNav";
import {
  getJrHighSeason,
  JR_HIGH_SEASONS,
  JR_HIGH_TITLE,
} from "@/lib/content/jr-high-basketball";
import { getJrHighFolderImages } from "@/lib/data/jr-high-folder-images";

interface JrHighSchedulePageProps {
  params: Promise<{ season: string }>;
}

export function generateStaticParams() {
  return JR_HIGH_SEASONS.map((season) => ({ season: season.slug }));
}

export async function generateMetadata({
  params,
}: JrHighSchedulePageProps): Promise<Metadata> {
  const { season: slug } = await params;
  const season = getJrHighSeason(slug);

  if (!season) {
    return { title: "Season Not Found" };
  }

  return {
    title: `${season.label} — Jr High Schedule`,
    description: `${season.label} boys' junior high basketball schedule.`,
  };
}

export default async function JrHighSchedulePage({
  params,
}: JrHighSchedulePageProps) {
  const { season: slug } = await params;
  const season = getJrHighSeason(slug);

  if (!season) {
    notFound();
  }

  const scheduleImages = [
    ...(season.teamSchedule ?? []),
    ...getJrHighFolderImages(season.scheduleFolder),
  ];

  return (
    <ProgramPageShell
      title="Team Schedule"
      description={`${season.label} — PO Jr High Basketball game schedule`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: JR_HIGH_TITLE, href: "/po-jr-high-basketball" },
        { label: season.label, href: `/po-jr-high-basketball/${season.slug}` },
        { label: "Team Schedule" },
      ]}
    >
      <JrHighSeasonNav currentSlug={season.slug} />
      <JrHighSubNav season={season} />

      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue">
        {season.label}
      </p>

      <JrHighImageStack
        images={scheduleImages}
        alt={`${season.label} PO Jr High Basketball team schedule`}
      />
    </ProgramPageShell>
  );
}
