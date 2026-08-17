import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import { PlayerRoster } from "@/models";
import type { PlayerRosterDocument } from "@/types";

export const getPublishedRosterBySeason = cache(
  async (season: string): Promise<PlayerRosterDocument[]> => {
    try {
      await connectDB();
      const players = await PlayerRoster.find({
        season,
        status: "published",
      })
        .sort({ grade: 1, order: 1 })
        .lean();

      return players.map((p) => ({
        ...p,
        _id: p._id.toString(),
      })) as unknown as PlayerRosterDocument[];
    } catch (error) {
      console.error("Error fetching roster:", error);
      return [];
    }
  },
);

export const getCurrentRoster = cache(
  async (): Promise<PlayerRosterDocument[]> => {
    return getPublishedRosterBySeason("2025-26");
  },
);
