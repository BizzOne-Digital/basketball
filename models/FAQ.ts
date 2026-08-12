import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { FAQDocument } from "@/types";
import { contentStatusEnum, slugValidator } from "./shared";

export interface FAQDoc extends FAQDocument, Document {}

const faqSchema = new Schema<FAQDoc>(
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
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: String, trim: true, maxlength: 80 },
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

faqSchema.index({ slug: 1 }, { unique: true });
faqSchema.index({ status: 1, category: 1, order: 1 });

const FAQ: Model<FAQDoc> =
  (mongoose.models.FAQ as Model<FAQDoc> | undefined) ??
  mongoose.model<FAQDoc>("FAQ", faqSchema);

export default FAQ;
