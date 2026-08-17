import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { NewsCard } from "@/components/public/NewsCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { SocialLinks } from "@/components/public/SocialLinks";
import { CTABanner } from "@/components/public/CTABanner";
import { EmptyState } from "@/components/public/EmptyState";
import {
  JACK_BAILEY_QUOTE,
  LEAGUE_CHAMPIONS,
  MAXPREPS_SCHEDULE_URL,
  PROGRAM_BRAND,
} from "@/lib/content/mountie-program";
import { getPublishedPosts } from "@/lib/data/blog";
import { PLACEHOLDERS } from "@/lib/images";
import type { SiteSettingsDocument } from "@/types";

interface HomePageContentProps {
  settings: SiteSettingsDocument;
}

export async function HomePageContent({ settings }: HomePageContentProps) {
  const posts = await getPublishedPosts(3);

  const quickLinks = [
    { href: "/meet-the-mounties", label: "Meet the Mounties" },
    { href: "/schedule", label: "Schedule & Results" },
    { href: "/coaching-staff", label: "Coaching Staff" },
    { href: "/team-philosophy", label: "Team Philosophy" },
    { href: "/support", label: "Support The Program" },
    { href: "/alumni", label: "Alumni" },
  ];

  return (
    <>
      <section className="relative min-h-[90vh] overflow-hidden border-b border-white/10">
        <Image
          src={PLACEHOLDERS.hero}
          alt="Mountaineer Basketball"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/50" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-4 py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-3xl space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">
                {PROGRAM_BRAND.school}
              </p>
              <h1 className="break-words font-display text-4xl uppercase leading-none tracking-[0.08em] sm:text-5xl md:text-7xl">
                {settings.headline ?? PROGRAM_BRAND.name}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-mountie-silver">
                {settings.tagline ?? PROGRAM_BRAND.tagline}
              </p>
              <blockquote className="border-l-2 border-ice-blue pl-5">
                <p className="text-lg italic leading-8 text-mountie-white">
                  &ldquo;{JACK_BAILEY_QUOTE.text}&rdquo;
                </p>
                <cite className="mt-2 block text-sm uppercase tracking-[0.16em] text-ice-blue not-italic">
                  {JACK_BAILEY_QUOTE.attribution}
                </cite>
              </blockquote>
            </div>

            <div className="rounded-3xl border border-ice-blue/30 bg-midnight/70 p-8 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-ice-blue">
                {LEAGUE_CHAMPIONS.label}
              </p>
              <p className="mt-3 font-display text-6xl leading-none tracking-[0.08em] text-mountie-white">
                {LEAGUE_CHAMPIONS.year}
              </p>
              <p className="mt-4 text-sm leading-7 text-mountie-silver">
                Honoring five decades of Mountaineer tradition and championship
                culture.
              </p>
              <Link
                href="/alumni"
                className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-ice-blue hover:underline"
              >
                View Alumni
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionHeading
              eyebrow="Schedule"
              title="MaxPreps Schedule & Results"
              description="Follow wins, losses, and upcoming games all season long."
            />
            <Link
              href={MAXPREPS_SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight"
            >
              View Schedule
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Explore" title="Program Pages" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-gunmetal/20 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-mountie-white transition-colors hover:border-ice-blue/40 hover:text-ice-blue"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="News" title="Game Articles" />
            <Link
              href="/news"
              className="shrink-0 text-sm uppercase tracking-[0.16em] text-ice-blue"
            >
              View All
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <NewsCard
                  key={post.slug}
                  post={post}
                  featured={posts.length >= 3 && index === 0}
                />
              ))
            ) : (
              <EmptyState title="Game articles coming soon" />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Connect"
            title="Follow The Mounties"
            align="center"
          />
          <div className="mt-8 flex justify-center">
            <SocialLinks links={settings.socialLinks} />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CTABanner
            eyebrow="Support"
            title="Support The Mountaineer Basketball Program"
            description="Help us keep uniforms, equipment, and development programs available for every athlete."
            ctaLabel="Support The Program"
            ctaUrl="/support"
            secondaryLabel="2026 Sponsors"
            secondaryUrl="/sponsors"
          />
        </div>
      </section>
    </>
  );
}
