import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { getSiteSettings } from "@/lib/data/settings";
import { buildMetadataFromSeo } from "@/lib/seo/metadata";
import { buildOrganizationJsonLd } from "@/lib/seo/jsonld";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadataFromSeo(settings.defaultSeo, settings, {
    title: settings.organizationName,
    description:
      settings.defaultSeo?.description ??
      settings.tagline ??
      settings.headline,
    path: "/",
  });
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const jsonLd = buildOrganizationJsonLd(settings);

  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full min-w-0 flex-col overflow-x-clip bg-midnight text-mountie-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
