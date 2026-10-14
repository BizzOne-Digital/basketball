import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { AdminUserDocument } from "@/types";

export interface AdminUserDoc extends AdminUserDocument, Document {}

const adminUserSchema = new Schema<AdminUserDoc>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "admin",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

adminUserSchema.index({ email: 1 }, { unique: true });

const AdminUser: Model<AdminUserDoc> =
  (mongoose.models.AdminUser as Model<AdminUserDoc> | undefined) ??
  mongoose.model<AdminUserDoc>("AdminUser", adminUserSchema);

export default AdminUser;
