"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import TeamMember from "@/models/TeamMember";
import { actionError, type ActionResult } from "./shared";

const imageSchema = z
  .object({
    path: z.string(),
    alt: z.string().default(""),
  })
  .optional()
  .nullable();

const teamMemberSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  photo: imageSchema,
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  status: z.enum(["draft", "published"]),
  order: z.number().optional(),
});

export async function getTeamMembers() {
  await requireAdmin();
  await connectDB();
  return TeamMember.find().sort({ order: 1, name: 1 }).lean();
}

export async function createTeamMember(
  input: z.infer<typeof teamMemberSchema>
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = teamMemberSchema.parse(input);
    await connectDB();

    const member = await TeamMember.create({
      slug: data.slug,
      name: data.name,
      role: data.role,
      bio: data.bio,
      photo: data.photo ?? undefined,
      email: data.email || undefined,
      phone: data.phone,
      status: data.status,
      order: data.order ?? 0,
    });

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true, data: { id: String(member._id) } };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateTeamMember(
  id: string,
  input: z.infer<typeof teamMemberSchema>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = teamMemberSchema.parse(input);
    await connectDB();

    const member = await TeamMember.findByIdAndUpdate(
      id,
      {
        slug: data.slug,
        name: data.name,
        role: data.role,
        bio: data.bio,
        photo: data.photo ?? undefined,
        email: data.email || undefined,
        phone: data.phone,
        status: data.status,
        order: data.order ?? 0,
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!member) {
      return { success: false, error: "Team member not found." };
    }

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteTeamMember(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) {
      return { success: false, error: "Team member not found." };
    }

    revalidatePath("/team");
    revalidatePath("/admin/team");

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
