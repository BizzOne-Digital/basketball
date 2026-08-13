import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { ALUMNI_CONTENT } from "@/lib/content/mountie-program";
import { getGalleryImageByIndex } from "@/lib/images";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Mountaineer Basketball alumni, history, and 1976 champions anniversary.",
};

export default function AlumniPage() {
  return (
    <ProgramPageShell
      title="Alumni"
      description={ALUMNI_CONTENT.headline}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Alumni" },
      ]}
    >
      <div className="space-y-12">
        <p className="max-w-3xl text-lg leading-8 text-mountie-silver">
          {ALUMNI_CONTENT.timelineNote}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={getGalleryImageByIndex(index)}
                alt={`Alumni team photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
            Alumni Sections
          </h2>
          {ALUMNI_CONTENT.sections.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-gunmetal/30 px-6 py-4 text-mountie-silver"
            >
              {item}
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-ice-blue/30 bg-ice-blue/5 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-ice-blue">
            Alumni Spotlight
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-mountie-white">
            {ALUMNI_CONTENT.spotlight.name}
          </h2>
          <p className="mt-4 text-mountie-silver">{ALUMNI_CONTENT.spotlight.note}</p>
        </section>
      </div>
    </ProgramPageShell>
  );
}
