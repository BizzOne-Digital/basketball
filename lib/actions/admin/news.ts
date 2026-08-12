"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import BlogPost from "@/models/BlogPost";
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

const newsSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: imageSchema,
  authorName: z.string().optional(),
  tags: z.array(z.string()).optional(),
  content: z.string().min(1),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: imageSchema,
    })
    .optional(),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().optional().nullable(),
});

export async function getNewsPosts() {
  await requireAdmin();
  await connectDB();
  return BlogPost.find().sort({ publishedAt: -1, createdAt: -1 }).lean();
}

export async function getNewsPostById(id: string) {
  await requireAdmin();
  await connectDB();
  return BlogPost.findById(id).lean();
}

export async function createNewsPost(
  input: z.infer<typeof newsSchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = newsSchema.parse(input);
    await connectDB();

    const post = await BlogPost.create({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      coverImage: data.coverImage ?? undefined,
      authorName: data.authorName,
      tags: data.tags ?? [],
      content: data.content,
      seo: data.seo
        ? {
            title: data.seo.title,
            description: data.seo.description,
            ogImage: data.seo.ogImage ?? undefined,
          }
        : undefined,
      status: data.status,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
    });

    revalidatePath("/news");
    revalidatePath(`/news/${data.slug}`);
    revalidatePath("/admin/news");

    return { success: true, data: { id: post._id.toString() } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateNewsPost(
  id: string,
  input: z.infer<typeof newsSchema>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = newsSchema.parse(input);
    await connectDB();

    const post = await BlogPost.findByIdAndUpdate(
      id,
      {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        coverImage: data.coverImage ?? undefined,
        authorName: data.authorName,
        tags: data.tags ?? [],
        content: data.content,
        seo: data.seo
          ? {
              title: data.seo.title,
              description: data.seo.description,
              ogImage: data.seo.ogImage ?? undefined,
            }
          : undefined,
        status: data.status,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!post) {
      return { success: false, error: "News post not found." };
    }

    revalidatePath("/news");
    revalidatePath(`/news/${data.slug}`);
    revalidatePath("/admin/news");
    revalidatePath(`/admin/news/${id}`);

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteNewsPost(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      return { success: false, error: "News post not found." };
    }

    revalidatePath("/news");
    revalidatePath(`/news/${post.slug}`);
    revalidatePath("/admin/news");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
