import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { SponsorDocument } from "@/types";
import { contentStatusEnum, imageObjectSchema } from "./shared";

export interface SponsorDoc extends SponsorDocument, Document {}

const sponsorSchema = new Schema<SponsorDoc>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    logo: { type: imageObjectSchema },
    websiteUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    tier: {
      type: String,
      enum: ["platinum", "gold", "silver", "bronze", "supporter"],
      default: "supporter",
    },
    season: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    description: {
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

sponsorSchema.index({ slug: 1 }, { unique: true });
sponsorSchema.index({ season: 1, tier: 1, order: 1 });
sponsorSchema.index({ status: 1 });

const Sponsor: Model<SponsorDoc> =
  (mongoose.models.Sponsor as Model<SponsorDoc> | undefined) ??
  mongoose.model<SponsorDoc>("Sponsor", sponsorSchema);

export default Sponsor;
