import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getAwardWinnersBySeason } from "@/lib/data/award-winners";

export const metadata: Metadata = {
  title: "Award Winners Through The Years",
  description:
    "Philipsburg-Osceola Mountaineer Basketball award winners by season.",
};

export default function AwardWinnersPage() {
  const seasons = getAwardWinnersBySeason();

  return (
    <ProgramPageShell
      title="Award Winners Through The Years"
      description="Mountain League and program honors by season"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Record Book", href: "/record-book" },
        { label: "Award Winners" },
      ]}
    >
      <div className="space-y-16">
        {seasons.length > 0 ? (
          seasons.map((season) => (
            <section key={season.slug} id={season.slug} className="scroll-mt-24">
              <SectionHeading
                eyebrow="Season Honors"
                title={season.label}
                className="mb-8"
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {season.winners.map((winner) => (
                  <article
                    key={`${season.slug}-${winner.name}-${winner.imagePath}`}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20"
                  >
                    <div className="relative aspect-[3/4] bg-midnight">
                      <Image
                        src={winner.imagePath}
                        alt={winner.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="border-t border-white/10 px-4 py-4 text-center">
                      <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                        {winner.name}
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-mountie-silver">
            Award winner photos will be added soon.
          </p>
        )}

        <div className="rounded-xl border border-white/10 bg-gunmetal/20 p-6">
          <Link
            href="/record-book"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:underline"
          >
            ← Back to Record Book
          </Link>
        </div>
      </div>
    </ProgramPageShell>
  );
}
