import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { OpponentGymDocument } from "@/types";
import { contentStatusEnum, imageObjectSchema } from "./shared";

export interface OpponentGymDoc extends OpponentGymDocument, Document {}

const opponentGymSchema = new Schema<OpponentGymDoc>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    schoolName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    logo: { type: imageObjectSchema },
    mapUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    websiteUrl: {
      type: String,
      trim: true,
      maxlength: 500,
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

opponentGymSchema.index({ slug: 1 }, { unique: true });
opponentGymSchema.index({ order: 1 });
opponentGymSchema.index({ status: 1 });

const OpponentGym: Model<OpponentGymDoc> =
  (mongoose.models.OpponentGym as Model<OpponentGymDoc> | undefined) ??
  mongoose.model<OpponentGymDoc>("OpponentGym", opponentGymSchema);

export default OpponentGym;
