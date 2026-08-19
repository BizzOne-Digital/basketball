import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SectionHeading } from "@/components/public/SectionHeading";
import {
  CENTRAL_PA_LIONS_CONTENT,
  CENTRAL_PA_LIONS_WEBSITE_URL,
} from "@/lib/content/central-pa-lions";

export const metadata: Metadata = {
  title: "Central PA Lions AAU",
  description:
    "TJ Anderson's Central PA Lions Academy — youth basketball development for student-athletes in grades K-12.",
};

export default function CentralPaLionsPage() {
  const { about, mission, championshipPhotos, video, logo } =
    CENTRAL_PA_LIONS_CONTENT;

  return (
    <ProgramPageShell
      title={CENTRAL_PA_LIONS_CONTENT.title}
      description="Youth Basketball Academy — Grades K-12"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Central PA Lions AAU" },
      ]}
    >
      <div className="space-y-16">
        <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-gunmetal/20 p-8 lg:flex-row lg:items-center">
          <div className="relative mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-midnight lg:mx-0">
            <Image
              src={logo}
              alt="Central PA Lions Academy logo"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">
              {about.heading}
            </p>
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-lg leading-8 text-mountie-silver"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <section className="rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-8">
          <SectionHeading
            eyebrow="Culture"
            title={mission.heading}
            className="mb-6"
          />
          <h3 className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
            {mission.seasonMissionLabel}
          </h3>
          <p className="mt-4 text-lg leading-8 text-mountie-silver">
            {mission.seasonMission}
          </p>
        </section>

        <section>
          <SectionHeading
            eyebrow="Championships"
            title="Championship Pictures"
            className="mb-8"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {championshipPhotos.map((photo) => (
              <div
                key={photo.path}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={photo.path}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Highlights" title="Video" className="mb-8" />
          <div className="mx-auto max-w-3xl space-y-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-midnight">
              <video
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-black"
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support embedded video playback.
              </video>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mountie-white">
              {video.title}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-gunmetal/20 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">
            Official Website
          </p>
          <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
            Click Below To Access The Site
          </h2>
          <Link
            href={CENTRAL_PA_LIONS_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ice-blue px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight transition-opacity hover:opacity-90"
          >
            Visit Central PA Lions Academy
            <ExternalLink size={16} />
          </Link>
        </section>
      </div>
    </ProgramPageShell>
  );
}
