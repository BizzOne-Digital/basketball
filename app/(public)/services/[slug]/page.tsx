import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTABanner } from "@/components/public/CTABanner";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getServiceBySlug, getPublishedServices } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/settings";
import { buildMetadataFromSeo } from "@/lib/seo/metadata";
import { PLACEHOLDERS, resolveImageAlt, resolveImagePath, resolveProgramImage } from "@/lib/images";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!service) {
    return { title: "Program Not Found" };
  }

  return buildMetadataFromSeo(service.seo, settings, {
    title: service.title,
    description: service.intro ?? service.cardDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const heroImage = service.hero?.image ?? service.cardImage;
  const heroSrc = resolveProgramImage(service);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src={heroSrc}
            alt={resolveImageAlt(heroImage, service.title)}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Programs", href: "/services" },
              { label: service.title },
            ]}
            className="mb-8"
          />
          <h1 className="max-w-4xl break-words font-display text-4xl uppercase tracking-[0.08em] sm:text-5xl md:text-6xl">
            {service.title}
          </h1>
          {service.intro ? (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-mountie-silver">
              {service.intro}
            </p>
          ) : null}
        </div>
      </section>

      {service.benefits?.length ? (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/10 bg-mountie-blue/10 p-6"
                >
                  <h3 className="font-display text-xl uppercase tracking-[0.08em]">
                    {benefit.title}
                  </h3>
                  {benefit.description ? (
                    <p className="mt-3 text-sm leading-7 text-mountie-silver">
                      {benefit.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.detailSections?.length ? (
        <SectionRenderer sections={service.detailSections} />
      ) : null}

      {service.relatedImages?.length ? (
        <section className="py-16">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {service.relatedImages.map((image, index) => (
              <div
                key={`${image.path}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={resolveImagePath(image, PLACEHOLDERS.gallery)}
                  alt={resolveImageAlt(image, service.title)}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CTABanner
            title="Ready to join this program?"
            description="Contact our staff to register or ask questions."
            ctaLabel="Contact Us"
            ctaUrl="/contact"
          />
        </div>
      </section>
    </>
  );
}
