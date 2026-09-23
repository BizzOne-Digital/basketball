import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { ServiceDocument } from "@/types";
import {
  contentStatusEnum,
  imageObjectSchema,
  pageSectionSchema,
  seoSchema,
  serviceAudienceSchema,
  serviceBenefitSchema,
  serviceScheduleSchema,
  slugValidator,
} from "./shared";

export interface ServiceDoc extends ServiceDocument, Document {}

const serviceSchema = new Schema<ServiceDoc>(
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
    cardTitle: { type: String, trim: true, maxlength: 120 },
    cardDescription: { type: String, trim: true, maxlength: 500 },
    cardImage: { type: imageObjectSchema },
    cardCtaLabel: { type: String, trim: true, maxlength: 80 },
    order: { type: Number, default: 0, min: 0 },
    seo: { type: seoSchema },
    hero: { type: pageSectionSchema },
    intro: { type: String, trim: true },
    detailSections: {
      type: [pageSectionSchema],
      default: [],
    },
    benefits: {
      type: [serviceBenefitSchema],
      default: [],
    },
    audience: { type: serviceAudienceSchema },
    schedule: { type: serviceScheduleSchema },
    whatToBring: {
      type: [String],
      default: [],
    },
    relatedImages: {
      type: [imageObjectSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

serviceSchema.index({ slug: 1 }, { unique: true });
serviceSchema.index({ status: 1, order: 1 });

const Service: Model<ServiceDoc> =
  (mongoose.models.Service as Model<ServiceDoc> | undefined) ??
  mongoose.model<ServiceDoc>("Service", serviceSchema);

export default Service;
