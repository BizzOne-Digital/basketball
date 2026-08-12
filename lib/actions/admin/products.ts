"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import Product from "@/models/Product";
import { actionError, type ActionResult } from "./shared";

const imageSchema = z.object({
  path: z.string(),
  alt: z.string().default(""),
  width: z.number().optional(),
  height: z.number().optional(),
  caption: z.string().optional(),
});

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional().nullable(),
  images: z.array(imageSchema).optional(),
  sku: z.string().optional(),
  inventory: z.number().optional().nullable(),
  order: z.number().optional(),
  status: z.enum(["draft", "published"]),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: imageSchema.optional().nullable(),
    })
    .optional(),
});

export async function getProducts() {
  await requireAdmin();
  await connectDB();
  return Product.find().sort({ order: 1, name: 1 }).lean();
}

export async function getProductById(id: string) {
  await requireAdmin();
  await connectDB();
  return Product.findById(id).lean();
}

export async function createProduct(
  input: z.infer<typeof productSchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = productSchema.parse(input);
    await connectDB();

    const product = await Product.create({
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      compareAtPrice: data.compareAtPrice ?? undefined,
      sku: data.sku,
      inventory: data.inventory ?? undefined,
      images: data.images ?? [],
      order: data.order ?? 0,
      status: data.status,
      seo: data.seo
        ? {
            title: data.seo.title,
            description: data.seo.description,
            ogImage: data.seo.ogImage ?? undefined,
          }
        : undefined,
    });

    revalidatePath("/shop");
    revalidatePath(`/shop/${data.slug}`);
    revalidatePath("/admin/products");

    return { success: true, data: { id: product._id.toString() } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateProduct(
  id: string,
  input: z.infer<typeof productSchema>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = productSchema.parse(input);
    await connectDB();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice ?? undefined,
        sku: data.sku,
        inventory: data.inventory ?? undefined,
        images: data.images ?? [],
        order: data.order ?? 0,
        status: data.status,
        seo: data.seo
          ? {
              title: data.seo.title,
              description: data.seo.description,
              ogImage: data.seo.ogImage ?? undefined,
            }
          : undefined,
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!product) {
      return { success: false, error: "Product not found." };
    }

    revalidatePath("/shop");
    revalidatePath(`/shop/${data.slug}`);
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return { success: false, error: "Product not found." };
    }

    revalidatePath("/shop");
    revalidatePath(`/shop/${product.slug}`);
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
