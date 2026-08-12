import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { GalleryImageDocument } from "@/types";
import {
  contentStatusEnum,
  imageObjectSchema,
  slugValidator,
} from "./shared";

export interface GalleryImageDoc extends GalleryImageDocument, Document {}

const galleryImageSchema = new Schema<GalleryImageDoc>(
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
    title: { type: String, trim: true, maxlength: 200 },
    caption: { type: String, trim: true, maxlength: 500 },
    image: {
      type: imageObjectSchema,
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    order: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: contentStatusEnum,
      default: "draft",
    },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

galleryImageSchema.index({ slug: 1 }, { unique: true });
galleryImageSchema.index({ categorySlug: 1, status: 1, order: 1 });
galleryImageSchema.index({ featured: 1, status: 1 });

const GalleryImage: Model<GalleryImageDoc> =
  (mongoose.models.GalleryImage as Model<GalleryImageDoc> | undefined) ??
  mongoose.model<GalleryImageDoc>("GalleryImage", galleryImageSchema);

export default GalleryImage;
