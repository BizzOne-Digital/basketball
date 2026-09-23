import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import { Sponsor } from "@/models";
import type { SponsorDocument } from "@/types";

export const getPublishedSponsorsBySeason = cache(
  async (season: string): Promise<SponsorDocument[]> => {
    try {
      await connectDB();
      const sponsors = await Sponsor.find({
        season,
        status: "published",
      })
        .sort({ tier: 1, order: 1 })
        .lean();

      return sponsors.map((s) => ({
        ...s,
        _id: s._id.toString(),
      })) as unknown as SponsorDocument[];
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      return [];
    }
  },
);

export const getCurrentSponsors = cache(async (): Promise<SponsorDocument[]> => {
  return getPublishedSponsorsBySeason("2026");
});
