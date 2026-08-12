import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { PageDocument } from "@/types";
import {
  contentStatusEnum,
  pageSectionSchema,
  seoSchema,
  slugValidator,
} from "./shared";

export interface PageDoc extends PageDocument, Document {}

const pageSchema = new Schema<PageDoc>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 80,
      validate: slugValidator,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
      validate: slugValidator,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: contentStatusEnum,
      default: "draft",
    },
    seo: { type: seoSchema },
    sections: {
      type: [pageSectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

pageSchema.index({ key: 1 }, { unique: true });
pageSchema.index({ slug: 1 }, { unique: true });
pageSchema.index({ status: 1 });

const Page: Model<PageDoc> =
  (mongoose.models.Page as Model<PageDoc> | undefined) ??
  mongoose.model<PageDoc>("Page", pageSchema);

export default Page;
