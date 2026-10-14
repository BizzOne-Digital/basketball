import Image from "next/image";
import { getPublishedRosterBySeason } from "@/lib/data/roster";
import { getGalleryImageByIndex, resolveImageAlt } from "@/lib/images";
import { ROSTER_BY_CLASS } from "@/lib/content/mountie-program";
import { PLACEHOLDERS } from "@/lib/images";
import { SectionHeading } from "@/components/public/SectionHeading";

interface RosterGridProps {
  season?: string;
}

export async function RosterGrid({ season = "2025-26" }: RosterGridProps) {
  // Try to get roster from database first
  const dbRoster = await getPublishedRosterBySeason(season);

  // If we have database roster for this season, use it
  if (dbRoster.length > 0) {
    const rosterByGrade = {
      Senior: dbRoster.filter((p) => p.grade === "Senior"),
      Junior: dbRoster.filter((p) => p.grade === "Junior"),
      Sophomore: dbRoster.filter((p) => p.grade === "Sophomore"),
      Freshman: dbRoster.filter((p) => p.grade === "Freshman"),
    };

    return (
      <>
        {(Object.keys(rosterByGrade) as Array<keyof typeof rosterByGrade>).map(
          (grade) => {
            const players = rosterByGrade[grade];
            if (players.length === 0) return null;

            return (
              <div key={grade} className="mb-16">
                <SectionHeading
                  eyebrow="Roster"
                  title={`${grade}s`}
                  className="mb-8"
                />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {players.map((player) => (
                    <div
                      key={player.slug}
                      className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6 text-center transition-colors hover:border-ice-blue/40"
                    >
                      <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-ice-blue/30">
                        <Image
                          src={player.headshot?.path ?? PLACEHOLDERS.avatar}
                          alt={player.headshot?.alt ?? player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                        {player.name}
                      </h3>
                      {player.jerseyNumber ? (
                        <p className="mt-1 text-sm font-semibold text-ice-blue">
                          #{player.jerseyNumber}
                        </p>
                      ) : null}
                      {player.position ? (
                        <p className="mt-1 text-xs uppercase tracking-wider text-mountie-silver">
                          {player.position}
                        </p>
                      ) : null}
                      {player.height ? (
                        <p className="mt-1 text-xs text-mountie-silver">
                          {player.height}
                        </p>
                      ) : null}
                      {player.bio ? (
                        <p className="mt-3 text-sm leading-relaxed text-mountie-silver">
                          {player.bio}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          },
        )}

        {dbRoster.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-gunmetal/20 p-12 text-center">
            <p className="text-lg text-mountie-silver">
              {season} roster will be announced soon.
            </p>
            <p className="mt-2 text-sm text-mountie-silver/70">
              Check back for player profiles and team photos.
            </p>
          </div>
        ) : null}
      </>
    );
  }

  // Fallback to static roster for current season only
  if (season === "2025-26") {
    const photoOffsets = ROSTER_BY_CLASS.map((_, index) =>
      ROSTER_BY_CLASS.slice(0, index).reduce(
        (sum, entry) => sum + entry.players.length,
        0,
      ),
    );

    return (
      <div className="space-y-12">
        <p className="text-sm uppercase tracking-[0.2em] text-ice-blue">
          Headshots coming soon
        </p>
        {ROSTER_BY_CLASS.map((group, groupIndex) => (
          <div key={group.classYear}>
            <h2 className="mb-6 font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
              {group.classYear}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.players.map((player, playerIndex) => {
                const src = getGalleryImageByIndex(
                  photoOffsets[groupIndex] + playerIndex,
                );

                return (
                  <article
                    key={player}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/30"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={src}
                        alt={resolveImageAlt(undefined, player)}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                          {player}
                        </h3>
                        <p className="text-xs uppercase tracking-[0.16em] text-ice-blue">
                          {group.classYear.slice(0, -1)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // No roster available for this historical season
  return (
    <div className="rounded-xl border border-white/10 bg-gunmetal/20 p-12 text-center">
      <p className="text-lg text-mountie-silver">
        {season} roster information not yet available.
      </p>
      <p className="mt-2 text-sm text-mountie-silver/70">
        Historical roster data will be added soon.
      </p>
    </div>
  );
}
