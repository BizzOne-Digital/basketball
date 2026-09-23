import Image from "next/image";
import type { SeasonPlayer } from "@/lib/content/season-rosters";

interface SeasonRosterGridProps {
  players: SeasonPlayer[];
  priorityCount?: number;
}

export function SeasonRosterGrid({
  players,
  priorityCount = 4,
}: SeasonRosterGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {players.map((player, index) => {
        const priority = index < priorityCount;
        const sizes =
          "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

        if (player.labeled) {
          return (
            <article
              key={player.slug}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/30 transition-all duration-500 hover:border-ice-blue/50 hover:shadow-[0_24px_70px_-30px_rgba(125,211,252,0.45)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={player.photo}
                  alt={
                    player.name
                      ? `${player.name} — Mountaineer Basketball`
                      : "Mountaineer Basketball team photo"
                  }
                  fill
                  sizes={sizes}
                  priority={priority}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              {player.name ? (
                <div className="flex items-center justify-center px-4 py-3">
                  <p className="text-center font-display text-sm uppercase tracking-[0.14em] text-mountie-white">
                    {player.name}
                  </p>
                </div>
              ) : null}
            </article>
          );
        }

        return (
          <article
            key={player.slug}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/30 transition-all duration-500 hover:border-ice-blue/50 hover:shadow-[0_24px_70px_-30px_rgba(125,211,252,0.45)]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={player.photo}
                alt={`${player.name} — Mountaineer Basketball`}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/25 to-transparent" />

              {player.jerseyNumber !== undefined ? (
                <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ice-blue/50 bg-midnight/70 font-display text-lg tracking-[0.04em] text-ice-blue backdrop-blur-sm">
                  {player.jerseyNumber}
                </span>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="break-words font-display text-lg uppercase leading-tight tracking-[0.08em] text-mountie-white sm:text-xl">
                  {player.name}
                </h3>
                <span className="mt-3 block h-0.5 w-10 bg-ice-blue transition-all duration-500 group-hover:w-20" />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
