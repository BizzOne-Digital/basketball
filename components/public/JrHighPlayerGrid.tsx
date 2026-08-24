import Image from "next/image";
import type { JrHighPlayerPhoto } from "@/lib/data/jr-high-player-photos";

interface JrHighPlayerGridProps {
  photos: JrHighPlayerPhoto[];
  title?: string;
}

export function JrHighPlayerGrid({ photos, title }: JrHighPlayerGridProps) {
  if (photos.length === 0) {
    return (
      <p className="text-mountie-silver">
        Player pictures will be added soon.
      </p>
    );
  }

  return (
    <div>
      {title ? (
        <h2 className="mb-6 font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
          {title}
        </h2>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <article
            key={photo.imagePath}
            className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20"
          >
            <div className="relative aspect-[3/4] bg-midnight">
              <Image
                src={photo.imagePath}
                alt={photo.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="border-t border-white/10 px-4 py-3 text-center">
              <h3 className="font-display text-sm uppercase tracking-[0.08em] text-mountie-white">
                {photo.name}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
