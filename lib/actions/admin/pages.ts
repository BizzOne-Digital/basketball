"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import Page from "@/models/Page";
import type { SectionType } from "@/types";
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

const sectionSchema = z.object({
  id: z.string(),
  sectionType: z.string(),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().optional(),
  image: imageSchema,
  imageAlt: z.string().optional(),
  imagePosition: z.enum(["left", "right", "top", "background", "center"]).optional(),
  secondaryImage: imageSchema,
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
  theme: z.string().optional(),
  layoutVariant: z.string().optional(),
  order: z.number(),
  enabled: z.boolean(),
});

function sanitizeSection(section: z.infer<typeof sectionSchema>) {
  return {
    ...section,
    sectionType: section.sectionType as SectionType,
    image: section.image ?? undefined,
    secondaryImage: section.secondaryImage ?? undefined,
  };
}

const updatePageSchema = z.object({
  pageKey: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  status: z.enum(["draft", "published"]),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: imageSchema,
  }),
  sections: z.array(sectionSchema),
});

export type UpdatePageInput = z.infer<typeof updatePageSchema>;

export async function getPages() {
  await requireAdmin();
  await connectDB();
  return Page.find().sort({ key: 1 }).lean();
}

export async function getPageByKey(pageKey: string) {
  await requireAdmin();
  await connectDB();
  return Page.findOne({ key: pageKey }).lean();
}

export async function updatePage(input: UpdatePageInput): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = updatePageSchema.parse(input);
    await connectDB();

    const page = await Page.findOneAndUpdate(
      { key: data.pageKey },
      {
        title: data.title,
        slug: data.slug,
        status: data.status,
        seo: data.seo,
        sections: data.sections.map(sanitizeSection),
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!page) {
      return { success: false, error: "Page not found." };
    }

    const publicPath =
      data.pageKey === "home"
        ? "/"
        : data.slug.startsWith("/")
          ? data.slug
          : `/${data.slug}`;

    revalidatePath(publicPath);
    revalidatePath("/admin/pages");
    revalidatePath(`/admin/pages/${data.pageKey}`);

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
