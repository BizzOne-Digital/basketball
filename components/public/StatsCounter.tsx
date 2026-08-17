"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsCounterProps {
  stats: StatItem[];
}

function animateValue(
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void,
) {
  const startTime = performance.now();

  function frame(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    onUpdate(Math.round(start + (end - start) * eased));

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

export function StatsCounter({ stats }: StatsCounterProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const targetValues = stats.map((stat) => stat.value);
  const [values, setValues] = useState<number[]>(() => targetValues.map(() => 0));
  const [started, setStarted] = useState(false);
  const displayValues = reducedMotion ? targetValues : values;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!started || reducedMotion) return;

    stats.forEach((stat, index) => {
      animateValue(0, stat.value, 1400, (value) => {
        setValues((current) => {
          const next = [...current];
          next[index] = value;
          return next;
        });
      });
    });
  }, [started, reducedMotion, stats]);

  return (
    <div
      ref={ref}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-mountie-blue/20 p-6 text-center"
        >
          <p className="font-display text-5xl text-ice-blue">
            {displayValues[index]}
            {stat.suffix ?? ""}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-mountie-silver">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
