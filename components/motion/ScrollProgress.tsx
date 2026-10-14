"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-ice-blue"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
