"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import GalleryCategory from "@/models/GalleryCategory";
import GalleryImage from "@/models/GalleryImage";
import { actionError, type ActionResult } from "./shared";

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  order: z.number().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

const imageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().optional(),
  caption: z.string().optional(),
  path: z.string().min(1),
  alt: z.string().default(""),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export async function getGalleryCategories() {
  await requireAdmin();
  await connectDB();
  return GalleryCategory.find().sort({ order: 1, name: 1 }).lean();
}

export async function getGalleryCategoryById(id: string) {
  await requireAdmin();
  await connectDB();
  const category = await GalleryCategory.findById(id).lean();
  if (!category) {
    return { category: null, images: [] };
  }
  const images = await GalleryImage.find({ categorySlug: category.slug })
    .sort({ order: 1 })
    .lean();
  return { category, images };
}

export async function createGalleryCategory(
  input: z.infer<typeof categorySchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = categorySchema.parse(input);
    await connectDB();

    const category = await GalleryCategory.create({
      ...data,
      order: data.order ?? 0,
      status: data.status ?? "published",
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return { success: true, data: { id: category._id.toString() } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateGalleryCategory(
  id: string,
  input: z.infer<typeof categorySchema>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = categorySchema.parse(input);
    await connectDB();

    const existing = await GalleryCategory.findById(id);
    if (!existing) {
      return { success: false, error: "Category not found." };
    }

    if (existing.slug !== data.slug) {
      await GalleryImage.updateMany(
        { categorySlug: existing.slug },
        { categorySlug: data.slug }
      );
    }

    await GalleryCategory.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath(`/admin/gallery/categories/${id}`);

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteGalleryCategory(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const category = await GalleryCategory.findById(id);
    if (!category) {
      return { success: false, error: "Category not found." };
    }

    await GalleryImage.deleteMany({ categorySlug: category.slug });
    await GalleryCategory.findByIdAndDelete(id);

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function createGalleryImage(
  categorySlug: string,
  input: z.infer<typeof imageSchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = imageSchema.parse(input);
    await connectDB();

    const image = await GalleryImage.create({
      slug: data.slug,
      title: data.title,
      caption: data.caption,
      categorySlug,
      image: { path: data.path, alt: data.alt },
      order: data.order ?? 0,
      featured: data.featured ?? false,
      status: data.status ?? "published",
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return { success: true, data: { id: image._id.toString() } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateGalleryImage(
  id: string,
  input: z.infer<typeof imageSchema> & { categorySlug?: string }
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = imageSchema.parse(input);
    await connectDB();

    const image = await GalleryImage.findByIdAndUpdate(
      id,
      {
        slug: data.slug,
        title: data.title,
        caption: data.caption,
        image: { path: data.path, alt: data.alt },
        order: data.order ?? 0,
        featured: data.featured ?? false,
        status: data.status ?? "published",
        ...(input.categorySlug ? { categorySlug: input.categorySlug } : {}),
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!image) {
      return { success: false, error: "Image not found." };
    }

    revalidatePath("/gallery");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteGalleryImage(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const image = await GalleryImage.findByIdAndDelete(id);
    if (!image) {
      return { success: false, error: "Image not found." };
    }

    revalidatePath("/gallery");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
