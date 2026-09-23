import Image from "next/image";
import Link from "next/link";
import { CTABanner } from "@/components/public/CTABanner";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { ImageReveal } from "@/components/public/ImageReveal";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { SectionHeading } from "@/components/public/SectionHeading";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { getPublishedFAQs } from "@/lib/data/faqs";
import { getFeaturedImages } from "@/lib/data/gallery";
import { getPublishedTestimonials } from "@/lib/data/testimonials";
import { PLACEHOLDERS, resolveImageAlt, resolveImagePath, resolveSectionImage } from "@/lib/images";
import { cn } from "@/lib/utils/cn";
import type { PageSection } from "@/types";

interface SectionRendererProps {
  sections: PageSection[];
}

function themeClasses(theme?: string) {
  switch (theme) {
    case "dark":
      return "bg-midnight text-mountie-white";
    case "brand":
      return "bg-mountie-blue text-mountie-white";
    case "neutral":
      return "bg-gunmetal/30 text-mountie-white";
    default:
      return "bg-midnight text-mountie-white";
  }
}

async function DynamicSection({ section }: { section: PageSection }) {
  if (section.sectionType === "faq") {
    const faqs = await getPublishedFAQs();
    return (
      <section className={cn("py-20", themeClasses(section.theme))}>
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.heading ?? "FAQs"}
            description={section.body}
          />
          <div className="mt-10">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    );
  }

  if (
    section.sectionType === "gallery" ||
    section.sectionType === "gallery-preview"
  ) {
    const images = await getFeaturedImages(
      section.sectionType === "gallery-preview" ? 6 : 12,
    );

    return (
      <section className={cn("py-20", themeClasses(section.theme))}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.heading ?? "Gallery"}
            description={section.body}
          />
          <div className="mt-10">
            <GalleryGrid images={images} />
          </div>
        </div>
      </section>
    );
  }

  if (
    section.sectionType === "testimonials" ||
    section.sectionType === "testimonial-feature"
  ) {
    const testimonials = await getPublishedTestimonials();
    const featured = testimonials[0];

    return (
      <section className={cn("py-20", themeClasses(section.theme))}>
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.heading ?? "Testimonials"}
            description={section.body}
          />
          {featured ? (
            <blockquote className="mt-10 rounded-3xl border border-white/10 bg-mountie-blue/20 p-8 text-xl leading-9 text-mountie-white">
              “{featured.quote}”
              <footer className="mt-6 text-sm uppercase tracking-[0.16em] text-ice-blue">
                {featured.authorName}
                {featured.authorRole ? ` · ${featured.authorRole}` : ""}
              </footer>
            </blockquote>
          ) : null}
        </div>
      </section>
    );
  }

  return null;
}

function HeroSection({ section }: { section: PageSection }) {
  const storedPath = section.image?.path ?? "";
  const src =
    !storedPath || storedPath.includes("placeholders/hero")
      ? PLACEHOLDERS.hero
      : resolveImagePath(section.image, PLACEHOLDERS.hero);

  return (
    <section className="relative min-h-[85vh] overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={resolveImageAlt(section.image, section.heading ?? "Hero")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/20" />
      </div>
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-end px-4 py-24 lg:px-8">
        <SectionReveal className="max-w-3xl space-y-6">
          {section.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
              {section.eyebrow}
            </p>
          ) : null}
          <h1 className="break-words font-display text-4xl uppercase leading-none tracking-[0.08em] sm:text-5xl md:text-7xl">
            {section.heading}
          </h1>
          {section.body ? (
            <p className="max-w-2xl text-lg leading-8 text-mountie-silver">
              {section.body}
            </p>
          ) : null}
          {section.ctaLabel && section.ctaUrl ? (
            <MagneticButton href={section.ctaUrl}>{section.ctaLabel}</MagneticButton>
          ) : null}
        </SectionReveal>
      </div>
    </section>
  );
}

function TextImageSection({ section }: { section: PageSection }) {
  const imageOnRight = section.imagePosition === "right";
  const src = resolveSectionImage(section);
  const imageAspect =
    section.id === "home-intro" ? "aspect-[16/10]" : "aspect-[4/5]";
  const secondary = section.secondaryImage
    ? resolveImagePath(section.secondaryImage, PLACEHOLDERS.team)
    : null;
  const isHomeIntro = section.id === "home-intro";

  return (
    <section className={cn("py-20", themeClasses(section.theme))}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
        <SectionReveal
          className={cn(
            "min-w-0",
            imageOnRight ? "lg:order-1" : "lg:order-2",
          )}
        >
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.heading ?? ""}
            description={section.body}
          />
          {section.ctaLabel && section.ctaUrl ? (
            <div className="mt-8">
              <MagneticButton href={section.ctaUrl}>
                {section.ctaLabel}
              </MagneticButton>
            </div>
          ) : null}
        </SectionReveal>
        <div
          className={cn(
            "min-w-0 w-full",
            imageOnRight ? "lg:order-2" : "lg:order-1",
            secondary && "grid gap-4 sm:grid-cols-2",
          )}
        >
          <ImageReveal
            src={src}
            alt={resolveImageAlt(
              section.image,
              isHomeIntro
                ? "Mountie Basketball team huddle on court"
                : (section.heading ?? "Section"),
            )}
            className={cn(imageAspect, "rounded-3xl border border-white/10")}
            fill
            priority={isHomeIntro}
          />
          {secondary ? (
            <ImageReveal
              src={secondary}
              alt={resolveImageAlt(
                section.secondaryImage,
                section.heading ?? "Section",
              )}
              className="aspect-[4/5] rounded-3xl border border-white/10"
              fill
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function TextSection({ section }: { section: PageSection }) {
  return (
    <section className={cn("py-20", themeClasses(section.theme))}>
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.heading ?? ""}
          />
          <RichTextRenderer html={section.body} className="mt-8" />
        </SectionReveal>
      </div>
    </section>
  );
}

function CtaSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <CTABanner
          eyebrow={section.eyebrow}
          title={section.heading ?? "Ready to elevate your game?"}
          description={section.body}
          ctaLabel={section.ctaLabel ?? "Contact Us"}
          ctaUrl={section.ctaUrl ?? "/contact"}
        />
      </div>
    </section>
  );
}

