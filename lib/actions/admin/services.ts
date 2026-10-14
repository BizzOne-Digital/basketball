"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import Service from "@/models/Service";
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

const benefitSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

const cardSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  cardTitle: z.string().optional(),
  cardDescription: z.string().optional(),
  cardImage: imageSchema,
  cardCtaLabel: z.string().optional(),
  status: z.enum(["draft", "published"]),
  order: z.number().optional(),
});

const detailSchema = z.object({
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: imageSchema,
    })
    .optional(),
  hero: sectionSchema.optional().nullable(),
  intro: z.string().optional(),
  detailSections: z.array(sectionSchema).optional(),
  benefits: z.array(benefitSchema).optional(),
  audienceDescription: z.string().optional(),
  scheduleDescription: z.string().optional(),
  whatToBring: z.array(z.string()).optional(),
  relatedImages: z.array(imageSchema).optional(),
});

const createServiceSchema = cardSchema.merge(
  z.object({ detail: detailSchema.optional() })
);

const updateServiceSchema = createServiceSchema.extend({
  id: z.string().min(1),
});

function sanitizeSection(section: z.infer<typeof sectionSchema>) {
  return {
    ...section,
    sectionType: section.sectionType as SectionType,
    image: section.image ?? undefined,
    secondaryImage: section.secondaryImage ?? undefined,
  };
}

function buildDetailFields(detail?: z.infer<typeof detailSchema>) {
  return {
    seo: detail?.seo
      ? {
          title: detail.seo.title,
          description: detail.seo.description,
          ogImage: detail.seo.ogImage ?? undefined,
        }
      : undefined,
    hero: detail?.hero ? sanitizeSection(detail.hero) : undefined,
    intro: detail?.intro,
    detailSections: (detail?.detailSections ?? []).map(sanitizeSection),
    benefits: detail?.benefits ?? [],
    audience: detail?.audienceDescription
      ? { description: detail.audienceDescription }
      : undefined,
    schedule: detail?.scheduleDescription
      ? { description: detail.scheduleDescription }
      : undefined,
    whatToBring: detail?.whatToBring ?? [],
    relatedImages: (detail?.relatedImages ?? []).filter(Boolean) as Array<{
      path: string;
      alt: string;
    }>,
  };
}

export async function getServices() {
  await requireAdmin();
  await connectDB();
  return Service.find().sort({ order: 1, title: 1 }).lean();
}

export async function getServiceById(id: string) {
  await requireAdmin();
  await connectDB();
  return Service.findById(id).lean();
}

export async function createService(
  input: z.infer<typeof createServiceSchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = createServiceSchema.parse(input);
    await connectDB();

    const service = (await Service.create({
      title: data.title,
      slug: data.slug,
      cardTitle: data.cardTitle ?? data.title,
      cardDescription: data.cardDescription,
      cardImage: data.cardImage ?? undefined,
      cardCtaLabel: data.cardCtaLabel,
      status: data.status,
      order: data.order ?? 0,
      ...buildDetailFields(data.detail),
    })) as { _id: { toString(): string } };

    revalidatePath("/services");
    revalidatePath(`/services/${data.slug}`);
    revalidatePath("/admin/services");

    return { success: true, data: { id: String(service._id) } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateService(
  input: z.infer<typeof updateServiceSchema>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = updateServiceSchema.parse(input);
    await connectDB();

    const service = await Service.findByIdAndUpdate(
      data.id,
      {
        title: data.title,
        slug: data.slug,
        cardTitle: data.cardTitle ?? data.title,
        cardDescription: data.cardDescription,
        cardImage: data.cardImage ?? undefined,
        cardCtaLabel: data.cardCtaLabel,
        status: data.status,
        order: data.order ?? 0,
        ...buildDetailFields(data.detail),
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!service) {
      return { success: false, error: "Service not found." };
    }

    revalidatePath("/services");
    revalidatePath(`/services/${data.slug}`);
    revalidatePath("/admin/services");
    revalidatePath(`/admin/services/${data.id}`);

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return { success: false, error: "Service not found." };
    }

    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    revalidatePath("/admin/services");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function reorderServices(orderedIds: string[]): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    await Promise.all(
      orderedIds.map((id, index) =>
        Service.findByIdAndUpdate(id, { order: index })
      )
    );

    revalidatePath("/services");
    revalidatePath("/admin/services");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
