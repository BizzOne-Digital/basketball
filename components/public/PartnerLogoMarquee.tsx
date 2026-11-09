"use client";

import Image from "next/image";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
interface PartnerLogoMarqueeProps {
  logos: readonly { path: string; alt: string }[];
}

export function PartnerLogoMarquee({ logos }: PartnerLogoMarqueeProps) {
  const reducedMotion = useReducedMotion();
  const track = [...logos, ...logos];

  return (
    <section
      aria-label="Partner logos"
      className="w-full overflow-hidden border-t border-white/10 bg-midnight py-6"
    >
      <div className="relative">
        <div
          className={
            reducedMotion
              ? "flex flex-wrap items-center justify-center gap-8 px-4"
              : "logo-marquee-track flex w-max items-center gap-12 px-4"
          }
        >
          {track.map((logo, index) => (
            <div
              key={`${logo.path}-${index}`}
              className="relative h-14 w-24 shrink-0 opacity-90 sm:h-16 sm:w-28"
            >
              <Image
                src={logo.path}
                alt={logo.alt}
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
