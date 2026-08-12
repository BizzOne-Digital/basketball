"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

type AdminHeaderProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
  userEmail?: string | null;
};

function formatBreadcrumb(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AdminHeader({ onToggleSidebar, userEmail }: AdminHeaderProps) {
  const pathname = usePathname();
  const segments = pathname.replace("/admin", "").split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#B7C0CC]/30 bg-white/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-[#343A40] hover:bg-[#F7F9FC] md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#5BB9FF]">
            Mountie Basketball
          </p>
          <nav className="flex items-center gap-1 text-sm text-[#343A40]">
            <span className="font-semibold text-[#04101F]">Admin</span>
            {segments.map((segment, i) => (
              <span key={`${segment}-${i}`} className="flex items-center gap-1">
                <span className="text-[#B7C0CC]">/</span>
                <span>{formatBreadcrumb(segment)}</span>
              </span>
            ))}
          </nav>
        </div>
      </div>
      {userEmail && (
        <div className="hidden text-right sm:block">
          <p className="text-xs text-[#B7C0CC]">Signed in as</p>
          <p className="text-sm font-medium text-[#04101F]">{userEmail}</p>
        </div>
      )}
    </header>
  );
}
