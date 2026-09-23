"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Images,
  MessageSquareQuote,
  HelpCircle,
  Newspaper,
  Users,
  ShoppingBag,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/news", label: "News / Blogs", icon: Newspaper },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/products", label: "Products / Shop", icon: ShoppingBag },
  { href: "/admin/contact-submissions", label: "Contact Submissions", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

type AdminSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  userEmail?: string | null;
};

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#0B2F63]/50 bg-[#04101F] text-[#F7F9FC] transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#0B2F63]/50 px-4">
          {!collapsed && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5BB9FF]">
                Mountie CMS
              </p>
              <p className="text-sm font-bold">Admin Portal</p>
            </div>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg p-2 text-[#B7C0CC] hover:bg-[#0B2F63] hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(href, exact)
                  ? "bg-[#0B2F63] text-[#5BB9FF]"
                  : "text-[#B7C0CC] hover:bg-[#0B2F63]/60 hover:text-white"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="space-y-1 border-t border-[#0B2F63]/50 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#B7C0CC] hover:bg-[#0B2F63]/60 hover:text-white"
            title={collapsed ? "View Website" : undefined}
          >
            <ExternalLink className="h-5 w-5 shrink-0" />
            {!collapsed && <span>View Website</span>}
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#B7C0CC] hover:bg-red-900/40 hover:text-red-200"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-4 left-4 z-50 rounded-full bg-[#0B2F63] p-3 text-white shadow-lg md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
}
