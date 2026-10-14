import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { SiteSettingsDocument } from "@/types";
import {
  announcementBarSchema,
  coachInfoSchema,
  imageObjectSchema,
  seoSchema,
  socialLinksSchema,
} from "./shared";

export interface SiteSettingsDoc extends SiteSettingsDocument, Document {}

const siteSettingsSchema = new Schema<SiteSettingsDoc>(
  {
    singletonKey: {
      type: String,
      required: true,
      unique: true,
      default: "default",
      enum: ["default"],
    },
    organizationName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    headline: { type: String, trim: true, maxlength: 200 },
    tagline: { type: String, trim: true, maxlength: 300 },
    logo: { type: imageObjectSchema },
    favicon: { type: imageObjectSchema },
    coach: { type: coachInfoSchema },
    socialLinks: { type: socialLinksSchema },
    announcementBar: { type: announcementBarSchema },
    defaultSeo: { type: seoSchema },
    contactEmail: { type: String, trim: true, lowercase: true },
    contactPhone: { type: String, trim: true },
    address: { type: String, trim: true, maxlength: 500 },
    footerText: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

siteSettingsSchema.index({ singletonKey: 1 }, { unique: true });

const SiteSettings: Model<SiteSettingsDoc> =
  (mongoose.models.SiteSettings as Model<SiteSettingsDoc> | undefined) ??
  mongoose.model<SiteSettingsDoc>("SiteSettings", siteSettingsSchema);

export default SiteSettings;
