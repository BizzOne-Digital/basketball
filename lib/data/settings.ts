import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import SiteSettings, { type SiteSettingsDoc } from "@/models/SiteSettings";
import type { SiteSettingsDocument } from "@/types";

const DEFAULT_SETTINGS: SiteSettingsDocument = {
  singletonKey: "default",
  organizationName: "Mountie Basketball",
  headline: "Train. Compete. Elevate.",
  tagline: "Premier youth basketball development programs.",
  announcementBar: {
    enabled: false,
  },
  defaultSeo: {
    title: "Mountie Basketball",
    description: "Youth basketball training, camps, and competitive programs.",
    noIndex: false,
  },
};

function serializeSettings(doc: SiteSettingsDoc): SiteSettingsDocument {
  const plain = doc.toObject();

  return {
    singletonKey: plain.singletonKey,
    organizationName: plain.organizationName,
    headline: plain.headline,
    tagline: plain.tagline,
    logo: plain.logo,
    favicon: plain.favicon,
    coach: plain.coach,
    socialLinks: plain.socialLinks,
    announcementBar: plain.announcementBar,
    defaultSeo: plain.defaultSeo,
    contactEmail: plain.contactEmail,
    contactPhone: plain.contactPhone,
    address: plain.address,
    footerText: plain.footerText,
  };
}

export const getSiteSettings = cache(
  async (): Promise<SiteSettingsDocument> => {
    await connectDB();

    const settings = await SiteSettings.findOneAndUpdate(
      { singletonKey: "default" },
      { $setOnInsert: DEFAULT_SETTINGS },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true },
    );

    return serializeSettings(settings);
  },
);

export async function upsertSiteSettings(
  input: Partial<Omit<SiteSettingsDocument, "singletonKey">>,
): Promise<SiteSettingsDocument> {
  await connectDB();

  const settings = await SiteSettings.findOneAndUpdate(
    { singletonKey: "default" },
    { $set: input },
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true },
  );

  return serializeSettings(settings);
}
