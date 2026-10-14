"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SocialLinks } from "@/components/public/SocialLinks";
import {
  HEADER_MORE_LINKS,
  HEADER_NAV_LINKS,
  MEET_THE_MOUNTIES_HREF,
  MEET_THE_MOUNTIES_LINKS,
} from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";
import type { SiteSettingsDocument } from "@/types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  settings: SiteSettingsDocument;
}

export function MobileMenu({ open, onClose, settings }: MobileMenuProps) {
  const pathname = usePathname();
  const [mountiesExpanded, setMountiesExpanded] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-midnight/95 backdrop-blur-xl xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex min-h-full flex-col px-6 py-24">
            <nav className="flex flex-col gap-3" aria-label="Mobile">
              {HEADER_NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "font-display text-2xl uppercase tracking-[0.1em]",
                      pathname === link.href
                        ? "text-ice-blue"
                        : "text-mountie-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Meet the Mounties with Seasons */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: HEADER_NAV_LINKS.length * 0.02 }}
              >
                <div
                  className={cn(
                    "flex w-full items-center justify-between gap-4",
                    pathname.startsWith(MEET_THE_MOUNTIES_HREF)
                      ? "text-ice-blue"
                      : "text-mountie-white",
                  )}
                >
                  <Link
                    href={MEET_THE_MOUNTIES_HREF}
                    onClick={onClose}
                    className="font-display text-2xl uppercase tracking-[0.1em]"
                  >
                    Meet the Mounties
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle season menu"
                    aria-expanded={mountiesExpanded}
                    onClick={() => setMountiesExpanded(!mountiesExpanded)}
                  >
                    <ChevronDown
                      size={20}
                      className={cn(
                        "transition-transform",
                        mountiesExpanded && "rotate-180",
                      )}
                    />
                  </button>
                </div>
                {mountiesExpanded && (
                  <div className="ml-4 mt-3 space-y-2">
                    {MEET_THE_MOUNTIES_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="block text-lg uppercase tracking-[0.12em] text-mountie-silver"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* More Links */}
              {HEADER_MORE_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (HEADER_NAV_LINKS.length + 1 + index) * 0.02 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "font-display text-2xl uppercase tracking-[0.1em]",
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

            <div className="mt-auto space-y-6 pt-10">
              <MagneticButton href="/support" variant="primary">
                Support The Program
              </MagneticButton>
              <SocialLinks links={settings.socialLinks} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
