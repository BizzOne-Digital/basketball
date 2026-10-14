import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import {
  PO_BASKETBALL_NEWSLETTERS,
  newsletterPdfHref,
} from "@/lib/content/newsletters";

export const metadata: Metadata = {
  title: "P-O Basketball Newsletters",
  description:
    "Download past issues of the Philipsburg-Osceola Dribble Drive Coaches Newsletter.",
};

export default function NewslettersPage() {
  return (
    <ProgramPageShell
      title="P-O Basketball Newsletters"
      description="Dribble Drive Coaches Newsletter — past issues"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "P-O Basketball Newsletters" },
      ]}
    >
      <div className="rounded-xl border border-white/10 bg-mountie-blue/10 p-6">
        <p className="text-sm leading-7 text-mountie-silver">
          Browse and download PDF editions of the P-O Dribble Drive Coaches
          Newsletter. New issues will be added here as they are published.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {PO_BASKETBALL_NEWSLETTERS.map((entry) => (
          <li key={entry.filename}>
            <Link
              href={newsletterPdfHref(entry.filename)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-gunmetal/20 p-6 transition-colors hover:border-ice-blue/40 hover:bg-mountie-blue/10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-midnight text-ice-blue">
                <FileText size={22} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xs uppercase tracking-[0.16em] text-ice-blue">
                  Issue {entry.issue}
                </p>
                <h2 className="mt-1 font-display text-lg uppercase tracking-[0.06em] text-mountie-white group-hover:text-ice-blue">
                  {entry.title}
                </h2>
                <p className="mt-1 text-sm text-mountie-silver">Open PDF</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </ProgramPageShell>
  );
}
