import { cache } from "react";
import { withDatabase } from "@/lib/db/with-database";
import TeamMember from "@/models/TeamMember";
import type { TeamMemberDocument } from "@/types";

function serializeMember(doc: TeamMemberDocument): TeamMemberDocument {
  return {
    slug: doc.slug,
    name: doc.name,
    role: doc.role,
    bio: doc.bio,
    photo: doc.photo,
    email: doc.email,
    phone: doc.phone,
    order: doc.order,
    status: doc.status,
  };
}

export const getPublishedTeamMembers = cache(
  async (): Promise<TeamMemberDocument[]> => {
    return withDatabase(async () => {
      const members = await TeamMember.find({ status: "published" })
        .sort({ order: 1, name: 1 })
        .lean<TeamMemberDocument[]>();

      return members.map(serializeMember);
    }, []);
  },
);
