import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Heart,
  Shield,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { CTABanner } from "@/components/public/CTABanner";
import { ImageReveal } from "@/components/public/ImageReveal";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SplitTextHeading } from "@/components/public/SplitTextHeading";
import { HOME_INTRO_IMAGE, PLACEHOLDERS } from "@/lib/images";
import { cn } from "@/lib/utils/cn";
import type { PageDocument, PageSection, SiteSettingsDocument } from "@/types";

const ABOUT_COMMUNITY_IMAGES = [
  HOME_INTRO_IMAGE,
  PLACEHOLDERS.hero,
  HOME_INTRO_IMAGE,
  PLACEHOLDERS.hero,
] as const;

const VALUES = [
  {
    icon: Users,
    title: "Teamwork",
    description: "We succeed together — on the court, in the classroom, and in the community.",
  },
  {
    icon: Shield,
    title: "Discipline",
    description: "Daily standards, accountability, and respect for the program and each other.",
  },
  {
    icon: Target,
    title: "Development",
    description: "Skill-building for every athlete, from fundamentals to competitive readiness.",
  },
  {
    icon: Heart,
    title: "Community",
    description: "Philipsburg-Osceola pride connects families, alumni, and supporters.",
  },
  {
    icon: GraduationCap,
    title: "Academic Responsibility",
    description: "Student-athletes are held to high expectations in the classroom first.",
  },
];

const PILLARS = [
  {
    title: "Compete With Purpose",
    body: "Every rep, drill, and game is an opportunity to grow as a player and a person.",
  },
  {
    title: "Lead By Example",
    body: "Mounties represent their school, families, and community with character.",
  },
  {
    title: "Build For The Future",
    body: "We develop habits and skills that last beyond any single season.",
  },
];

