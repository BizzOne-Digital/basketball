import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface SiteContentDoc extends Document {
  key: string;
  data: unknown;
  createdAt: Date;
  updatedAt: Date;
}

const siteContentSchema = new Schema<SiteContentDoc>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 80,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true, minimize: false },
);

const SiteContent: Model<SiteContentDoc> =
  (mongoose.models.SiteContent as Model<SiteContentDoc> | undefined) ??
  mongoose.model<SiteContentDoc>("SiteContent", siteContentSchema);

export default SiteContent;
