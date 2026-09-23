"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

const INTRO_KEY = "mountie-intro-seen";

export function CinematicIntro() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reducedMotion || sessionStorage.getItem(INTRO_KEY)) {
      return;
    }

    const showTimer = setTimeout(() => setVisible(true), 0);

    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => {
        sessionStorage.setItem(INTRO_KEY, "1");
        setVisible(false);
      }, 3800),
    ];

    return () => {
      clearTimeout(showTimer);
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  function skipIntro() {
    sessionStorage.setItem(INTRO_KEY, "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-midnight grain-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <button
            type="button"
            onClick={skipIntro}
            className="absolute right-6 top-6 z-10 text-xs uppercase tracking-[0.2em] text-mountie-silver hover:text-ice-blue"
          >
            Skip
          </button>

          <div className="relative flex flex-col items-center gap-6 px-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/mountie-logo.png"
                alt="Mountie Basketball"
                width={120}
                height={120}
                priority
                className="h-24 w-24 object-contain"
              />
            </motion.div>

            <motion.p
              className="font-display text-sm uppercase tracking-[0.35em] text-ice-blue"
              animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 12 }}
            >
              Philipsburg-Osceola
            </motion.p>

            <motion.h1
              className="font-display text-4xl uppercase tracking-[0.12em] text-mountie-white md:text-6xl"
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
            >
              Mountie Basketball
            </motion.h1>

            <div className="court-line mt-4 w-48" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
