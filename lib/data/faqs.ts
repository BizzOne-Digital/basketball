import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import FAQ from "@/models/FAQ";
import type { FAQDocument } from "@/types";

function serializeFaq(doc: FAQDocument): FAQDocument {
  return {
    slug: doc.slug,
    question: doc.question,
    answer: doc.answer,
    category: doc.category,
    order: doc.order,
    status: doc.status,
  };
}

export const getPublishedFAQs = cache(
  async (): Promise<FAQDocument[]> => {
    await connectDB();

    const faqs = await FAQ.find({ status: "published" })
      .sort({ category: 1, order: 1 })
      .lean<FAQDocument[]>();

    return faqs.map(serializeFaq);
  },
);
