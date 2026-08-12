import { getPublishedPageByKey } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/settings";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function getPublicPageMetadata(
  key: string,
  path: string,
  fallbackTitle: string,
  fallbackDescription?: string,
) {
  const [page, settings] = await Promise.all([
    getPublishedPageByKey(key),
    getSiteSettings(),
  ]);

  return buildPageMetadata(page, settings, {
    title: page?.title ?? fallbackTitle,
    description: fallbackDescription ?? settings.tagline,
    path,
  });
}
