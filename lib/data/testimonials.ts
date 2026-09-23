import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import Testimonial from "@/models/Testimonial";
import type { TestimonialDocument } from "@/types";

function serializeTestimonial(
  doc: TestimonialDocument,
): TestimonialDocument {
  return {
    slug: doc.slug,
    authorName: doc.authorName,
    authorRole: doc.authorRole,
    authorPhoto: doc.authorPhoto,
    quote: doc.quote,
    rating: doc.rating,
    order: doc.order,
    status: doc.status,
    featured: doc.featured,
  };
}

export const getPublishedTestimonials = cache(
  async (): Promise<TestimonialDocument[]> => {
    await connectDB();

    const testimonials = await Testimonial.find({ status: "published" })
      .sort({ order: 1, createdAt: -1 })
      .lean<TestimonialDocument[]>();

    return testimonials.map(serializeTestimonial);
  },
);

export const getFeaturedTestimonial = cache(
  async (): Promise<TestimonialDocument | null> => {
    await connectDB();

    const featured = await Testimonial.findOne({
      status: "published",
      featured: true,
    })
      .sort({ order: 1 })
      .lean<TestimonialDocument>();

    if (featured) {
      return serializeTestimonial(featured);
    }

    const fallback = await Testimonial.findOne({ status: "published" })
      .sort({ order: 1 })
      .lean<TestimonialDocument>();

    return fallback ? serializeTestimonial(fallback) : null;
  },
);
