import Link from "next/link";
import { getPages } from "@/lib/actions/admin/pages";

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  services: "Services Main Page",
  team: "Team",
  gallery: "Gallery",
  news: "News",
  shop: "Shop",
  testimonials: "Testimonials",
  faqs: "FAQs",
  contact: "Contact",
  pricing: "Pricing",
};

export default async function AdminPagesListPage() {
  const pages = await getPages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">Pages</h1>
        <p className="mt-1 text-[#343A40]">
          Edit hero content, SEO, and sections for each public page.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.key}
            href={`/admin/pages/${page.key}`}
            className="rounded-xl border border-[#B7C0CC]/40 bg-white p-5 shadow-sm transition-colors hover:border-[#5BB9FF] hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#5BB9FF]">
              {page.key}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[#04101F]">
              {PAGE_LABELS[page.key] ?? page.title}
            </h2>
            <p className="mt-2 text-sm text-[#343A40]">{page.title}</p>
            <p className="mt-3 text-xs capitalize text-[#B7C0CC]">
              Status: {page.status} · {page.sections?.length ?? 0} sections
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
