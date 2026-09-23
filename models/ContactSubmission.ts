import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { ContactSubmissionDocument } from "@/types";

export interface ContactSubmissionDoc
  extends ContactSubmissionDocument,
    Document {}

const contactSubmissionSchema = new Schema<ContactSubmissionDoc>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: { type: String, trim: true, maxlength: 40 },
    programInterest: { type: String, trim: true, maxlength: 120 },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    consent: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value: boolean) => value === true,
        message: "Consent is required",
      },
    },
    read: {
      type: Boolean,
      default: false,
    },
    honeypot: {
      type: String,
      trim: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

contactSubmissionSchema.index({ read: 1, createdAt: -1 });
contactSubmissionSchema.index({ email: 1, createdAt: -1 });

const ContactSubmission: Model<ContactSubmissionDoc> =
  (mongoose.models.ContactSubmission as
    | Model<ContactSubmissionDoc>
    | undefined) ??
  mongoose.model<ContactSubmissionDoc>(
    "ContactSubmission",
    contactSubmissionSchema,
  );

export default ContactSubmission;
