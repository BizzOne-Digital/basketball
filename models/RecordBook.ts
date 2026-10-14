import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { RecordBookDocument } from "@/types";
import { contentStatusEnum } from "./shared";

export interface RecordBookDoc extends RecordBookDocument, Document {}

const recordBookSchema = new Schema<RecordBookDoc>(
  {
    category: {
      type: String,
      required: true,
      enum: ["team", "individual", "coaching"],
    },
    recordType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    subcategory: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    recordHolder: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    value: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    season: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    opponent: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    date: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    notes: {
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

recordBookSchema.index({ category: 1, recordType: 1, order: 1 });
recordBookSchema.index({ status: 1 });

const RecordBook: Model<RecordBookDoc> =
  (mongoose.models.RecordBook as Model<RecordBookDoc> | undefined) ??
  mongoose.model<RecordBookDoc>("RecordBook", recordBookSchema);

export default RecordBook;
