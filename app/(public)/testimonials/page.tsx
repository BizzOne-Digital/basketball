import type { Metadata } from "next";
import { EmptyState } from "@/components/public/EmptyState";
import { PageHero } from "@/components/public/PageHero";
import { TestimonialSlider } from "@/components/public/TestimonialSlider";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublishedTestimonials } from "@/lib/data/testimonials";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "testimonials",
    "/testimonials",
    "Testimonials",
    "Hear from Mountie Basketball families and athletes.",
  );
}

export default async function TestimonialsPage() {
  const [page, testimonials] = await Promise.all([
    getPublishedPageByKey("testimonials"),
    getPublishedTestimonials(),
  ]);

  const heroSection = page?.sections.find((s) => s.sectionType === "hero");

  return (
    <>
      <PageHero
        eyebrow={heroSection?.eyebrow ?? "Testimonials"}
        title={heroSection?.heading ?? page?.title ?? "Testimonials"}
        description={
          heroSection?.body ??
          "Real stories from athletes, parents, and the Mountie community."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Testimonials" },
        ]}
        align="center"
        hideBackground
      />

      <section className="py-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {testimonials.length > 0 ? (
            <TestimonialSlider
              testimonials={testimonials}
              showAuthorPhoto={false}
            />
          ) : (
            <EmptyState title="Testimonials Coming Soon" />
          )}
        </div>
      </section>
    </>
  );
}
