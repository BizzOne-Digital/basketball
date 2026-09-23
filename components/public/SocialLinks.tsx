import Link from "next/link";
import type { SocialLinks as SocialLinksType } from "@/types";
import { cn } from "@/lib/utils/cn";

interface SocialLinksProps {
  links?: SocialLinksType;
  className?: string;
}

const ICONS = [
  { key: "facebook" as const, label: "Facebook", shortLabel: "FB" },
  { key: "instagram" as const, label: "Instagram", shortLabel: "IG" },
  { key: "twitter" as const, label: "Twitter", shortLabel: "X" },
  { key: "youtube" as const, label: "YouTube", shortLabel: "YT" },
  { key: "linkedin" as const, label: "LinkedIn", shortLabel: "IN" },
  { key: "tiktok" as const, label: "TikTok", shortLabel: "TT" },
];

export function SocialLinks({ links, className }: SocialLinksProps) {
  const active = ICONS.filter((item) => links?.[item.key]);

  if (active.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {active.map(({ key, label, shortLabel }) => (
        <Link
          key={key}
          href={links![key]!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[10px] font-semibold uppercase tracking-[0.12em] text-mountie-silver transition-colors hover:border-ice-blue hover:text-ice-blue"
        >
          {shortLabel}
        </Link>
      ))}
    </div>
  );
}
