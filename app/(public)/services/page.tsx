import type { Metadata } from "next";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { EmptyState } from "@/components/public/EmptyState";
import { PageHero } from "@/components/public/PageHero";
import { ProgramCard } from "@/components/public/ProgramCard";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublishedServices } from "@/lib/data/services";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "services",
    "/services",
    "Programs",
    "Explore Mountie Basketball training programs and camps.",
  );
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getPublishedPageByKey("services"),
    getPublishedServices(),
  ]);

  const cmsSections =
    page?.sections.filter(
      (section) => section.enabled && section.sectionType !== "hero",
    ) ?? [];

  const programsGridClass =
    services.length === 2
      ? "mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
      : services.length === 1
        ? "mx-auto grid max-w-md grid-cols-1 gap-6"
        : "grid gap-6 md:grid-cols-2 xl:grid-cols-3";

  return (
    <>
      <PageHero
        title={page?.title ?? "Programs & Training"}
        description="Structured development paths for every age and skill level."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs" },
        ]}
        image={page?.sections[0]?.image}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {services.length > 0 ? (
            <div className={programsGridClass}>
              {services.map((service) => (
                <ProgramCard key={service.slug} service={service} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Programs Published"
              description="Programs will appear here once published in the admin CMS."
              actionLabel="Contact Us"
              actionHref="/contact"
            />
          )}
        </div>
      </section>

      {cmsSections.length > 0 ? (
        <SectionRenderer sections={cmsSections} />
      ) : null}
    </>
  );
}
