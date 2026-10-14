import { Schema } from "mongoose";
import type {
  AnnouncementBar,
  CoachInfo,
  ImageObject,
  PageSection,
  SEO,
  ServiceAudience,
  ServiceBenefit,
  ServiceSchedule,
  SocialLinks,
} from "@/types";

export const imageObjectSchema = new Schema<ImageObject>(
  {
    path: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true, maxlength: 300 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    caption: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false },
);

export const seoSchema = new Schema<SEO>(
  {
    title: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 320 },
    ogImage: { type: imageObjectSchema },
    noIndex: { type: Boolean, default: false },
  },
  { _id: false },
);

export const pageSectionSchema = new Schema<PageSection>(
  {
    id: { type: String, required: true, trim: true },
    sectionType: {
      type: String,
      required: true,
      enum: [
        "hero",
        "text",
        "image-text",
        "cta",
        "gallery",
        "testimonials",
        "faq",
        "features",
        "stats",
        "schedule",
        "custom",
        "text-image",
        "full-width-media",
        "statistics",
        "values-grid",
        "cards-grid",
        "quote",
        "timeline",
        "gallery-preview",
        "testimonial-feature",
        "CTA",
        "custom-editorial-split",
      ],
    },
    eyebrow: { type: String, trim: true, maxlength: 120 },
    heading: { type: String, trim: true, maxlength: 200 },
    body: { type: String, trim: true },
    image: { type: imageObjectSchema },
    imageAlt: { type: String, trim: true, maxlength: 300 },
    imagePosition: {
      type: String,
      enum: ["left", "right", "top", "background", "center"],
    },
    secondaryImage: { type: imageObjectSchema },
    ctaLabel: { type: String, trim: true, maxlength: 80 },
    ctaUrl: { type: String, trim: true, maxlength: 500 },
    theme: {
      type: String,
      default: "light",
      trim: true,
      maxlength: 80,
    },
    layoutVariant: { type: String, trim: true, maxlength: 80 },
    order: { type: Number, required: true, min: 0 },
    enabled: { type: Boolean, default: true },
  },
  { _id: false },
);

export const socialLinksSchema = new Schema<SocialLinks>(
  {
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    twitter: { type: String, trim: true },
    youtube: { type: String, trim: true },
    tiktok: { type: String, trim: true },
    linkedin: { type: String, trim: true },
  },
  { _id: false },
);

export const coachInfoSchema = new Schema<CoachInfo>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    title: { type: String, trim: true, maxlength: 120 },
    bio: { type: String, trim: true },
    photo: { type: imageObjectSchema },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
  },
  { _id: false },
);

export const announcementBarSchema = new Schema<AnnouncementBar>(
  {
    enabled: { type: Boolean, default: false },
    message: { type: String, trim: true, maxlength: 300 },
    linkUrl: { type: String, trim: true },
    linkLabel: { type: String, trim: true, maxlength: 80 },
    backgroundColor: { type: String, trim: true, maxlength: 20 },
    textColor: { type: String, trim: true, maxlength: 20 },
  },
  { _id: false },
);

export const serviceBenefitSchema = new Schema<ServiceBenefit>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true },
    icon: { type: String, trim: true, maxlength: 80 },
  },
  { _id: false },
);

export const serviceAudienceSchema = new Schema<ServiceAudience>(
  {
    title: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true },
    items: [{ type: String, trim: true }],
  },
  { _id: false },
);

export const serviceScheduleSchema = new Schema<ServiceSchedule>(
  {
    title: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true },
    items: [
      {
        day: { type: String, trim: true },
        time: { type: String, trim: true },
        location: { type: String, trim: true },
        _id: false,
      },
    ],
  },
  { _id: false },
);

export const contentStatusEnum = ["draft", "published"] as const;

export const slugValidator = {
  validator: (value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
  message: "Slug must be lowercase alphanumeric with hyphens only",
};
