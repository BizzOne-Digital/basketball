import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";
import type { ServiceDocument } from "@/types";

function serializeService(doc: ServiceDocument): ServiceDocument {
  return {
    slug: doc.slug,
    title: doc.title,
    status: doc.status,
    cardTitle: doc.cardTitle,
    cardDescription: doc.cardDescription,
    cardImage: doc.cardImage,
    cardCtaLabel: doc.cardCtaLabel,
    order: doc.order,
    seo: doc.seo,
    hero: doc.hero,
    intro: doc.intro,
    detailSections: doc.detailSections ?? [],
    benefits: doc.benefits ?? [],
    audience: doc.audience,
    schedule: doc.schedule,
    whatToBring: doc.whatToBring ?? [],
    relatedImages: doc.relatedImages ?? [],
  };
}

export const getPublishedServices = cache(
  async (): Promise<ServiceDocument[]> => {
    await connectDB();

    const services = await Service.find({ status: "published" })
      .sort({ order: 1, title: 1 })
      .lean<ServiceDocument[]>();

    return services.map(serializeService);
  },
);

export const getServiceBySlug = cache(
  async (slug: string): Promise<ServiceDocument | null> => {
    await connectDB();

    const service = await Service.findOne({
      slug: slug.trim().toLowerCase(),
      status: "published",
    }).lean<ServiceDocument>();

    if (!service) {
      return null;
    }

    return serializeService(service);
  },
);
