"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SocialLinks } from "@/components/public/SocialLinks";
import { HEADER_NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";
import type { SiteSettingsDocument } from "@/types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  settings: SiteSettingsDocument;
}

export function MobileMenu({ open, onClose, settings }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-midnight/95 backdrop-blur-xl xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex h-full flex-col px-6 py-24">
            <nav className="flex flex-col gap-4" aria-label="Mobile">
              {HEADER_NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "font-display text-3xl uppercase tracking-[0.12em]",
                      pathname === link.href
                        ? "text-ice-blue"
                        : "text-mountie-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-6">
              <MagneticButton href="/contact" variant="primary">
                Contact Us
              </MagneticButton>
              <SocialLinks links={settings.socialLinks} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
