import type { Metadata } from "next";
import { HomePageContent } from "@/components/public/HomePageContent";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/settings";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata("home", "/", "Home");
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([
    getPublishedPageByKey("home"),
    getSiteSettings(),
  ]);

  return <HomePageContent page={page} settings={settings} />;
}
