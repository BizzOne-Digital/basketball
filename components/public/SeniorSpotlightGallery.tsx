import Image from "next/image";
import type { SeniorSpotlightPhoto } from "@/lib/data/senior-spotlight";

interface SeniorSpotlightGalleryProps {
  photos: SeniorSpotlightPhoto[];
}

export function SeniorSpotlightGallery({ photos }: SeniorSpotlightGalleryProps) {
  if (photos.length === 0) {
    return (
      <p className="text-mountie-silver">
        Senior spotlight photos will be added soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <article
          key={photo.imagePath}
          className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20"
        >
          <div className="relative aspect-[4/5] bg-midnight">
            <Image
              src={photo.imagePath}
              alt={photo.imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="border-t border-white/10 px-4 py-4 text-center">
            <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
              {photo.name}
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}
