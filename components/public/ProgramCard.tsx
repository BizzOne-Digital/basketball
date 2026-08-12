import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PLACEHOLDERS, resolveImageAlt, resolveImagePath } from "@/lib/images";
import type { ServiceDocument } from "@/types";

interface ProgramCardProps {
  service: ServiceDocument;
}

export function ProgramCard({ service }: ProgramCardProps) {
  const src = resolveImagePath(service.cardImage, PLACEHOLDERS.service);

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-mountie-blue/20 transition-colors hover:border-ice-blue/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={resolveImageAlt(service.cardImage, service.title)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 break-words font-display text-xl uppercase tracking-[0.08em] text-mountie-white sm:text-2xl">
            {service.cardTitle ?? service.title}
          </h3>
          <ArrowUpRight className="mt-1 shrink-0 text-ice-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="text-sm leading-7 text-mountie-silver">
          {service.cardDescription ?? service.intro ?? "Explore this program."}
        </p>
        <span className="mt-auto text-xs font-semibold uppercase tracking-[0.18em] text-ice-blue">
          {service.cardCtaLabel ?? "Learn More"}
        </span>
      </div>
    </Link>
  );
}
