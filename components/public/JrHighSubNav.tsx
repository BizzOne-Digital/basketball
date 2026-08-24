"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getJrHighNavLinks, type JrHighSeason } from "@/lib/content/jr-high-basketball";
import { cn } from "@/lib/utils/cn";

interface JrHighSubNavProps {
  season: JrHighSeason;
}

export function JrHighSubNav({ season }: JrHighSubNavProps) {
  const pathname = usePathname();
  const links = getJrHighNavLinks(season);

  return (
    <nav
      aria-label="Junior high sections"
      className="mb-10 flex flex-wrap gap-2 border-b border-white/10 pb-4"
    >
      {links.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
              active
                ? "bg-ice-blue text-midnight"
                : "border border-white/10 text-mountie-silver hover:border-ice-blue/40 hover:text-ice-blue",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
