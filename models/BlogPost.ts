import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { BlogPostDocument } from "@/types";
import {
  contentStatusEnum,
  imageObjectSchema,
  seoSchema,
  slugValidator,
} from "./shared";

export interface BlogPostDoc extends BlogPostDocument, Document {}

const blogPostSchema = new Schema<BlogPostDoc>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      validate: slugValidator,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    excerpt: { type: String, trim: true, maxlength: 500 },
    content: {
      type: String,
      required: true,
    },
    coverImage: { type: imageObjectSchema },
    authorName: { type: String, trim: true, maxlength: 120 },
    publishedAt: { type: Date },
    tags: {
      type: [String],
      default: [],
    },
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

blogPostSchema.index({ slug: 1 }, { unique: true });
blogPostSchema.index({ status: 1, publishedAt: -1 });

const BlogPost: Model<BlogPostDoc> =
  (mongoose.models.BlogPost as Model<BlogPostDoc> | undefined) ??
  mongoose.model<BlogPostDoc>("BlogPost", blogPostSchema);

export default BlogPost;
