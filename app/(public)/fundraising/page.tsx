import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { FUNDRAISING, CASH_BASH } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Support Philipsburg-Osceola Mountaineer Basketball through our fundraising programs.",
};

export default function FundraisingPage() {
  return (
    <ProgramPageShell
      title={FUNDRAISING.title}
      description="Support the Mountaineer Basketball Program"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fundraising" },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-4">
        <article className="flex gap-4 overflow-hidden rounded-xl border border-white/10 bg-gunmetal/20 p-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 sm:h-28 sm:w-28">
            <Image
              src="/images/events/pick-3-lottery-flyer.png"
              alt="Philipsburg Osceola Basketball Pick 3 Lottery Calendar"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg uppercase tracking-[0.08em] text-ice-blue">
              Pick 3 Lottery
            </h2>
            <p className="mt-2 text-sm leading-6 text-mountie-silver">
              Support the program through our Pick 3 fundraiser. Contact the coaching staff for more details.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue hover:underline"
            >
              Contact for Details
            </Link>
          </div>
        </article>

        <article className="flex gap-4 overflow-hidden rounded-xl border border-white/10 bg-gunmetal/20 p-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 sm:h-28 sm:w-28">
            <Image
              src="/images/events/cash-bash-lions-flyer.png"
              alt="PO Elementary Boys Basketball Cash Bash flyer"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
              Cash Bash — {CASH_BASH.theme}
            </h2>
            <p className="mt-2 text-sm leading-6 text-mountie-silver">
              {CASH_BASH.date} · {CASH_BASH.time} at {CASH_BASH.location}. Tickets{" "}
              {CASH_BASH.ticketPrice} — includes meal, drinks, entertainment, and a chance at $100
              every 15 minutes. Final cash winner $1,000.
            </p>
            <Link
              href="/cash-bash"
              className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue hover:underline"
            >
              Learn More About Cash Bash
            </Link>
          </div>
        </article>

        <div className="rounded-xl border border-ice-blue/30 bg-midnight p-5">
          <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
            Why We Fundraise
          </h3>
          <p className="mt-3 text-sm leading-6 text-mountie-silver">
            Fundraising efforts support uniforms, equipment, training programs, and tournament travel for our student-athletes. Every contribution helps maintain the Mountie tradition of excellence.
          </p>
        </div>
      </div>
    </ProgramPageShell>
  );
}
