import Link from "next/link";
import {
  FileText,
  Briefcase,
  Images,
  MessageSquareQuote,
  HelpCircle,
  Newspaper,
  Users,
  ShoppingBag,
  Mail,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { getDashboardStats, getSiteIdentity } from "@/lib/actions/admin/dashboard";

export default async function AdminDashboardPage() {
  const [statsResult, identityResult] = await Promise.all([
    getDashboardStats(),
    getSiteIdentity(),
  ]);

  if (!statsResult.success || !statsResult.data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {"error" in statsResult ? statsResult.error : "Unable to load dashboard."}
      </div>
    );
  }

  const stats = statsResult.data;
  const identity = identityResult.success ? identityResult.data : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">Dashboard</h1>
        <p className="mt-1 text-[#343A40]">
          {identity?.organizationName ?? "Mountie Basketball"} — {identity?.headline ?? ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pages" value={stats.pages} icon={FileText} />
        <StatCard label="Programs / Services" value={stats.services} icon={Briefcase} />
        <StatCard label="Gallery Images" value={stats.galleryImages} icon={Images} />
        <StatCard label="Testimonials" value={stats.testimonials} icon={MessageSquareQuote} />
        <StatCard label="FAQs" value={stats.faqs} icon={HelpCircle} />
        <StatCard label="News Posts" value={stats.blogPosts} icon={Newspaper} />
        <StatCard label="Team Members" value={stats.teamMembers} icon={Users} />
        <StatCard label="Products" value={stats.products} icon={ShoppingBag} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          label="Unread Contact Submissions"
          value={stats.unreadContacts}
          icon={Mail}
          className="lg:col-span-1"
        />
        <StatCard
          label="Published Content"
          value={stats.publishedContent}
          icon={CheckCircle2}
          className="lg:col-span-1"
        />
        <StatCard
          label="Draft Content"
          value={stats.draftContent}
          icon={Clock}
          className="lg:col-span-1"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-[#B7C0CC]/40 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#04101F]">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/admin/pages", label: "Edit Pages" },
              { href: "/admin/services/new", label: "Add Program" },
              { href: "/admin/news/new", label: "Create News Post" },
              { href: "/admin/gallery", label: "Manage Gallery" },
              { href: "/admin/settings", label: "Site Settings" },
              { href: "/admin/contact-submissions", label: "View Submissions" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-lg border border-[#B7C0CC]/40 px-4 py-3 text-sm font-medium text-[#0B2F63] hover:border-[#5BB9FF] hover:bg-[#5BB9FF]/5"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#B7C0CC]/40 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#04101F]">Recently Updated</h2>
          {stats.recentlyUpdated.length === 0 ? (
            <p className="mt-4 text-sm text-[#B7C0CC]">No recent updates.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {stats.recentlyUpdated.map((item, i) => (
                <li
                  key={`${item.type}-${item.title}-${i}`}
                  className="flex items-center justify-between border-b border-[#B7C0CC]/20 pb-3 last:border-0"
                >
                  <div>
                    <p className="text-xs font-medium uppercase text-[#5BB9FF]">{item.type}</p>
                    <p className="text-sm font-medium text-[#04101F]">{item.title}</p>
                  </div>
                  <p className="text-xs text-[#B7C0CC]">
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleDateString()
                      : "—"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
