import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { GalleryCategoryDocument } from "@/types";
import {
  contentStatusEnum,
  imageObjectSchema,
  slugValidator,
} from "./shared";

export interface GalleryCategoryDoc
  extends GalleryCategoryDocument,
    Document {}

const galleryCategorySchema = new Schema<GalleryCategoryDoc>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
      validate: slugValidator,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: { type: String, trim: true, maxlength: 500 },
    coverImage: { type: imageObjectSchema },
    order: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: contentStatusEnum,
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

galleryCategorySchema.index({ slug: 1 }, { unique: true });
galleryCategorySchema.index({ status: 1, order: 1 });

const GalleryCategory: Model<GalleryCategoryDoc> =
  (mongoose.models.GalleryCategory as Model<GalleryCategoryDoc> | undefined) ??
  mongoose.model<GalleryCategoryDoc>(
    "GalleryCategory",
    galleryCategorySchema,
  );

export default GalleryCategory;
