import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTABanner } from "@/components/public/CTABanner";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getProductBySlug, getPublishedProducts } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/settings";
import { buildMetadataFromSeo } from "@/lib/seo/metadata";
import { buildProductJsonLd } from "@/lib/seo/jsonld";
import {
  formatPrice,
  resolveImageAlt,
  resolveImagePath,
  resolveProductImage,
} from "@/lib/images";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getPublishedProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return buildMetadataFromSeo(product.seo, settings, {
    title: product.name,
    description: product.description,
    path: `/shop/${product.slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ path: resolveProductImage(product), alt: product.name }];

  const jsonLd = buildProductJsonLd({
    name: product.name,
    description: product.description,
    path: `/shop/${product.slug}`,
    image: resolveProductImage(product),
    price: product.price,
    sku: product.sku,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.name },
            ]}
            className="mb-10"
          />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {images.map((image, index) => (
                <div
                  key={`${image.path}-${index}`}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 ${
                    index === 0 ? "sm:col-span-2 aspect-square" : "aspect-square"
                  }`}
                >
                  <Image
                    src={resolveImagePath(image, resolveProductImage(product))}
                    alt={resolveImageAlt(image, product.name)}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h1 className="break-words font-display text-4xl uppercase tracking-[0.08em] sm:text-5xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold text-ice-blue">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice ? (
                  <span className="text-lg text-mountie-silver line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                ) : null}
              </div>
              {product.description ? (
                <RichTextRenderer html={product.description} />
              ) : null}
              {product.sku ? (
                <p className="text-sm text-mountie-silver">SKU: {product.sku}</p>
              ) : null}
              <CTABanner
                title="Interested in this item?"
                description="Contact us to check availability and place an order."
                ctaLabel="Contact Shop"
                ctaUrl="/contact"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
