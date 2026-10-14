import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/public/EmptyState";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { PageHero } from "@/components/public/PageHero";
import { getPublishedFAQs } from "@/lib/data/faqs";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublicPageMetadata } from "@/lib/seo/page";
import { buildFaqJsonLd } from "@/lib/seo/jsonld";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "faqs",
    "/faqs",
    "FAQs",
    "Frequently asked questions about Mountie Basketball programs.",
  );
}

export default async function FaqsPage() {
  const [page, faqs] = await Promise.all([
    getPublishedPageByKey("faqs"),
    getPublishedFAQs(),
  ]);

  const heroSection = page?.sections.find((s) => s.sectionType === "hero");

  const jsonLd =
    faqs.length > 0
      ? buildFaqJsonLd(
          faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
        )
      : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      <PageHero
        eyebrow={heroSection?.eyebrow ?? "FAQs"}
        title={heroSection?.heading ?? page?.title ?? "FAQs"}
        description={
          heroSection?.body ??
          "Answers to common questions about registration, schedules, and expectations."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs" },
        ]}
        align="center"
        hideBackground
      />

      <section className="py-20 pb-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          {faqs.length > 0 ? (
            <FAQAccordion faqs={faqs} />
          ) : (
            <EmptyState
              title="FAQs Coming Soon"
              actionLabel="Contact Us"
              actionHref="/contact"
            />
          )}

          <p className="mt-10 text-center text-sm text-mountie-silver">
            Still have questions?{" "}
            <Link href="/contact" className="text-ice-blue hover:text-mountie-white">
              Contact Coach Anderson
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
