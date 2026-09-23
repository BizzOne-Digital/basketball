"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";
import { resolveGalleryImage, resolveImageAlt } from "@/lib/images";
import type { GalleryImageDocument } from "@/types";

interface GalleryGridProps {
  images: GalleryImageDocument[];
  columns?: 2 | 3 | 4;
}

export function GalleryGrid({ images, columns = 3 }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const columnClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <>
      <div className={`grid gap-4 ${columnClass}`}>
        {images.map((item, index) => {
          const src = resolveGalleryImage(item, index);

          return (
            <button
              key={item.slug}
              type="button"
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10"
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={src}
                alt={resolveImageAlt(item.image, item.title ?? "Gallery image")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-midnight/0 transition-colors group-hover:bg-midnight/20" />
            </button>
          );
        })}
      </div>

      <GalleryLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
