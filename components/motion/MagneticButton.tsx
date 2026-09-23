"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();

  const variants = {
    primary:
      "bg-ice-blue text-midnight hover:bg-mountie-white border border-ice-blue",
    secondary:
      "border border-mountie-silver/40 text-mountie-white hover:border-ice-blue hover:text-ice-blue",
    ghost: "text-ice-blue hover:text-mountie-white",
  };

  if (reducedMotion) {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-colors",
          variants[variant],
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-colors",
          variants[variant],
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
