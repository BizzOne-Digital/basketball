"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "@/lib/actions/admin/team";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type TeamRow = {
  _id: string;
  slug: string;
  name: string;
  role: string;
  bio?: string;
  photo?: { path?: string; alt?: string } | null;
  email?: string;
  phone?: string;
  status: "draft" | "published";
};

export function TeamManager({ members }: { members: TeamRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<TeamRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    name: "",
    role: "",
    bio: "",
    photo: null as { path: string; alt?: string } | null,
    email: "",
    phone: "",
    status: "draft" as "draft" | "published",
  });

  const resetForm = () => {
    setForm({
      slug: "",
      name: "",
      role: "",
      bio: "",
      photo: null,
      email: "",
      phone: "",
      status: "draft",
    });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (row: TeamRow) => {
    setEditing(row);
    setForm({
      slug: row.slug,
      name: row.name,
      role: row.role,
      bio: row.bio ?? "",
      photo: row.photo?.path ? { path: row.photo.path, alt: row.photo.alt } : null,
      email: row.email ?? "",
      phone: row.phone ?? "",
      status: row.status,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      photo: form.photo ? { path: form.photo.path, alt: form.photo.alt ?? "" } : null,
    };
    const result = editing
      ? await updateTeamMember(editing._id, payload)
      : await createTeamMember(payload);
    setLoading(false);
    if (result.success) {
      toast.success(editing ? "Team member updated." : "Team member created.");
      resetForm();
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteTeamMember(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Team member deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">Team</h1>
          <p className="mt-1 text-[#343A40]">Manage coaches, staff, and roster members.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white"
        >
          Add Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="rounded-xl border bg-white p-6 shadow-sm">
          <FormSection title={editing ? "Edit Team Member" : "New Team Member"}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Slug" name="slug">
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Name" name="name">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Role" name="role">
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Status" name="status">
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as "draft" | "published" })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </FormField>
              <ImageUploadField
                label="Photo"
                folder="misc"
                value={form.photo?.path ?? ""}
                altValue={form.photo?.alt ?? ""}
                onChange={(path) =>
                  setForm({
                    ...form,
                    photo: path ? { path, alt: form.photo?.alt ?? "" } : null,
                  })
                }
                onAltChange={(alt) =>
                  setForm({
                    ...form,
                    photo: form.photo?.path ? { path: form.photo.path, alt } : null,
                  })
                }
              />
              <div className="md:col-span-2">
                <RichTextEditor
                  label="Bio"
                  value={form.bio}
                  onChange={(bio) => setForm({ ...form, bio })}
                />
              </div>
              <FormField label="Email" name="email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
              <FormField label="Phone" name="phone">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
            </div>
            <div className="mt-4 flex gap-3">
              <SubmitButton loading={loading} />
              <button type="button" onClick={resetForm} className="rounded-lg border px-4 py-2 text-sm">
                Cancel
              </button>
            </div>
          </FormSection>
        </form>
      )}

      <DataTable
        data={members}
        columns={[
          { key: "name", header: "Name" },
          { key: "role", header: "Role" },
          { key: "status", header: "Status", render: (r) => <span className="capitalize">{r.status}</span> },
          {
            key: "actions",
            header: "Actions",
            render: (row) => <DataTableActions onDelete={() => setDeleteId(row._id)} />,
          },
        ]}
        onRowClick={openEdit}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Team Member"
        description="This team member will be permanently removed."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
