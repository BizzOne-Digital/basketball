import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import BlogPost from "@/models/BlogPost";
import type { BlogPostDocument } from "@/types";

function serializePost(doc: BlogPostDocument): BlogPostDocument {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    coverImage: doc.coverImage,
    authorName: doc.authorName,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : undefined,
    tags: doc.tags ?? [],
    status: doc.status,
    seo: doc.seo,
  };
}

export const getPublishedPosts = cache(
  async (limit?: number): Promise<BlogPostDocument[]> => {
    await connectDB();

    let query = BlogPost.find({ status: "published" }).sort({
      publishedAt: -1,
      createdAt: -1,
    });

    if (limit) {
      query = query.limit(limit);
    }

    const posts = await query.lean<BlogPostDocument[]>();
    return posts.map(serializePost);
  },
);

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPostDocument | null> => {
    await connectDB();

    const post = await BlogPost.findOne({
      slug: slug.trim().toLowerCase(),
      status: "published",
    }).lean<BlogPostDocument>();

    if (!post) {
      return null;
    }

    return serializePost(post);
  },
);

export const getFeaturedPost = cache(
  async (): Promise<BlogPostDocument | null> => {
    const posts = await getPublishedPosts(1);
    return posts[0] ?? null;
  },
);
