"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/public/Logo";
import { MobileMenu } from "@/components/public/MobileMenu";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HEADER_NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";
import type { SiteSettingsDocument } from "@/types";

interface HeaderProps {
  settings: SiteSettingsDocument;
}

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:text-ice-blue",
                  pathname === link.href
                    ? "text-ice-blue"
                    : "text-mountie-silver",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <MagneticButton href="/contact" variant="primary">
                Join Us
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
