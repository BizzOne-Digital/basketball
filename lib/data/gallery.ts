import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import GalleryCategory from "@/models/GalleryCategory";
import GalleryImage from "@/models/GalleryImage";
import type { GalleryCategoryDocument, GalleryImageDocument } from "@/types";

function serializeCategory(
  doc: GalleryCategoryDocument,
): GalleryCategoryDocument {
  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    coverImage: doc.coverImage,
    order: doc.order,
    status: doc.status,
  };
}

function serializeImage(doc: GalleryImageDocument): GalleryImageDocument {
  return {
    slug: doc.slug,
    title: doc.title,
    caption: doc.caption,
    image: doc.image,
    categorySlug: doc.categorySlug,
    order: doc.order,
    status: doc.status,
    featured: doc.featured,
  };
}

export const getCategories = cache(
  async (): Promise<GalleryCategoryDocument[]> => {
    await connectDB();

    const categories = await GalleryCategory.find({ status: "published" })
      .sort({ order: 1, name: 1 })
      .lean<GalleryCategoryDocument[]>();

    return categories.map(serializeCategory);
  },
);

export const getImagesByCategory = cache(
  async (categorySlug: string): Promise<GalleryImageDocument[]> => {
    await connectDB();

    const images = await GalleryImage.find({
      categorySlug: categorySlug.trim().toLowerCase(),
      status: "published",
    })
      .sort({ order: 1, createdAt: -1 })
      .lean<GalleryImageDocument[]>();

    return images.map(serializeImage);
  },
);

export const getFeaturedImages = cache(
  async (limit = 8): Promise<GalleryImageDocument[]> => {
    await connectDB();

    const images = await GalleryImage.find({
      status: "published",
      featured: true,
    })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean<GalleryImageDocument[]>();

    if (images.length >= limit) {
      return images.map(serializeImage);
    }

    const fallback = await GalleryImage.find({ status: "published" })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean<GalleryImageDocument[]>();

    return fallback.map(serializeImage);
  },
);

export const getAllPublishedImages = cache(
  async (): Promise<GalleryImageDocument[]> => {
    await connectDB();

    const images = await GalleryImage.find({ status: "published" })
      .sort({ order: 1, createdAt: -1 })
      .lean<GalleryImageDocument[]>();

    return images.map(serializeImage);
  },
);
