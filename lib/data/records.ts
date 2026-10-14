import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import { RecordBook, CoachingRecord } from "@/models";
import type { RecordBookDocument, CoachingRecordDocument } from "@/types";

export const getPublishedRecordsByCategory = cache(
  async (category: "team" | "individual" | "coaching"): Promise<RecordBookDocument[]> => {
    try {
      await connectDB();
      const records = await RecordBook.find({
        category,
        status: "published",
      })
        .sort({ recordType: 1, order: 1 })
        .lean();

      return records.map((r) => ({
        ...r,
        _id: r._id.toString(),
      })) as unknown as RecordBookDocument[];
    } catch (error) {
      console.error("Error fetching records:", error);
      return [];
    }
  },
);

export const getCoachingRecords = cache(
  async (): Promise<CoachingRecordDocument[]> => {
    try {
      await connectDB();
      const coaches = await CoachingRecord.find({
        status: "published",
      })
        .sort({ order: 1 })
        .lean();

      return coaches.map((c) => ({
        ...c,
        _id: c._id.toString(),
      })) as unknown as CoachingRecordDocument[];
    } catch (error) {
      console.error("Error fetching coaching records:", error);
      return [];
    }
  },
);
