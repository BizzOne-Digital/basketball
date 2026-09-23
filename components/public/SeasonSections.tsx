import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SEASONS, seasonHref } from "@/lib/content/seasons";

export function SeasonSections() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {SEASONS.map((season) => (
        <article
          key={season.slug}
          className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-4 transition-colors hover:border-ice-blue/30"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ice-blue">
                {season.current ? "Current Season" : season.years}
              </p>
              <h2 className="mt-1 font-display text-xl uppercase tracking-[0.08em] text-mountie-white sm:text-2xl">
                {season.label}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-mountie-silver">
                {season.description}
              </p>
            </div>
            <Link
              href={seasonHref(season.slug)}
              className="inline-flex shrink-0 items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue hover:text-mountie-white sm:self-center"
            >
              View Season
              <ArrowRight size={14} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
