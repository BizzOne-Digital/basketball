import type { Metadata } from "next";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { EmptyState } from "@/components/public/EmptyState";
import { NewsCard } from "@/components/public/NewsCard";
import { PageHero } from "@/components/public/PageHero";
import { getPublishedPosts } from "@/lib/data/blog";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "news",
    "/news",
    "News",
    "Latest updates from Mountie Basketball.",
  );
}

export default async function NewsPage() {
  const [page, posts] = await Promise.all([
    getPublishedPageByKey("news"),
    getPublishedPosts(),
  ]);

  const cmsSections =
    page?.sections.filter(
      (section) => section.enabled && section.sectionType !== "hero",
    ) ?? [];

  const newsGridClass =
    posts.length === 2
      ? "mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
      : posts.length === 1
        ? "mx-auto grid max-w-md grid-cols-1 gap-6"
        : "grid gap-6 lg:grid-cols-3";

  return (
    <>
      <PageHero
        title={page?.title ?? "News & Updates"}
        description="Stories, announcements, and highlights from the program."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News" },
        ]}
        image={page?.sections[0]?.image}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {posts.length > 0 ? (
            <div className={newsGridClass}>
              {posts.map((post, index) => (
                <NewsCard
                  key={post.slug}
                  post={post}
                  featured={posts.length >= 3 && index === 0}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="No News Posts Yet" />
          )}
        </div>
      </section>

      {cmsSections.length > 0 ? (
        <SectionRenderer sections={cmsSections} />
      ) : null}
    </>
  );
}
