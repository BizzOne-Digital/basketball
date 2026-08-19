"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  className,
  width,
  height,
  fill,
  priority,
}: ImageRevealProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [visible, setVisible] = useState(priority ?? false);

  useEffect(() => {
    if (priority) {
      setVisible(true);
      return;
    }

    if (inView) {
      setVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
    }
  }, [priority, inView]);

  if (reducedMotion) {
    return (
      <div className={cn("relative w-full max-w-full overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill ?? true}
          priority={priority}
          sizes={priority ? "100vw" : undefined}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-full overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{
        clipPath: visible ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill ?? true}
        priority={priority}
        className="object-cover"
      />
    </motion.div>
  );
}
