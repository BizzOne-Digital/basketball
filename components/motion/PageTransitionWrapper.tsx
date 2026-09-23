"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export function PageTransitionWrapper({
  children,
}: PageTransitionWrapperProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="w-full min-w-0 overflow-x-clip"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
