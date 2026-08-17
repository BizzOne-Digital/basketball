import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import { AlumniSpotlight } from "@/models";
import type { AlumniSpotlightDocument } from "@/types";

export const getPublishedAlumniSpotlights = cache(
  async (): Promise<AlumniSpotlightDocument[]> => {
    try {
      await connectDB();
      const alumni = await AlumniSpotlight.find({
        status: "published",
      })
        .sort({ featured: -1, graduationYear: -1, order: 1 })
        .lean();

      return alumni.map((a) => ({
        ...a,
        _id: a._id.toString(),
      })) as unknown as AlumniSpotlightDocument[];
    } catch (error) {
      console.error("Error fetching alumni spotlights:", error);
      return [];
    }
  },
);

export const getFeaturedAlumni = cache(
  async (): Promise<AlumniSpotlightDocument | null> => {
    try {
      await connectDB();
      const alumni = await AlumniSpotlight.findOne({
        status: "published",
        featured: true,
      })
        .sort({ order: 1 })
        .lean();

      if (!alumni) return null;

      return {
        ...alumni,
        _id: alumni._id.toString(),
      } as unknown as AlumniSpotlightDocument;
    } catch (error) {
      console.error("Error fetching featured alumni:", error);
      return null;
    }
  },
);
