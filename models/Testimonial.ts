import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { TestimonialDocument } from "@/types";
import {
  contentStatusEnum,
  imageObjectSchema,
  slugValidator,
} from "./shared";

export interface TestimonialDoc extends TestimonialDocument, Document {}

const testimonialSchema = new Schema<TestimonialDoc>(
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
    authorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    authorRole: { type: String, trim: true, maxlength: 120 },
    authorPhoto: { type: imageObjectSchema },
    quote: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    rating: { type: Number, min: 1, max: 5 },
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

testimonialSchema.index({ slug: 1 }, { unique: true });
testimonialSchema.index({ status: 1, order: 1 });
testimonialSchema.index({ featured: 1, status: 1 });

const Testimonial: Model<TestimonialDoc> =
  (mongoose.models.Testimonial as Model<TestimonialDoc> | undefined) ??
  mongoose.model<TestimonialDoc>("Testimonial", testimonialSchema);

export default Testimonial;
