import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, Music, Clock, Calendar } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { CASH_BASH } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Cash Bash — Vegas Night",
  description:
    "Philipsburg Osceola Elementary Basketball Cash Bash — Vegas Night, January 10, 2026 at Columbia Fire Hall.",
};

export default function CashBashPage() {
  return (
    <ProgramPageShell
      title="Cash Bash"
      description={`${CASH_BASH.theme} · ${CASH_BASH.date}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cash Bash" },
      ]}
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
          <Image
            src={CASH_BASH.flyerImage}
            alt={`${CASH_BASH.title} flyer`}
            fill
            priority
            className="object-cover object-top"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </div>

        <div className="space-y-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ice-blue">
              {CASH_BASH.theme}
            </p>
            <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-mountie-white sm:text-4xl">
              {CASH_BASH.title}
            </h2>
            <p className="text-lg text-mountie-silver">{CASH_BASH.ageRequirement}</p>
          </div>

          <ul className="space-y-4 text-mountie-silver">
            <li className="flex items-start gap-3">
              <Calendar className="mt-0.5 shrink-0 text-ice-blue" size={18} />
              <span>
                <span className="font-medium text-mountie-white">{CASH_BASH.date}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 shrink-0 text-ice-blue" size={18} />
              <span>
                <span className="font-medium text-mountie-white">{CASH_BASH.time}</span>
                <span className="mt-0.5 block text-sm text-mountie-silver/70">
                  {CASH_BASH.doorsOpen}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-ice-blue" size={18} />
              <span>{CASH_BASH.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="mt-0.5 shrink-0 text-ice-blue" size={18} />
              <span>{CASH_BASH.entertainment}</span>
            </li>
          </ul>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ice-blue/30 bg-ice-blue/5 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-ice-blue">Ticket</p>
              <p className="mt-2 font-display text-2xl text-mountie-white">
                {CASH_BASH.ticketPrice}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gunmetal/30 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-mountie-silver">
                Grand Prize
              </p>
              <p className="mt-2 font-display text-xl text-mountie-white">
                {CASH_BASH.grandPrize}
              </p>
              <p className="mt-1 text-sm text-mountie-silver">{CASH_BASH.cashChance}</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-display text-sm uppercase tracking-[0.16em] text-mountie-white">
                Ticket Includes
              </h3>
              <ul className="space-y-2 text-mountie-silver">
                {CASH_BASH.ticketIncludes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-ice-blue">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-display text-sm uppercase tracking-[0.16em] text-mountie-white">
                Sold Separately
              </h3>
              <ul className="space-y-2 text-mountie-silver">
                {CASH_BASH.soldSeparately.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-ice-blue">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-mountie-silver/70">
                {CASH_BASH.presentToWin}
              </p>
            </div>
          </div>

          <Link
            href={CASH_BASH.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:text-mountie-white"
          >
            Facebook: {CASH_BASH.facebookLabel}
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </ProgramPageShell>
  );
}
