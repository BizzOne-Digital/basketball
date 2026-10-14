import Image from "next/image";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ALUMNI_1976_CHAMPIONSHIP } from "@/lib/content/alumni-1976-championship";

export function Alumni1976ChampionshipSection() {
  const content = ALUMNI_1976_CHAMPIONSHIP;
  const championshipSeason = content.seasons.find(
    (season) => season.title === "1976 Season",
  );

  return (
    <section className="space-y-12 rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-8">
      <div>
        <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-ice-blue">
          {content.title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-mountie-silver">
          {content.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {content.pictures.map((photo) => (
          <figure
            key={photo.path}
            className="overflow-hidden rounded-2xl border border-white/10 bg-midnight"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={photo.path}
                alt={photo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </figure>
        ))}
      </div>

      <div>
        <SectionHeading
          eyebrow="Program History"
          title={content.historyHeading}
          className="mb-8"
        />
        <ul className="space-y-3">
          {content.milestones.map((milestone) => (
            <li
              key={milestone.year}
              className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-4 text-base leading-7 text-mountie-silver"
            >
              <span className="font-semibold text-ice-blue">
                {milestone.year}
              </span>
              <br />
              {milestone.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        {content.seasons.map((season) => (
          <article
            key={season.title}
            className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6"
          >
            <h3 className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
              {season.title}
            </h3>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue">
              Record: {season.record}
            </p>
            {"coaches" in season && season.coaches ? (
              <p className="mt-2 text-base leading-7 text-mountie-silver">
                Coaches: {season.coaches}
              </p>
            ) : null}
            {"notes" in season && season.notes
              ? season.notes.map((note) => (
                  <p
                    key={note}
                    className="mt-2 text-base leading-7 text-mountie-silver"
                  >
                    {note}
                  </p>
                ))
              : null}
            {"players" in season && season.players ? (
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue">
                    Players
                  </h4>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-mountie-white">
                    Seniors
                  </p>
                  <ul className="mt-2 space-y-1">
                    {season.players.seniors.map((player) => (
                      <li
                        key={player}
                        className="text-base leading-7 text-mountie-silver"
                      >
                        {player}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mountie-white">
                    {season.players.sophomores.label}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {season.players.sophomores.names.map((player) => (
                      <li
                        key={player}
                        className="text-base leading-7 text-mountie-silver"
                      >
                        {player}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {championshipSeason ? (
        <div className="space-y-8">
          {content.schedule.map((block) => (
            <article
              key={block.title}
              className="rounded-2xl border border-white/10 bg-midnight/60 p-6"
            >
              <h3 className="font-display text-lg uppercase tracking-[0.08em] text-ice-blue">
                {block.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {block.games.map((game) => (
                  <li
                    key={game}
                    className="text-base leading-7 text-mountie-silver"
                  >
                    {game}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div className="rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-6">
            <p className="text-base font-semibold uppercase tracking-[0.14em] text-mountie-white">
              Final Record: {content.finalRecord.record}
            </p>
            <p className="mt-2 text-base leading-7 text-mountie-silver">
              Points: {content.finalRecord.points}
            </p>
          </div>
        </div>
      ) : null}

      <div>
        <SectionHeading
          eyebrow="1976 Season"
          title="Awards & Honors"
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {content.awards.map((award) => (
            <div
              key={award.title}
              className="rounded-xl border border-white/10 bg-gunmetal/20 p-5"
            >
              <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue">
                {award.title}
              </h4>
              <ul className="mt-3 space-y-1">
                {award.honorees.map((honoree) => (
                  <li
                    key={honoree}
                    className="text-base leading-7 text-mountie-silver"
                  >
                    {honoree}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
