"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import Testimonial from "@/models/Testimonial";
import { actionError, type ActionResult } from "./shared";

const imageSchema = z
  .object({
    path: z.string(),
    alt: z.string().default(""),
  })
  .optional()
  .nullable();

const testimonialSchema = z.object({
  slug: z.string().min(1),
  authorName: z.string().min(1),
  authorRole: z.string().optional(),
  quote: z.string().min(1),
  authorPhoto: imageSchema,
  status: z.enum(["draft", "published"]),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export async function getTestimonials() {
  await requireAdmin();
  await connectDB();
  return Testimonial.find().sort({ order: 1, authorName: 1 }).lean();
}

export async function createTestimonial(
  input: z.infer<typeof testimonialSchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = testimonialSchema.parse(input);
    await connectDB();

    const testimonial = await Testimonial.create({
      slug: data.slug,
      authorName: data.authorName,
      authorRole: data.authorRole,
      quote: data.quote,
      authorPhoto: data.authorPhoto ?? undefined,
      status: data.status,
      order: data.order ?? 0,
      featured: data.featured ?? false,
    });

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true, data: { id: String(testimonial._id) } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateTestimonial(
  id: string,
  input: z.infer<typeof testimonialSchema>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = testimonialSchema.parse(input);
    await connectDB();

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        slug: data.slug,
        authorName: data.authorName,
        authorRole: data.authorRole,
        quote: data.quote,
        authorPhoto: data.authorPhoto ?? undefined,
        status: data.status,
        order: data.order ?? 0,
        featured: data.featured ?? false,
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!testimonial) {
      return { success: false, error: "Testimonial not found." };
    }

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return { success: false, error: "Testimonial not found." };
    }

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
