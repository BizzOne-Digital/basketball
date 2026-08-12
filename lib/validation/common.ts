import { z } from "zod";

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(160)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase alphanumeric with hyphens only",
  });

export const contentStatusSchema = z.enum(["draft", "published"]);

export const imageObjectSchema = z.object({
  path: z.string().trim().min(1).max(500),
  alt: z.string().trim().min(1).max(300),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  caption: z.string().trim().max(500).optional(),
});

export const seoSchema = z.object({
  title: z.string().trim().max(120).optional(),
  description: z.string().trim().max(320).optional(),
  ogImage: imageObjectSchema.optional(),
  noIndex: z.boolean().optional(),
});

export const ctaSchema = z.object({
  label: z.string().trim().min(1).max(80),
  url: z.string().trim().min(1).max(500),
});

export const pageSectionSchema = z.object({
  id: z.string().trim().min(1).max(80),
  sectionType: z.enum([
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
  ]),
  eyebrow: z.string().trim().max(120).optional(),
  heading: z.string().trim().max(200).optional(),
  body: z.string().trim().optional(),
  image: imageObjectSchema.optional(),
  imageAlt: z.string().trim().max(300).optional(),
  imagePosition: z
    .enum(["left", "right", "top", "background", "center"])
    .optional(),
  secondaryImage: imageObjectSchema.optional(),
  ctaLabel: z.string().trim().max(80).optional(),
  ctaUrl: z.string().trim().max(500).optional(),
  theme: z.string().trim().max(80).optional(),
  layoutVariant: z.string().trim().max(80).optional(),
  order: z.number().int().min(0),
  enabled: z.boolean(),
});

export const pageSchema = z.object({
  key: slugSchema.max(80),
  slug: slugSchema.max(120),
  title: z.string().trim().min(1).max(200),
  status: contentStatusSchema,
  seo: seoSchema.optional(),
  sections: z.array(pageSectionSchema).default([]),
});

export const serviceBenefitSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().optional(),
  icon: z.string().trim().max(80).optional(),
});

export const serviceAudienceSchema = z.object({
  title: z.string().trim().max(120).optional(),
  description: z.string().trim().optional(),
  items: z.array(z.string().trim().min(1)).optional(),
});

export const serviceScheduleSchema = z.object({
  title: z.string().trim().max(120).optional(),
  description: z.string().trim().optional(),
  items: z
    .array(
      z.object({
        day: z.string().trim().optional(),
        time: z.string().trim().optional(),
        location: z.string().trim().optional(),
      }),
    )
    .optional(),
});

export const serviceSchema = z.object({
  slug: slugSchema.max(120),
  title: z.string().trim().min(1).max(200),
  status: contentStatusSchema,
  cardTitle: z.string().trim().max(120).optional(),
  cardDescription: z.string().trim().max(500).optional(),
  cardImage: imageObjectSchema.optional(),
  cardCtaLabel: z.string().trim().max(80).optional(),
  order: z.number().int().min(0).optional(),
  seo: seoSchema.optional(),
  hero: pageSectionSchema.optional(),
  intro: z.string().trim().optional(),
  detailSections: z.array(pageSectionSchema).optional(),
  benefits: z.array(serviceBenefitSchema).optional(),
  audience: serviceAudienceSchema.optional(),
  schedule: serviceScheduleSchema.optional(),
  whatToBring: z.array(z.string().trim().min(1)).optional(),
  relatedImages: z.array(imageObjectSchema).optional(),
});

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional(),
  programInterest: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1).max(5000),
  consent: z.boolean().refine((value: boolean) => value === true, {
    message: "Consent is required",
  }),
  honeypot: z.string().trim().max(0).optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
});

export type PageInput = z.infer<typeof pageSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
