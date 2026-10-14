import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { AlumniSpotlightDocument } from "@/types";
import { contentStatusEnum, imageObjectSchema, seoSchema } from "./shared";

export interface AlumniSpotlightDoc extends AlumniSpotlightDocument, Document {}

const alumniSpotlightSchema = new Schema<AlumniSpotlightDoc>(
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
    graduationYear: {
      type: Number,
      required: true,
    },
    photo: { type: imageObjectSchema },
    position: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    bio: {
      type: String,
      trim: true,
    },
    achievements: {
      type: [String],
      default: [],
    },
    careerHighlights: {
      type: String,
      trim: true,
    },
    currentStatus: {
      type: String,
      trim: true,
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0, min: 0 },
    seo: { type: seoSchema },
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

alumniSpotlightSchema.index({ slug: 1 }, { unique: true });
alumniSpotlightSchema.index({ graduationYear: -1 });
alumniSpotlightSchema.index({ featured: 1, order: 1 });
alumniSpotlightSchema.index({ status: 1 });

const AlumniSpotlight: Model<AlumniSpotlightDoc> =
  (mongoose.models.AlumniSpotlight as Model<AlumniSpotlightDoc> | undefined) ??
  mongoose.model<AlumniSpotlightDoc>("AlumniSpotlight", alumniSpotlightSchema);

export default AlumniSpotlight;
