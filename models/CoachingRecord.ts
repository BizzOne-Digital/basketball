import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { CoachingRecordDocument } from "@/types";
import { contentStatusEnum, imageObjectSchema } from "./shared";

export interface CoachingRecordDoc extends CoachingRecordDocument, Document {}

const coachingRecordSchema = new Schema<CoachingRecordDoc>(
  {
    coachName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    yearsCoached: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    wins: {
      type: Number,
      required: true,
      min: 0,
    },
    losses: {
      type: Number,
      required: true,
      min: 0,
    },
    winPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    photo: { type: imageObjectSchema },
    achievements: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      trim: true,
    },
    order: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: contentStatusEnum,
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

coachingRecordSchema.index({ order: 1 });
coachingRecordSchema.index({ status: 1 });

const CoachingRecord: Model<CoachingRecordDoc> =
  (mongoose.models.CoachingRecord as Model<CoachingRecordDoc> | undefined) ??
  mongoose.model<CoachingRecordDoc>("CoachingRecord", coachingRecordSchema);

export default CoachingRecord;
