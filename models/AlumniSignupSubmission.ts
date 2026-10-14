import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { AlumniSignupSubmissionDocument } from "@/types";

export interface AlumniSignupSubmissionDoc
  extends AlumniSignupSubmissionDocument,
    Document {}

const alumniSignupSubmissionSchema = new Schema<AlumniSignupSubmissionDoc>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    address: { type: String, trim: true, maxlength: 200 },
    city: { type: String, trim: true, maxlength: 120 },
    state: { type: String, trim: true, maxlength: 80 },
    zip: { type: String, trim: true, maxlength: 20 },
    cellPhone: { type: String, trim: true, maxlength: 40 },
    graduationYear: { type: String, trim: true, maxlength: 10 },
    sportsPlayed: { type: String, required: true, trim: true, maxlength: 200 },
    gender: { type: String, trim: true, maxlength: 40 },
    teammatesInContact: { type: String, trim: true, maxlength: 1000 },
    degreeEarned: { type: String, trim: true, maxlength: 200 },
    occupation: { type: String, trim: true, maxlength: 200 },
    company: { type: String, trim: true, maxlength: 200 },
    favoriteMemory: { type: String, trim: true, maxlength: 5000 },
    consent: { type: Boolean, required: true },
    read: { type: Boolean, default: false },
    honeypot: { type: String, trim: true, select: false },
  },
  { timestamps: true },
);

alumniSignupSubmissionSchema.index({ read: 1, createdAt: -1 });
alumniSignupSubmissionSchema.index({ email: 1, createdAt: -1 });

const AlumniSignupSubmission: Model<AlumniSignupSubmissionDoc> =
  (mongoose.models.AlumniSignupSubmission as
    | Model<AlumniSignupSubmissionDoc>
    | undefined) ??
  mongoose.model<AlumniSignupSubmissionDoc>(
    "AlumniSignupSubmission",
    alumniSignupSubmissionSchema,
  );

export default AlumniSignupSubmission;
