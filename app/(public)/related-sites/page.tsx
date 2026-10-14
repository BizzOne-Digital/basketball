import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { RELATED_SITES } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Related Sites",
  description: "External links and resources for Philipsburg-Osceola Mountaineer Basketball.",
};

export default function RelatedSitesPage() {
  return (
    <ProgramPageShell
      title="Related Sites"
      description="External Links & Resources"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Related Sites" },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {RELATED_SITES.map((site) => (
          <Link
            key={site.label}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-gunmetal/20 p-6 transition-colors hover:border-ice-blue/40 hover:bg-mountie-blue/10"
          >
            <div>
              <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white group-hover:text-ice-blue">
                {site.label}
              </h3>
              {("handle" in site) ? (
                <p className="mt-1 text-sm text-mountie-silver">{site.handle}</p>
              ) : null}
            </div>
            <ExternalLink size={20} className="text-ice-blue" />
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-mountie-blue/10 p-6">
          <h3 className="font-display text-sm uppercase tracking-[0.16em] text-ice-blue">
            Social Media
          </h3>
          <p className="mt-3 text-sm leading-7 text-mountie-silver">
            Follow us on X, Instagram, and Facebook for updates, game highlights, and program news.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-gunmetal/20 p-6">
          <h3 className="font-display text-sm uppercase tracking-[0.16em] text-ice-blue">
            MaxPreps
          </h3>
          <p className="mt-3 text-sm leading-7 text-mountie-silver">
            View our schedule, scores, stats, and rankings on MaxPreps throughout the season.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-midnight p-6">
          <h3 className="font-display text-sm uppercase tracking-[0.16em] text-ice-blue">
            Local Media
          </h3>
          <p className="mt-3 text-sm leading-7 text-mountie-silver">
            Coverage from The Progress, Centre Daily Times, and Altoona Mirror.
          </p>
        </div>
      </div>
    </ProgramPageShell>
  );
}
