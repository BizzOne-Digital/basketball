import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/public/SectionHeading";
import {
  CENTRAL_PA_LIONS_CONTENT,
  CENTRAL_PA_LIONS_WEBSITE_URL,
} from "@/lib/content/central-pa-lions";

export function CentralPaLionsHomeSection() {
  const { about, mission, logo } = CENTRAL_PA_LIONS_CONTENT;

  return (
    <section className="border-y border-white/10 bg-gunmetal/10 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-midnight lg:mx-0">
            <Image
              src={logo}
              alt="Central PA Lions Academy logo"
              fill
              className="object-contain p-3"
            />
          </div>

          <div className="space-y-8">
            <SectionHeading
              eyebrow="Youth Program"
              title={CENTRAL_PA_LIONS_CONTENT.shortTitle}
              description="AAU & Travel Basketball — Grades K-12"
            />

            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-[0.08em] text-ice-blue">
                {about.heading}
              </h3>
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-8 text-mountie-silver"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-2xl border border-ice-blue/20 bg-mountie-blue/10 p-6">
              <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                {mission.heading}
              </h3>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue">
                {mission.seasonMissionLabel}
              </p>
              <p className="mt-3 text-base leading-8 text-mountie-silver">
                {mission.seasonMission}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/central-pa-lions"
                className="inline-flex items-center rounded-full border border-ice-blue/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue transition-colors hover:border-ice-blue hover:bg-ice-blue/10"
              >
                View Photos & Videos
              </Link>
              <Link
                href={CENTRAL_PA_LIONS_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight transition-opacity hover:opacity-90"
              >
                Visit Academy Website
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
