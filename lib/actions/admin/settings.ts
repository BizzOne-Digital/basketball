"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import SiteSettings from "@/models/SiteSettings";
import { actionError, type ActionResult } from "./shared";

const imageSchema = z
  .object({
    path: z.string(),
    alt: z.string().default(""),
    width: z.number().optional(),
    height: z.number().optional(),
    caption: z.string().optional(),
  })
  .optional()
  .nullable();

const settingsSchema = z.object({
  organizationName: z.string().min(1),
  headline: z.string().optional(),
  tagline: z.string().optional(),
  logo: imageSchema,
  favicon: imageSchema,
  headCoachName: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  footerText: z.string().optional(),
  defaultSeoTitle: z.string().optional(),
  defaultSeoDescription: z.string().optional(),
  defaultOgImage: imageSchema,
  announcementEnabled: z.boolean().optional(),
  announcementMessage: z.string().optional(),
  announcementLink: z.string().optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export async function getSettings() {
  await requireAdmin();
  await connectDB();
  return SiteSettings.findOne({ singletonKey: "default" }).lean();
}

export async function updateSettings(input: SettingsInput): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = settingsSchema.parse(input);
    await connectDB();

    await SiteSettings.findOneAndUpdate(
      { singletonKey: "default" },
      {
        singletonKey: "default",
        organizationName: data.organizationName,
        headline: data.headline,
        tagline: data.tagline,
        logo: data.logo,
        favicon: data.favicon,
        coach: data.headCoachName
          ? {
              name: data.headCoachName,
              email: data.email,
              phone: data.phone,
            }
          : undefined,
        contactEmail: data.email,
        contactPhone: data.phone,
        address: data.address,
        socialLinks: {
          instagram: data.instagramUrl,
          facebook: data.facebookUrl,
          twitter: data.twitterUrl,
        },
        footerText: data.footerText,
        defaultSeo: {
          title: data.defaultSeoTitle,
          description: data.defaultSeoDescription,
          ogImage: data.defaultOgImage ?? undefined,
        },
        announcementBar: {
          enabled: data.announcementEnabled ?? false,
          message: data.announcementMessage,
          linkUrl: data.announcementLink,
        },
      },
      { upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true }
    );

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
