import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { PlayerRosterDocument } from "@/types";
import { contentStatusEnum, imageObjectSchema } from "./shared";

export interface PlayerRosterDoc extends PlayerRosterDocument, Document {}

const playerRosterSchema = new Schema<PlayerRosterDoc>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    grade: {
      type: String,
      required: true,
      enum: ["Freshman", "Sophomore", "Junior", "Senior"],
    },
    jerseyNumber: {
      type: Number,
      min: 0,
      max: 99,
    },
    position: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    height: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    headshot: { type: imageObjectSchema },
    bio: { type: String, trim: true },
    season: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    order: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: contentStatusEnum,
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

playerRosterSchema.index({ slug: 1 }, { unique: true });
playerRosterSchema.index({ season: 1, grade: 1, order: 1 });
playerRosterSchema.index({ status: 1 });

const PlayerRoster: Model<PlayerRosterDoc> =
  (mongoose.models.PlayerRoster as Model<PlayerRosterDoc> | undefined) ??
  mongoose.model<PlayerRosterDoc>("PlayerRoster", playerRosterSchema);

export default PlayerRoster;
