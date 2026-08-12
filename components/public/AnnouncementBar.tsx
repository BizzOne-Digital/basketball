import Link from "next/link";
import type { AnnouncementBar as AnnouncementBarType } from "@/types";
import { cn } from "@/lib/utils/cn";

interface AnnouncementBarProps {
  announcement?: AnnouncementBarType;
}

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  if (!announcement?.enabled || !announcement.message) {
    return null;
  }

  const content = (
    <span className="text-sm font-medium tracking-wide">
      {announcement.message}
      {announcement.linkLabel ? (
        <span className="ml-2 underline underline-offset-4">
          {announcement.linkLabel}
        </span>
      ) : null}
    </span>
  );

  return (
    <div
      className={cn(
        "border-b border-white/10 px-4 py-2 text-center break-words",
        !announcement.backgroundColor && "bg-mountie-blue",
        !announcement.textColor && "text-mountie-white",
      )}
      style={{
        backgroundColor: announcement.backgroundColor,
        color: announcement.textColor,
      }}
    >
      {announcement.linkUrl ? (
        <Link href={announcement.linkUrl} className="block hover:opacity-90">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
