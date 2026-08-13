import Image from "next/image";
import { getGalleryImageByIndex, resolveImageAlt } from "@/lib/images";
import { ROSTER_BY_CLASS } from "@/lib/content/mountie-program";

export function RosterGrid() {
  let photoIndex = 0;

  return (
    <div className="space-y-12">
      <p className="text-sm uppercase tracking-[0.2em] text-ice-blue">
        Headshots coming soon
      </p>
      {ROSTER_BY_CLASS.map((group) => (
        <div key={group.classYear}>
          <h2 className="mb-6 font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
            {group.classYear}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.players.map((player) => {
              const src = getGalleryImageByIndex(photoIndex);
              photoIndex += 1;

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
