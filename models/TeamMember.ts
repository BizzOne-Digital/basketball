import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { TeamMemberDocument } from "@/types";
import {
  contentStatusEnum,
  imageObjectSchema,
  slugValidator,
} from "./shared";

export interface TeamMemberDoc extends TeamMemberDocument, Document {}

const teamMemberSchema = new Schema<TeamMemberDoc>(
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
      maxlength: 120,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    bio: { type: String, trim: true },
    photo: { type: imageObjectSchema },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
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

teamMemberSchema.index({ slug: 1 }, { unique: true });
teamMemberSchema.index({ status: 1, order: 1 });

const TeamMember: Model<TeamMemberDoc> =
  (mongoose.models.TeamMember as Model<TeamMemberDoc> | undefined) ??
  mongoose.model<TeamMemberDoc>("TeamMember", teamMemberSchema);

export default TeamMember;
