"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JR_HIGH_SEASONS } from "@/lib/content/jr-high-basketball";
import { cn } from "@/lib/utils/cn";

interface JrHighSeasonNavProps {
  currentSlug: string;
}

export function JrHighSeasonNav({ currentSlug }: JrHighSeasonNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Junior high seasons"
      className="mb-6 flex flex-wrap gap-2"
    >
      {JR_HIGH_SEASONS.map((season) => {
        const href = `/po-jr-high-basketball/${season.slug}`;
        const active =
          season.slug === currentSlug ||
          pathname === href ||
          pathname.startsWith(`${href}/`);

        return (
          <Link
            key={season.slug}
            href={href}
            className={cn(
              "rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-xs",
              active
                ? "bg-mountie-blue text-mountie-white"
                : "border border-white/10 text-mountie-silver hover:border-ice-blue/40 hover:text-ice-blue",
            )}
          >
            {season.label.replace(" Season", "")}
          </Link>
        );
      })}
    </nav>
  );
}
