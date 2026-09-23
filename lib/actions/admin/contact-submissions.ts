"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import ContactSubmission from "@/models/ContactSubmission";
import { actionError, type ActionResult } from "./shared";

export async function getContactSubmissions() {
  await requireAdmin();
  await connectDB();
  return ContactSubmission.find().sort({ createdAt: -1 }).lean();
}

export async function getContactSubmissionById(id: string) {
  await requireAdmin();
  await connectDB();
  return ContactSubmission.findById(id).lean();
}

export async function markContactSubmissionRead(
  id: string,
  read: boolean
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const submission = await ContactSubmission.findByIdAndUpdate(
      id,
      { read },
      { returnDocument: "after" }
    );

    if (!submission) {
      return { success: false, error: "Submission not found." };
    }

    revalidatePath("/admin/contact-submissions");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteContactSubmission(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const submission = await ContactSubmission.findByIdAndDelete(id);
    if (!submission) {
      return { success: false, error: "Submission not found." };
    }

    revalidatePath("/admin/contact-submissions");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
