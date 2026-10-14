import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import {
  formatScorerPoints,
  THOUSAND_POINT_SCORERS,
} from "@/lib/content/thousand-point-scorers";

export const metadata: Metadata = {
  title: "1,000 Career Points Scorers",
  description:
    "Philipsburg-Osceola Mountaineer Basketball 1,000 point club — all-time career scoring leaders.",
};

export default function ThousandPointScorersPage() {
  return (
    <ProgramPageShell
      title={THOUSAND_POINT_SCORERS.title}
      description={THOUSAND_POINT_SCORERS.subtitle}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Record Book", href: "/record-book" },
        { label: "1,000 Point Scorers" },
      ]}
    >
      <div className="space-y-12">
        <div className="rounded-xl border border-ice-blue/30 bg-mountie-blue/10 p-6">
          <p className="text-lg font-semibold uppercase tracking-[0.08em] text-mountie-white">
            {THOUSAND_POINT_SCORERS.subtitle}
          </p>
        </div>

        <ol className="space-y-3">
          {THOUSAND_POINT_SCORERS.scorers.map((scorer) => (
            <li
              key={scorer.name}
              className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-4 text-base leading-7 text-mountie-silver"
            >
              <span className="font-semibold text-ice-blue">{scorer.rank}.</span>{" "}
              {scorer.coachedByAnderson ? (
                <span className="font-semibold text-ice-blue">*</span>
              ) : null}
              <span className="font-semibold text-mountie-white">
                {scorer.name}
              </span>{" "}
              {scorer.years} {formatScorerPoints(scorer.points)}
              {"note" in scorer && scorer.note ? (
                <span className="text-mountie-silver"> ({scorer.note})</span>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue">
          {THOUSAND_POINT_SCORERS.andersonNote}
        </p>

        <div className="space-y-16">
          {THOUSAND_POINT_SCORERS.scorers.map((scorer) => (
            <section
              key={scorer.name}
              id={scorer.name.toLowerCase().replace(/\s+/g, "-")}
              className="scroll-mt-24"
            >
              <div className="mb-6 flex flex-wrap items-baseline gap-3">
                <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
                  {scorer.rank}. {scorer.name}
                  {scorer.coachedByAnderson ? (
                    <span className="ml-2 text-ice-blue">*</span>
                  ) : null}
                </h2>
                <p className="text-sm uppercase tracking-[0.16em] text-mountie-silver">
                  {scorer.years} · {formatScorerPoints(scorer.points)}
                </p>
              </div>

              {"note" in scorer && scorer.note ? (
                <p className="mb-4 text-base leading-7 text-ice-blue">
                  {scorer.note}
                </p>
              ) : null}

              {"highlight" in scorer && scorer.highlight ? (
                <p className="mb-6 max-w-3xl text-base leading-8 text-mountie-silver">
                  {scorer.highlight}
                </p>
              ) : null}

              {"image" in scorer && scorer.image ? (
                <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-midnight">
                  <Image
                    src={scorer.image.path}
                    alt={scorer.image.alt}
                    width={1200}
                    height={1600}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-gunmetal/10 px-6 py-10 text-center">
                  <p className="text-sm uppercase tracking-[0.16em] text-mountie-silver">
                    {scorer.name} — {formatScorerPoints(scorer.points)}
                  </p>
                  <p className="mt-2 text-xs text-mountie-silver/70">
                    {scorer.years}
                  </p>
                </div>
              )}

            </section>
          ))}
        </div>

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
