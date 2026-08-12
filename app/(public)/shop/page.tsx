import type { Metadata } from "next";
import Image from "next/image";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { EmptyState } from "@/components/public/EmptyState";
import { PageHero } from "@/components/public/PageHero";
import { ProductCard } from "@/components/public/ProductCard";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublishedProducts } from "@/lib/data/products";
import { getPublicPageMetadata } from "@/lib/seo/page";
import { PLACEHOLDERS } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "shop",
    "/shop",
    "Shop",
    "Official Mountie Basketball gear and apparel.",
  );
}

export default async function ShopPage() {
  const [page, products] = await Promise.all([
    getPublishedPageByKey("shop"),
    getPublishedProducts(),
  ]);

  return (
    <>
      <PageHero
        title={page?.title ?? "Team Shop"}
        description="Rep the Mounties with official program gear."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
        image={page?.sections[0]?.image}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src={PLACEHOLDERS.product} alt="Team apparel" fill className="object-cover" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src={PLACEHOLDERS.hero} alt="Mountie gear" fill className="object-cover" />
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState title="Shop Items Coming Soon" />
          )}
        </div>
      </section>

      {page?.sections?.length ? (
        <SectionRenderer sections={page.sections} />
      ) : null}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[PLACEHOLDERS.service, PLACEHOLDERS.gallery, PLACEHOLDERS.court].map(
              (src, index) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={src} alt={`Shop lifestyle ${index + 1}`} fill className="object-cover" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
