import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/public/CTABanner";
import { PageHero } from "@/components/public/PageHero";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublishedProducts } from "@/lib/data/products";
import { getPublishedServices } from "@/lib/data/services";
import { formatPrice } from "@/lib/images";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "pricing",
    "/pricing",
    "Pricing",
    "Program pricing and registration information for Mountie Basketball.",
  );
}

export default async function PricingPage() {
  const [page, services, products] = await Promise.all([
    getPublishedPageByKey("pricing"),
    getPublishedServices(),
    getPublishedProducts(),
  ]);

  const heroSection = page?.sections.find((s) => s.sectionType === "hero");
  const pricingInfo = page?.sections.find((s) => s.id === "pricing-info");

  return (
    <>
      <PageHero
        eyebrow={heroSection?.eyebrow ?? "Pricing"}
        title={heroSection?.heading ?? page?.title ?? "Program Pricing"}
        description={
          heroSection?.body ??
          "Camp and training pricing may vary by season. Contact us for current rates."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing" },
        ]}
        align="center"
        hideBackground
        ctaLabel="Contact For Pricing"
        ctaUrl="/contact"
      />

      <section className="py-20 pb-24">
        <div className="mx-auto max-w-4xl space-y-12 px-4 lg:px-8">
          <div className="space-y-4 text-center">
            <p className="text-base leading-8 text-mountie-silver">
              {pricingInfo?.body?.replace(/<[^>]+>/g, " ").trim() ??
                "Camp and training pricing may vary by season and availability. Gear pricing is listed on individual products in our shop. Contact Coach Anderson for program pricing."}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-center font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
              Programs
            </h2>
            <div className="space-y-3">
              {services.length > 0 ? (
                services.map((service) => (
                  <div
                    key={service.slug}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-mountie-blue/10 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="break-words font-display text-base uppercase tracking-[0.08em] text-mountie-white sm:text-lg">
                        {service.cardTitle ?? service.title}
                      </p>
                      {service.cardDescription ? (
                        <p className="mt-1 text-sm text-mountie-silver">
                          {service.cardDescription}
                        </p>
                      ) : null}
                    </div>
                    <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.16em] text-ice-blue">
                      Contact for pricing
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-mountie-silver">
                  Program pricing will be published soon.
                </p>
              )}
            </div>
          </div>

          {products.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-center font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
                Gear &amp; Merchandise
              </h2>
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.slug}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-gunmetal/20 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <p className="break-words font-display text-base uppercase tracking-[0.08em] text-mountie-white sm:text-lg">
                      {product.name}
                    </p>
                    <p className="shrink-0 text-sm font-semibold text-ice-blue">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-mountie-silver">
                <Link href="/shop" className="text-ice-blue hover:text-mountie-white">
                  View full shop
                </Link>
              </p>
            </div>
          ) : null}

          <div className="flex justify-center pt-4">
            <MagneticButton href="/contact">Contact Coach Anderson</MagneticButton>
          </div>

          <CTABanner
            eyebrow="Need Help?"
            title="Not Sure Which Program Fits?"
            description="Our coaching staff can recommend the best option based on age, skill level, and goals."
            ctaLabel="Contact Us"
            ctaUrl="/contact"
            secondaryLabel="View FAQs"
            secondaryUrl="/faqs"
          />
        </div>
      </section>
    </>
  );
}