function FullWidthMediaSection({ section }: { section: PageSection }) {
  const src = resolveImagePath(section.image, PLACEHOLDERS.court);

  return (
    <section className="relative h-[50vh] overflow-hidden">
      <Image
        src={src}
        alt={resolveImageAlt(section.image, section.heading ?? "Media")}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-midnight/40" />
      {section.heading ? (
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 lg:px-8">
            <h2 className="font-display text-4xl uppercase tracking-[0.08em]">
              {section.heading}
            </h2>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function QuoteSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <blockquote className="break-words font-display text-2xl uppercase leading-tight tracking-[0.06em] text-mountie-white sm:text-3xl md:text-5xl">
          “{section.body ?? section.heading}”
        </blockquote>
      </div>
    </section>
  );
}

function StatsSection({ section }: { section: PageSection }) {
  const lines = (section.body ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const stats = lines.map((line) => {
    const [value, label] = line.split("|").map((part) => part.trim());
    const numeric = Number.parseInt(value.replace(/\D/g, ""), 10) || 0;
    const suffix = value.replace(/[0-9]/g, "") || undefined;
    return { label: label ?? value, value: numeric, suffix };
  });

  if (stats.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-20", themeClasses(section.theme))}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.heading ?? "By The Numbers"}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-mountie-blue/20 p-6 text-center"
            >
              <p className="font-display text-5xl text-ice-blue">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-mountie-silver">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function parsePipeLines(body?: string) {
  return (body ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, description] = line.split("|").map((part) => part.trim());
      return { title, description };
    });
}

function ValuesGridSection({ section }: { section: PageSection }) {
  const items = parsePipeLines(section.body);

  return (
    <section className={cn("py-20", themeClasses(section.theme))}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.heading ?? "Our Values"}
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-mountie-blue/15 p-6 text-center"
            >
              <h3 className="font-display text-xl uppercase tracking-[0.08em] text-ice-blue">
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-3 text-sm leading-7 text-mountie-silver">
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ section }: { section: PageSection }) {
  const items = parsePipeLines(section.body);

  return (
    <section className={cn("py-20", themeClasses(section.theme))}>
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.heading ?? "Timeline"}
        />
        <div className="mt-10 space-y-6 border-l border-ice-blue/30 pl-8">
          {items.map((item) => (
            <div key={item.title} className="relative">
              <span className="absolute -left-[2.125rem] top-1.5 h-3 w-3 rounded-full bg-ice-blue" />
              <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-7 text-mountie-silver">
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardsGridSection({ section }: { section: PageSection }) {
  const items = parsePipeLines(section.body);

  return (
    <section className={cn("py-20", themeClasses(section.theme))}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.heading ?? "Highlights"}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6"
            >
              <h3 className="font-display text-xl uppercase tracking-[0.08em]">
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-3 text-sm leading-7 text-mountie-silver">
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialSplitSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">
            {section.eyebrow}
          </p>
          <h2 className="mt-4 break-words font-display text-3xl uppercase tracking-[0.08em] sm:text-4xl md:text-5xl">
            {section.heading}
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <RichTextRenderer html={section.body} />
          {section.ctaLabel && section.ctaUrl ? (
            <div className="mt-8">
              <Link
                href={section.ctaUrl}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-ice-blue"
              >
                {section.ctaLabel}
              </Link>
            </div>
          ) : null}
        </SectionReveal>
      </div>
    </section>
  );
}

function StaticSection({ section }: { section: PageSection }) {
  switch (section.sectionType) {
    case "hero":
      return <HeroSection section={section} />;
    case "text":
    case "features":
    case "schedule":
      return <TextSection section={section} />;
    case "values-grid":
      return <ValuesGridSection section={section} />;
    case "timeline":
      return <TimelineSection section={section} />;
    case "image-text":
    case "text-image":
    case "custom":
      return <TextImageSection section={section} />;
    case "cta":
    case "CTA":
      return <CtaSection section={section} />;
    case "full-width-media":
      return <FullWidthMediaSection section={section} />;
    case "quote":
      return <QuoteSection section={section} />;
    case "stats":
    case "statistics":
      return <StatsSection section={section} />;
    case "cards-grid":
      return <CardsGridSection section={section} />;
    case "custom-editorial-split":
      return <EditorialSplitSection section={section} />;
    default:
      return null;
  }
}

export async function SectionRenderer({ sections }: SectionRendererProps) {
  const enabledSections = [...sections]
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {enabledSections.map((section) => {
        if (
          ["faq", "gallery", "gallery-preview", "testimonials", "testimonial-feature"].includes(
            section.sectionType,
          )
        ) {
          return <DynamicSection key={section.id} section={section} />;
        }

        return <StaticSection key={section.id} section={section} />;
      })}
    </>
  );
}
