import { getTeamMembers } from "@/lib/actions/admin/team";
import { TeamManager } from "@/components/admin/forms/TeamManager";

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <TeamManager
        members={members.map((m) => ({
          _id: m._id.toString(),
          slug: m.slug,
          name: m.name,
          role: m.role,
          bio: m.bio,
          photo: m.photo,
          email: m.email,
          phone: m.phone,
          status: m.status,
        }))}
      />
    </div>
  );
}
