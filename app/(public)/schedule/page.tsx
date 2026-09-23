import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SeasonSchedule } from "@/components/public/SeasonSchedule";
import { MAXPREPS_SCHEDULE_URL } from "@/lib/content/mountie-program";
import {
  getSeasonSchedule,
  getSeasonSchedulePhotos,
  getSeasonScheduleScreenshots,
  SCHEDULE_PAGE_SEASONS,
} from "@/lib/content/season-schedules";

export const metadata: Metadata = {
  title: "Schedule & Results",
  description: "Mountaineer Basketball schedule, wins, and losses by season.",
};

export default function SchedulePage() {
  return (
    <ProgramPageShell
      title="Schedule & Results"
      description="Follow the Mounties all season long — games, wins, and results."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Schedule & Results" },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-lg leading-8 text-mountie-silver">
            Season schedules and results from 2020 through today. MaxPreps
            screenshots and game photos are organized by year below.
          </p>
          <Link
            href={MAXPREPS_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight transition-opacity hover:opacity-90"
          >
            Live MaxPreps
            <ExternalLink size={16} />
          </Link>
        </div>

        <div className="space-y-20 pt-6">
          {SCHEDULE_PAGE_SEASONS.map((season) => {
            const schedule = getSeasonSchedule(season.slug);
            const screenshots = getSeasonScheduleScreenshots(season.slug);
            const photos = getSeasonSchedulePhotos(season.slug);

            if (!schedule) {
              return null;
            }

            return (
              <section
                key={season.slug}
                className="space-y-10 border-t border-white/10 pt-16 first:border-t-0 first:pt-0"
              >
                <SeasonSchedule schedule={schedule} heading={season.label} />

                {screenshots.length > 0 ? (
                  <div>
                    <h3 className="mb-6 font-display text-xl uppercase tracking-[0.1em] text-ice-blue">
                      MaxPreps Schedule
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {screenshots.map((path, index) => (
                        <div
                          key={path}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20"
                        >
                          <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                            <Image
                              src={path}
                              alt={`${season.label} MaxPreps schedule page ${index + 1}`}
                              fill
                              className="object-contain bg-midnight"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {photos.length > 0 ? (
                  <div>
                    <h3 className="mb-6 font-display text-xl uppercase tracking-[0.1em] text-ice-blue">
                      Season Photos
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {photos.map((path, index) => (
                        <div
                          key={path}
                          className="overflow-hidden rounded-2xl border border-white/10"
                        >
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={path}
                              alt={`${season.label} season photo ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </ProgramPageShell>
  );
}
