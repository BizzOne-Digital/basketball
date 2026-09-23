import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SectionHeading } from "@/components/public/SectionHeading";
import { MOUNTIE_GEAR_CONTENT } from "@/lib/content/mountie-gear";

export const metadata: Metadata = {
  title: "Get Your Mountie Gear",
  description:
    "Order official Philipsburg-Osceola Mountaineer Basketball gear for the 2026 winter season.",
};

export default function MountieGearPage() {
  const content = MOUNTIE_GEAR_CONTENT;

  return (
    <ProgramPageShell
      title={content.pageTitle}
      description={content.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: content.title },
      ]}
    >
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20">
          <Image
            src={content.sponsorImage}
            alt={content.sponsorAlt}
            width={1200}
            height={400}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        <section className="rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
            {content.headline}
          </p>
          <p className="mt-4 text-lg leading-8 text-mountie-silver">
            {content.intro}
          </p>
        </section>

        {content.stores.map((store) => (
          <section
            key={store.title}
            className="rounded-2xl border border-white/10 bg-gunmetal/20 p-8"
          >
            <SectionHeading title={store.title} className="mb-4" />
            <p className="text-base leading-8 text-mountie-silver">
              {store.description}
            </p>
            <ul className="mt-4 space-y-2">
              {store.windows.map((window) => (
                <li
                  key={window}
                  className="text-sm font-semibold uppercase tracking-[0.12em] text-mountie-white"
                >
                  {window}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <SectionHeading title="Order Gear" className="mb-6" />
          <div className="space-y-4">
            {content.links.map((link) => (
              <article
                key={link.label}
                className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6"
              >
                <h3 className="font-display text-xl uppercase tracking-[0.08em] text-mountie-white">
                  {link.label}
                </h3>
                {link.available && link.href ? (
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight transition-opacity hover:opacity-90"
                  >
                    Shop Now
                    <ExternalLink size={16} />
                  </Link>
                ) : (
                  <p className="mt-3 text-base text-mountie-silver">
                    {link.note ?? "Coming soon"}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <p className="text-center text-lg leading-8 text-mountie-silver">
          {content.closingNote}
        </p>
      </div>
    </ProgramPageShell>
  );
}
