import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import { OpponentGym } from "@/models";
import type { OpponentGymDocument } from "@/types";

export const getPublishedOpponentGyms = cache(
  async (): Promise<OpponentGymDocument[]> => {
    try {
      await connectDB();
      const gyms = await OpponentGym.find({
        status: "published",
      })
        .sort({ order: 1, schoolName: 1 })
        .lean();

      return gyms.map((g) => ({
        ...g,
        _id: g._id.toString(),
      })) as unknown as OpponentGymDocument[];
    } catch (error) {
      console.error("Error fetching opponent gyms:", error);
      return [];
    }
  },
);
