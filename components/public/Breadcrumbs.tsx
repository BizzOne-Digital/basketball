import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex min-w-0 max-w-full flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em]", className)}
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <ChevronRight size={12} className="text-mountie-silver" />
          ) : null}
          {item.href ? (
            <Link
              href={item.href}
              className="text-mountie-silver transition-colors hover:text-ice-blue"
            >
              {item.label}
            </Link>
          ) : (
            <span className="break-words text-ice-blue">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
