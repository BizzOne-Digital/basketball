import type { Metadata } from "next";
import type { PageDocument, SEO, SiteSettingsDocument } from "@/types";
import { resolveImagePath } from "@/lib/images";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://mountiebasketball.com";

// Site-wide share/poster image (1672x941). Per-page seo.ogImage still overrides it.
const DEFAULT_OG_IMAGE = "/images/og-banner.png";

interface MetadataDefaults {
  title: string;
  description?: string;
  path?: string;
}

function buildTitle(title: string, siteName: string): string {
  if (title === siteName) {
    return siteName;
  }

  return `${title} | ${siteName}`;
}

export function buildMetadataFromSeo(
  seo: SEO | undefined,
  settings: SiteSettingsDocument,
  defaults: MetadataDefaults,
): Metadata {
  const siteName = settings.organizationName;
  const title = seo?.title ?? defaults.title;
  const description =
    seo?.description ??
    defaults.description ??
    settings.defaultSeo?.description ??
    settings.tagline ??
    settings.headline;

  const ogImage = resolveImagePath(seo?.ogImage) || DEFAULT_OG_IMAGE;

  const canonical = defaults.path
    ? `${SITE_URL}${defaults.path.startsWith("/") ? defaults.path : `/${defaults.path}`}`
    : SITE_URL;

  const noIndex = seo?.noIndex ?? settings.defaultSeo?.noIndex ?? false;

  return {
    title: buildTitle(title, siteName),
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical },
    openGraph: {
      title: buildTitle(title, siteName),
      description: description ?? undefined,
      siteName,
      url: canonical,
      type: "website",
      images: [{ url: ogImage, width: 1672, height: 941, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: buildTitle(title, siteName),
      description: description ?? undefined,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function buildPageMetadata(
  page: PageDocument | null,
  settings: SiteSettingsDocument,
  defaults: MetadataDefaults,
): Metadata {
  return buildMetadataFromSeo(page?.seo, settings, {
    title: page?.title ?? defaults.title,
    description: defaults.description,
    path: defaults.path,
  });
}

export { SITE_URL };
