"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
      className={cn("relative w-full max-w-full overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
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
