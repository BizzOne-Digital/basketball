"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/public/Logo";
import { MobileMenu } from "@/components/public/MobileMenu";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HEADER_MORE_LINKS, HEADER_NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";
import type { SiteSettingsDocument } from "@/types";

interface HeaderProps {
  settings: SiteSettingsDocument;
}

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = HEADER_MORE_LINKS.some((link) => pathname === link.href);

  return (
    <>
      <header className="sticky top-0 z-50 w-full overflow-x-clip border-b border-white/10 bg-midnight/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <Logo
            logo={settings.logo}
            organizationName={settings.organizationName}
            size="sm"
            showText={false}
            className="min-w-0 shrink"
          />

          <nav className="hidden items-center gap-4 xl:flex" aria-label="Main">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-ice-blue",
                  pathname === link.href
                    ? "text-ice-blue"
                    : "text-mountie-silver",
                )}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-ice-blue",
                  isMoreActive ? "text-ice-blue" : "text-mountie-silver",
                )}
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((value) => !value)}
              >
                More
                <ChevronDown size={14} className={cn(moreOpen && "rotate-180")} />
              </button>
              {moreOpen ? (
                <div className="absolute right-0 top-full z-50 mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-midnight p-2 shadow-xl">
                  {HEADER_MORE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-white/5 hover:text-ice-blue",
                        pathname === link.href
                          ? "text-ice-blue"
                          : "text-mountie-silver",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <MagneticButton href="/support" variant="primary">
                Support
              </MagneticButton>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mountie-white xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        settings={settings}
      />
    </>
  );
}
