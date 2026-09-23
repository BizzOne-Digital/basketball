import { MagneticButton } from "@/components/motion/MagneticButton";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { cn } from "@/lib/utils/cn";

interface CTABannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaUrl: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
  className?: string;
}

export function CTABanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaUrl,
  secondaryLabel,
  secondaryUrl,
  className,
}: CTABannerProps) {
  return (
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden rounded-3xl border border-ice-blue/20 bg-gradient-to-br from-mountie-blue to-midnight px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16",
          className,
        )}
      >
        <div className="absolute inset-0 court-grid opacity-20" aria-hidden />
        <div className="relative max-w-3xl space-y-5">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="break-words font-display text-3xl uppercase tracking-[0.08em] text-mountie-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="text-base leading-7 text-mountie-silver">
              {description}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-4 pt-2">
            <MagneticButton href={ctaUrl}>{ctaLabel}</MagneticButton>
            {secondaryLabel && secondaryUrl ? (
              <MagneticButton href={secondaryUrl} variant="secondary">
                {secondaryLabel}
              </MagneticButton>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
