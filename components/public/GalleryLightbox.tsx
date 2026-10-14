"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { resolveGalleryImage, resolveImageAlt } from "@/lib/images";
import type { GalleryImageDocument } from "@/types";

interface GalleryLightboxProps {
  images: GalleryImageDocument[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const active = activeIndex !== null ? images[activeIndex] : null;

  function goPrev() {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + images.length) % images.length);
  }

  function goNext() {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % images.length);
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-midnight/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute right-6 top-6 text-mountie-white"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 rounded-full border border-white/10 p-3 text-mountie-white md:left-8"
            onClick={goPrev}
          >
            <ChevronLeft />
          </button>

          <div className="relative h-[70vh] w-full max-w-5xl">
            <Image
              src={resolveGalleryImage(active, activeIndex ?? 0)}
              alt={resolveImageAlt(active.image, active.title ?? "Gallery image")}
              fill
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 rounded-full border border-white/10 p-3 text-mountie-white md:right-8"
            onClick={goNext}
          >
            <ChevronRight />
          </button>

          {(active.title || active.caption) && (
            <div className="absolute bottom-6 left-1/2 max-w-2xl -translate-x-1/2 text-center">
              {active.title ? (
                <p className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
                  {active.title}
                </p>
              ) : null}
              {active.caption ? (
                <p className="mt-2 text-sm text-mountie-silver">{active.caption}</p>
              ) : null}
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
