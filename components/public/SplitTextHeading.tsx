"use client";

import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/utils/cn";

interface SplitTextHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SplitTextHeading({
  eyebrow,
  title,
  description,
  className,
}: SplitTextHeadingProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
          {eyebrow}
        </p>
      ) : null}
      <SplitText
        text={title}
        as="h2"
        className="break-words font-display text-3xl uppercase tracking-[0.08em] text-mountie-white sm:text-4xl md:text-5xl"
      />
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-mountie-silver">
          {description}
        </p>
      ) : null}
    </div>
  );
}
