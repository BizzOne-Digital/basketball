"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  text,
  className,
  as: Tag = "h2",
}: SplitTextProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !ref.current) {
      return;
    }

    let cancelled = false;

    async function animate() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled || !ref.current) {
        return;
      }

      const words = text.split(" ");
      ref.current.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="split-word inline-block">${word}&nbsp;</span></span>`,
        )
        .join("");

      gsap.from(ref.current.querySelectorAll(".split-word"), {
        y: "110%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    }

    animate();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion, text]);

  return (
    <Tag ref={ref as never} className={cn("break-words", className)}>
      {reducedMotion ? text : null}
    </Tag>
  );
}
