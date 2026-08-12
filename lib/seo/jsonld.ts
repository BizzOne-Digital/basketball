import type { SiteSettingsDocument } from "@/types";
import { SITE_URL } from "@/lib/seo/metadata";
import { resolveImagePath } from "@/lib/images";

export function buildOrganizationJsonLd(settings: SiteSettingsDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: settings.organizationName,
    url: SITE_URL,
    logo: resolveImagePath(settings.logo, "/images/mountie-logo.png"),
    description:
      settings.defaultSeo?.description ??
      settings.tagline ??
      settings.headline,
    email: settings.contactEmail,
    telephone: settings.contactPhone,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
        }
      : undefined,
    sameAs: Object.values(settings.socialLinks ?? {}).filter(Boolean),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildArticleJsonLd(input: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    author: input.authorName
      ? { "@type": "Person", name: input.authorName }
      : undefined,
    mainEntityOfPage: `${SITE_URL}${input.path}`,
  };
}

export function buildProductJsonLd(input: {
  name: string;
  description?: string;
  path: string;
  image?: string;
  price: number;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image,
    sku: input.sku,
    offers: {
      "@type": "Offer",
      price: input.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${input.path}`,
    },
  };
}

export function buildFaqJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
