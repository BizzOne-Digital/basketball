import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { DEFAULT_LOGO, resolveImagePath } from "@/lib/images";
import type { ImageObject } from "@/types";

interface LogoProps {
  logo?: ImageObject;
  organizationName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { image: 36, text: "text-lg" },
  md: { image: 48, text: "text-xl" },
  lg: { image: 64, text: "text-2xl" },
};

export function Logo({
  logo,
  organizationName,
  className,
  size = "md",
  showText = true,
}: LogoProps) {
  const src = resolveImagePath(logo, DEFAULT_LOGO);

  return (
    <Link
      href="/"
      className={cn("group inline-flex min-w-0 max-w-full items-center gap-3", className)}
    >
      <Image
        src={src}
        alt={logo?.alt ?? organizationName}
        width={sizes[size].image}
        height={sizes[size].image}
        className="object-contain transition-transform group-hover:scale-105"
        priority
      />
      {showText ? (
        <span
          className={cn(
            "min-w-0 break-words font-display uppercase tracking-[0.14em] text-mountie-white",
            sizes[size].text,
          )}
        >
          {organizationName}
        </span>
      ) : null}
    </Link>
  );
}
