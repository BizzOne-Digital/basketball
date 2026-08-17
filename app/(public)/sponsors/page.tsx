import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SPONSORS_2026 } from "@/lib/content/mountie-program";

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
      <div className="space-y-12">
        <p className="max-w-3xl text-lg leading-8 text-mountie-silver">
          {SPONSORS_2026.intro}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSORS_2026.logos.map((sponsor, index) => (
            <article
              key={sponsor.slug}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/95 transition-all duration-500 hover:border-ice-blue/50 hover:shadow-[0_24px_60px_-30px_rgba(125,211,252,0.4)]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={`/images/sponsors/${sponsor.slug}.png`}
                  alt={sponsor.name}
                  fill
                  priority={index < 6}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="border-t border-midnight/10 bg-white px-4 py-3">
                <p className="text-center font-display text-sm uppercase tracking-[0.1em] text-midnight">
                  {sponsor.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ProgramPageShell>
  );
}
