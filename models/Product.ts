import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { ProductDocument } from "@/types";
import {
  contentStatusEnum,
  imageObjectSchema,
  seoSchema,
  slugValidator,
} from "./shared";

export interface ProductDoc extends ProductDocument, Document {}

const productSchema = new Schema<ProductDoc>(
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
      maxlength: 200,
    },
    description: { type: String, trim: true },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: { type: Number, min: 0 },
    images: {
      type: [imageObjectSchema],
      default: [],
    },
    sku: { type: String, trim: true, maxlength: 80 },
    inventory: { type: Number, min: 0, default: 0 },
    order: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: contentStatusEnum,
      default: "draft",
    },
    seo: { type: seoSchema },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ status: 1, order: 1 });
productSchema.index({ sku: 1 }, { sparse: true, unique: true });

const Product: Model<ProductDoc> =
  (mongoose.models.Product as Model<ProductDoc> | undefined) ??
  mongoose.model<ProductDoc>("Product", productSchema);

export default Product;
