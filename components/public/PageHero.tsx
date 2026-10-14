import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { PLACEHOLDERS, resolveImageAlt, resolveImagePath } from "@/lib/images";
import { cn } from "@/lib/utils/cn";
import type { ImageObject } from "@/types";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: ImageObject;
  ctaLabel?: string;
  ctaUrl?: string;
  breadcrumbs?: { label: string; href?: string }[];
  align?: "left" | "center";
  hideBackground?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  ctaLabel,
  ctaUrl,
  breadcrumbs,
  align = "left",
  hideBackground = false,
}: PageHeroProps) {
  const src = resolveImagePath(image, PLACEHOLDERS.hero);
  const centered = align === "center";

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-midnight">
      {!hideBackground ? (
        <div className="absolute inset-0 opacity-40">
          <ParallaxImage
            src={src}
            alt={resolveImageAlt(image, title)}
            fill
            priority
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/40" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-mountie-blue/20 via-midnight to-midnight" />
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
        <SectionReveal
          immediate
          className={cn(
            "max-w-3xl space-y-6",
            centered && "mx-auto text-center",
          )}
        >
          {breadcrumbs?.length ? (
            <Breadcrumbs
              items={breadcrumbs}
              className={cn(centered && "justify-center")}
            />
          ) : null}
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="break-words font-display text-4xl uppercase leading-none tracking-[0.08em] text-mountie-white sm:text-5xl md:text-7xl">
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "max-w-2xl text-lg leading-8 text-mountie-silver",
                centered && "mx-auto",
              )}
            >
              {description}
            </p>
          ) : null}
          {ctaLabel && ctaUrl ? (
            <div className={cn(centered && "flex justify-center")}>
              <MagneticButton href={ctaUrl}>{ctaLabel}</MagneticButton>
            </div>
          ) : null}
        </SectionReveal>
      </div>

      <div className="court-line absolute inset-x-0 bottom-0" />
    </section>
  );
}
