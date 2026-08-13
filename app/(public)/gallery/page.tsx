import type { Metadata } from "next";
import Image from "next/image";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { EmptyState } from "@/components/public/EmptyState";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import {
  getAllPublishedImages,
  getCategories,
  getImagesByCategory,
} from "@/lib/data/gallery";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublicPageMetadata } from "@/lib/seo/page";
import { PLACEHOLDERS, resolveImagePath } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "gallery",
    "/gallery",
    "Gallery",
    "Photos from Mountie Basketball games, practices, and events.",
  );
}

export default async function GalleryPage() {
  const [page, categories, allImages] = await Promise.all([
    getPublishedPageByKey("gallery"),
    getCategories(),
    getAllPublishedImages(),
  ]);

  const categorySections = await Promise.all(
    categories.map(async (category) => ({
      category,
      images: await getImagesByCategory(category.slug),
    })),
  );

  const images = allImages.length > 0 ? allImages : [];

  return (
    <>
      <PageHero
        title={page?.title ?? "Gallery"}
        description="Moments from the court, the community, and championship culture."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
        image={page?.sections[0]?.image}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {images.length > 0 ? (
            <GalleryGrid images={images} columns={4} />
          ) : (
            <EmptyState title="Gallery Photos Coming Soon" />
          )}
        </div>
      </section>

      {categorySections.map(({ category, images: categoryImages }) =>
        categoryImages.length > 0 ? (
          <section key={category.slug} className="pb-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <SectionHeading
                title={category.name}
                description={category.description}
              />
              <div className="mt-8">
                <GalleryGrid images={categoryImages} />
              </div>
              {category.coverImage ? (
                <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-3xl">
                  <Image
                    src={resolveImagePath(category.coverImage, PLACEHOLDERS.gallery)}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          </section>
        ) : null,
      )}

      {page?.sections?.length ? (
        <SectionRenderer sections={page.sections} />
      ) : null}
    </>
  );
}
