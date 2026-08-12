import Image from "next/image";
import Link from "next/link";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { CTABanner } from "@/components/public/CTABanner";
import { EmptyState } from "@/components/public/EmptyState";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { NewsCard } from "@/components/public/NewsCard";
import { ProductCard } from "@/components/public/ProductCard";
import { ProgramCard } from "@/components/public/ProgramCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { SplitTextHeading } from "@/components/public/SplitTextHeading";
import { TestimonialSlider } from "@/components/public/TestimonialSlider";
import { getPublishedPosts } from "@/lib/data/blog";
import { getFeaturedImages } from "@/lib/data/gallery";
import { getPublishedProducts } from "@/lib/data/products";
import { getPublishedServices } from "@/lib/data/services";
import { getPublishedTestimonials } from "@/lib/data/testimonials";
import { PLACEHOLDERS } from "@/lib/images";
import type { PageDocument, SiteSettingsDocument } from "@/types";

interface HomePageContentProps {
  page: PageDocument | null;
  settings: SiteSettingsDocument;
}

export async function HomePageContent({
  page,
  settings,
}: HomePageContentProps) {
  const [services, posts, gallery, testimonials, products] = await Promise.all([
    getPublishedServices(),
    getPublishedPosts(3),
    getFeaturedImages(6),
    getPublishedTestimonials(),
    getPublishedProducts(4),
  ]);

  const displayedServices = services.slice(0, 3);
  const programsGridClass =
    displayedServices.length === 2
      ? "mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
      : displayedServices.length === 1
        ? "mx-auto mt-10 grid max-w-md grid-cols-1 gap-6"
        : "mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3";

  const displayedPosts = posts.slice(0, 3);
  const newsGridClass =
    displayedPosts.length === 2
      ? "mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
      : displayedPosts.length === 1
        ? "mx-auto grid max-w-md grid-cols-1 gap-6"
        : "grid gap-6 lg:grid-cols-3";

  return (
    <>
      {page?.sections?.length ? (
        <SectionRenderer sections={page.sections} />
      ) : (
        <section className="relative min-h-[85vh] overflow-hidden border-b border-white/10">
          <Image
            src={PLACEHOLDERS.hero}
            alt="Mountie Basketball court"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-transparent" />
          <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-end px-4 py-24 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">
                Philipsburg-Osceola
              </p>
              <h1 className="break-words font-display text-4xl uppercase leading-none tracking-[0.08em] sm:text-5xl md:text-7xl">
                {settings.headline ?? "Train. Compete. Elevate."}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-mountie-silver">
                {settings.tagline ??
                  "Premier youth basketball development programs."}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SplitTextHeading
            eyebrow="Programs"
            title="Built For Every Level"
            description="From fundamentals to elite competition, Mountie Basketball develops complete players."
          />
          <div className={programsGridClass}>
            {displayedServices.length > 0 ? (
              displayedServices.map((service) => (
                <ProgramCard key={service.slug} service={service} />
              ))
            ) : (
              <EmptyState
                title="Programs Coming Soon"
                description="Check back for new training sessions and camps."
                actionLabel="Contact Us"
                actionHref="/contact"
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="News" title="Latest Updates" />
            <Link
              href="/news"
              className="shrink-0 text-sm uppercase tracking-[0.16em] text-ice-blue"
            >
              View All
            </Link>
          </div>
          <div className={newsGridClass}>
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post, index) => (
                <NewsCard
                  key={post.slug}
                  post={post}
                  featured={displayedPosts.length >= 3 && index === 0}
                />
              ))
            ) : (
              <EmptyState title="No News Yet" />
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Gallery" title="Game Day Energy" />
          <div className="mt-10">
            {gallery.length > 0 ? (
              <GalleryGrid images={gallery} columns={3} />
            ) : (
              <EmptyState title="Gallery Coming Soon" />
            )}
          </div>
        </div>
      </section>

      {testimonials.length > 0 ? (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="What Our Community Says"
              align="center"
            />
            <div className="mt-10">
              <TestimonialSlider testimonials={testimonials} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Shop" title="Rep The Mounties" />
            <Link
              href="/shop"
              className="shrink-0 text-sm uppercase tracking-[0.16em] text-ice-blue"
            >
              Shop All
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))
            ) : (
              <EmptyState title="Shop Items Coming Soon" />
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CTABanner
            eyebrow="Join The Program"
            title="Ready To Compete With Mountie Basketball?"
            description="Connect with our coaching staff and find the right program for your athlete."
            ctaLabel="Contact Us"
            ctaUrl="/contact"
            secondaryLabel="View Programs"
            secondaryUrl="/services"
          />
        </div>
      </section>
    </>
  );
}
