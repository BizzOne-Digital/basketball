import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { RELATED_SITES } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Related Sites",
  description: "Social media and related links for Mountaineer Basketball.",
};

export default function RelatedSitesPage() {
  return (
    <ProgramPageShell
      title="Related Sites"
      description="Follow the Mounties and connect with our community online."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Related Sites" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {RELATED_SITES.map((site) => (
          <Link
            key={site.label}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-gunmetal/30 p-6 transition-colors hover:border-ice-blue/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white group-hover:text-ice-blue">
                  {site.label}
                </h2>
                {"handle" in site && site.handle ? (
                  <p className="mt-2 text-sm text-mountie-silver">{site.handle}</p>
                ) : null}
              </div>
              <ExternalLink size={16} className="mt-1 shrink-0 text-ice-blue" />
            </div>
          </Link>
        ))}
      </div>
    </ProgramPageShell>
  );
}
