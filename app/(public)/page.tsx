import type { Metadata } from "next";
import { HomePageContent } from "@/components/public/HomePageContent";
import { getSiteSettings } from "@/lib/data/settings";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata("home", "/", "Home");
}

export default async function HomePage() {
  const settings = await getSiteSettings();

  return <HomePageContent settings={settings} />;
}
