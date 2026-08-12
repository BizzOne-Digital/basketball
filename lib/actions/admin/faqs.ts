"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import FAQ from "@/models/FAQ";
import { actionError, type ActionResult } from "./shared";

const faqSchema = z.object({
  slug: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional(),
  status: z.enum(["draft", "published"]),
  order: z.number().optional(),
});

export async function getFAQs() {
  await requireAdmin();
  await connectDB();
  return FAQ.find().sort({ order: 1, question: 1 }).lean();
}

export async function createFAQ(
  input: z.infer<typeof faqSchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = faqSchema.parse(input);
    await connectDB();

    const faq = await FAQ.create({ ...data, order: data.order ?? 0 });

    revalidatePath("/faqs");
    revalidatePath("/admin/faqs");

    return { success: true, data: { id: faq._id.toString() } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateFAQ(
  id: string,
  input: z.infer<typeof faqSchema>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = faqSchema.parse(input);
    await connectDB();

    const faq = await FAQ.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!faq) {
      return { success: false, error: "FAQ not found." };
    }

    revalidatePath("/faqs");
    revalidatePath("/admin/faqs");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteFAQ(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return { success: false, error: "FAQ not found." };
    }

    revalidatePath("/faqs");
    revalidatePath("/admin/faqs");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