function findSection(
  sections: PageSection[] | undefined,
  id: string,
): PageSection | undefined {
  return sections?.find((section) => section.id === id && section.enabled);
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

interface AboutPageContentProps {
  page: PageDocument | null;
  settings: SiteSettingsDocument;
}

export function AboutPageContent({ page, settings }: AboutPageContentProps) {
  const sections = page?.sections ?? [];
  const story = findSection(sections, "about-story");
  const mission = findSection(sections, "about-mission");
  const philosophy = findSection(sections, "about-philosophy");
  const timeline = findSection(sections, "about-timeline");
  const development = findSection(sections, "about-development");
  const community = findSection(sections, "about-community");
  const cta = findSection(sections, "about-cta");
  const timelineItems = parsePipeLines(timeline?.body);
  const coach = settings.coach;

  return (
    <>
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 court-grid opacity-10" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <SectionReveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
              {story?.eyebrow ?? "Who We Are"}
            </p>
            <h2 className="break-words font-display text-3xl uppercase leading-none tracking-[0.08em] text-mountie-white sm:text-4xl md:text-6xl">
              {story?.heading ?? "Home Of The Mounties"}
            </h2>
            {story?.body ? (
              <RichTextRenderer
                html={story.body}
                className="text-lg leading-8 [&_p]:text-mountie-silver"
              />
            ) : (
              <p className="text-lg leading-8 text-mountie-silver">
                We are a public-school high school basketball program located in
                Central Pennsylvania. Our mission is to develop complete athletes
                through teamwork, discipline, and community.
              </p>
            )}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/team"
                className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em] text-ice-blue transition-colors hover:text-mountie-white"
              >
                Meet The Team
              </Link>
              <span className="text-mountie-silver/40">|</span>
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em] text-ice-blue transition-colors hover:text-mountie-white"
              >
                View Programs
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="relative overflow-hidden">
              <div className="absolute -inset-4 rounded-[2rem] bg-ice-blue/10 blur-2xl" />
              <ImageReveal
                src={HOME_INTRO_IMAGE}
                alt="Mountie Basketball team huddle"
                className="relative aspect-[16/11] rounded-[1.75rem] border border-white/10"
                priority
              />
              <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl border border-white/10 bg-midnight/95 p-5 backdrop-blur md:block">
                <p className="font-display text-3xl text-ice-blue">Central PA</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mountie-silver">
                  Public-school basketball excellence
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-mountie-blue/10 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SplitTextHeading
            eyebrow={mission?.eyebrow ?? "Mission & Vision"}
            title={mission?.heading ?? "Develop Champions Of Character"}
            description="Built on standards that extend far beyond the final buzzer."
            className="mx-auto max-w-3xl text-center"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <SectionReveal>
              <article className="h-full rounded-3xl border border-white/10 bg-midnight/60 p-8 md:p-10">
                <Trophy className="mb-5 text-ice-blue" size={32} />
                <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
                  Our Mission
                </h3>
                {mission?.body ? (
                  <RichTextRenderer
                    html={mission.body}
                    className="mt-4 text-base leading-8 [&_p]:text-mountie-silver"
                  />
                ) : (
                  <p className="mt-4 text-base leading-8 text-mountie-silver">
                    Prepare student-athletes for success through rigorous
                    training, academic accountability, and service to our
                    community.
                  </p>
                )}
              </article>
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <article className="h-full rounded-3xl border border-ice-blue/20 bg-gradient-to-br from-mountie-blue/40 to-midnight p-8 md:p-10">
                <Target className="mb-5 text-ice-blue" size={32} />
                <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
                  Our Vision
                </h3>
                <p className="mt-4 text-base leading-8 text-mountie-silver">
                  To be Central Pennsylvania&apos;s model program for developing
                  skilled, disciplined, and community-minded athletes who lead
                  with integrity on and off the court.
                </p>
              </article>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Core Values"
            title="What We Stand For"
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <SectionReveal key={value.title} delay={index * 0.05}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-gunmetal/20 p-6 transition-colors hover:border-ice-blue/30 hover:bg-mountie-blue/15">
                    <div className="mb-4 flex items-center justify-between">
                      <Icon className="text-ice-blue" size={24} />
                      <span className="font-display text-sm text-mountie-silver/50">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-mountie-silver">
                      {value.description}
                    </p>
                  </article>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <ParallaxImage
            src={PLACEHOLDERS.hero}
            alt="Mountie Basketball arena atmosphere"
            fill
            className="h-full w-full opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/95 to-midnight/80" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[auto_1fr] lg:px-8">
          <SectionReveal>
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-2 border-ice-blue/40 lg:mx-0">
              <Image
                src={HOME_INTRO_IMAGE}
                alt={coach?.name ?? "Head Coach"}
                fill
                className="object-cover object-top"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
              Coach&apos;s Message
            </p>
            <blockquote className="mt-4 break-words font-display text-2xl uppercase leading-tight tracking-[0.06em] text-mountie-white sm:text-3xl md:text-4xl">
              &ldquo;{philosophy?.body ?? philosophy?.heading ?? "Basketball is our platform — discipline, respect, and growth are our standard."}&rdquo;
            </blockquote>
            <p className="mt-6 font-display text-lg uppercase tracking-[0.08em] text-ice-blue">
              {philosophy?.heading ?? coach?.name ?? "Tj Anderson"}
            </p>
            <p className="text-sm text-mountie-silver">
              {coach?.title ?? "Head Coach"} · {settings.organizationName}
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-mountie-blue/10 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Team Philosophy"
            title="How We Coach"
            description="High standards, clear communication, and a player-first approach to development."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <SectionReveal key={pillar.title} delay={index * 0.06}>
                <article className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-midnight/50 p-6">
                  <div className="absolute right-4 top-4 font-display text-5xl text-white/5">
                    0{index + 1}
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-mountie-silver">
                    {pillar.body}
                  </p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <SectionReveal className={cn("order-2 lg:order-1")}>
            <ImageReveal
              src={PLACEHOLDERS.hero}
              alt="Basketball training on court"
              className="aspect-[4/5] rounded-3xl"
            />
          </SectionReveal>
          <SectionReveal delay={0.08} className="order-1 space-y-5 lg:order-2">
            <SectionHeading
              eyebrow={development?.eyebrow ?? "Player Development"}
              title={development?.heading ?? "Elevate Every Athlete"}
            />
            {development?.body ? (
              <RichTextRenderer html={development.body} />
            ) : (
              <p className="text-base leading-8 text-mountie-silver">
                From skill work and basketball IQ to competitive readiness, we
                meet athletes where they are and push them toward their potential
                — with structure, feedback, and purpose.
              </p>
            )}
          </SectionReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <SectionReveal>
              <SectionHeading
                eyebrow={community?.eyebrow ?? "Community Connection"}
                title={community?.heading ?? "More Than A Program"}
              />
              {community?.body ? (
                <RichTextRenderer html={community.body} className="mt-6" />
              ) : (
                <p className="mt-6 text-base leading-8 text-mountie-silver">
                  Mountie Basketball brings together students, parents, alumni,
                  and supporters across Central Pennsylvania. We compete with
                  pride and stay connected to the community that lifts us up.
                </p>
              )}
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {ABOUT_COMMUNITY_IMAGES.map((src, index) => (
                    <div
                      key={`about-community-${index}`}
                      className={cn(
                        "relative overflow-hidden rounded-2xl border border-white/10",
                        index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square",
                      )}
                    >
                      <Image src={src} alt={`Mountie community ${index + 1}`} fill className="object-cover" />
                    </div>
                  ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {timelineItems.length > 0 ? (
        <section className="border-t border-white/10 bg-gunmetal/20 py-24">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <SectionHeading
              eyebrow={timeline?.eyebrow ?? "Milestones"}
              title={timeline?.heading ?? "Program Timeline"}
              align="center"
            />
            <div className="mt-12 space-y-8 border-l border-ice-blue/30 pl-8">
              {timelineItems.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.05}>
                  <div className="relative">
                    <span className="absolute -left-[2.125rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-ice-blue ring-4 ring-midnight" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ice-blue">
                      {item.title}
                    </p>
                    {item.description ? (
                      <p className="mt-2 text-base leading-7 text-mountie-silver">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CTABanner
            eyebrow={cta?.eyebrow ?? "Get Involved"}
            title={cta?.heading ?? "Join The Mountie Family"}
            description={
              cta?.body ??
              "Meet our coaches, explore our programs, or reach out to Coach Anderson today."
            }
            ctaLabel={cta?.ctaLabel ?? "Contact Coach"}
            ctaUrl={cta?.ctaUrl ?? "/contact"}
            secondaryLabel="View Team"
            secondaryUrl="/team"
          />
        </div>
      </section>
    </>
  );
}
