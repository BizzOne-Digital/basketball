import Image from "next/image";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SEASONS, seasonHref } from "@/lib/content/seasons";
import { cn } from "@/lib/utils/cn";

export function SeasonSections() {
  return (
    <div className="space-y-20 lg:space-y-28">
      {SEASONS.map((season, index) => {
        const imageOnRight = index % 2 === 1;

        return (
          <SectionReveal
            key={season.slug}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <div
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10",
                imageOnRight ? "lg:order-2" : "lg:order-1",
              )}
            >
              <Image
                src={season.image}
                alt={`${season.label} Mountaineer Basketball team`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div
              className={cn(
                "min-w-0 space-y-5",
                imageOnRight ? "lg:order-1" : "lg:order-2",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ice-blue">
                {season.current ? "Current Season" : season.years}
              </p>
              <h2 className="break-words font-display text-3xl uppercase tracking-[0.08em] text-mountie-white sm:text-4xl">
                {season.label}
              </h2>
              <p className="text-base leading-8 text-mountie-silver">
                {season.description}
              </p>
              <div className="pt-2">
                <MagneticButton href={seasonHref(season.slug)} variant="secondary">
                  View Season
                </MagneticButton>
              </div>
            </div>
          </SectionReveal>
        );
      })}
    </div>
  );
}
