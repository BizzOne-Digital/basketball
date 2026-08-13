import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SPONSORS_2026 } from "@/lib/content/mountie-program";
import { getGalleryImageByIndex } from "@/lib/images";
import Image from "next/image";

export const metadata: Metadata = {
  title: "2026 Sponsors and Donors",
  description: "Thank you to our Mountaineer Basketball sponsors and donors.",
};

export default function SponsorsPage() {
  return (
    <ProgramPageShell
      title={SPONSORS_2026.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "2026 Sponsors" },
      ]}
    >
      <div className="space-y-10">
        <p className="max-w-3xl text-lg leading-8 text-mountie-silver">
          {SPONSORS_2026.intro}
        </p>
        <p className="text-sm uppercase tracking-[0.18em] text-ice-blue">
          {SPONSORS_2026.note}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={getGalleryImageByIndex(index)}
                alt={`Sponsor placeholder ${index + 1}`}
                fill
                className="object-cover opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </ProgramPageShell>
  );
}
