import mongoose, { type Document, type Model, Schema } from "mongoose";
import { UPLOAD_FOLDERS } from "@/lib/uploads/constants";

export interface StoredUploadDoc extends Document {
  folder: (typeof UPLOAD_FOLDERS)[number];
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const storedUploadSchema = new Schema<StoredUploadDoc>(
  {
    folder: {
      type: String,
      required: true,
      enum: UPLOAD_FOLDERS,
    },
    filename: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    mimeType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    data: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

storedUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

const StoredUpload: Model<StoredUploadDoc> =
  (mongoose.models.StoredUpload as Model<StoredUploadDoc> | undefined) ??
  mongoose.model<StoredUploadDoc>("StoredUpload", storedUploadSchema);

export default StoredUpload;
