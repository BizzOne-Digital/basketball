import type { Metadata } from "next";
import { AboutPageContent } from "@/components/public/AboutPageContent";
import { PageHero } from "@/components/public/PageHero";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/settings";
import { getPublicPageMetadata } from "@/lib/seo/page";
import { PLACEHOLDERS } from "@/lib/images";
import { buildBreadcrumbJsonLd } from "@/lib/seo/jsonld";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "about",
    "/about",
    "About",
    "Learn about Mountie Basketball and our mission.",
  );
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([
    getPublishedPageByKey("about"),
    getSiteSettings(),
  ]);

  const jsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="About"
        title={page?.sections.find((s) => s.sectionType === "hero")?.heading ?? "Who We Are"}
        description={
          page?.sections.find((s) => s.sectionType === "hero")?.body ??
          settings.tagline ??
          "Home of the Mounties — Central Pennsylvania basketball excellence."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        image={{
          path: PLACEHOLDERS.hero,
          alt: "Mountie Basketball",
        }}
        ctaLabel="Meet The Team"
        ctaUrl="/team"
      />

      <AboutPageContent page={page} settings={settings} />
    </>
  );
}
