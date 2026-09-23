"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/lib/actions/admin/testimonials";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type TestimonialRow = {
  _id: string;
  slug: string;
  authorName: string;
  authorRole?: string;
  quote: string;
  authorPhoto?: { path?: string; alt?: string } | null;
  status: "draft" | "published";
  featured?: boolean;
};

export function TestimonialsManager({ testimonials }: { testimonials: TestimonialRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<TestimonialRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    authorName: "",
    authorRole: "",
    quote: "",
    authorPhoto: null as { path: string; alt?: string } | null,
    status: "draft" as "draft" | "published",
    featured: false,
  });

  const resetForm = () => {
    setForm({
      slug: "",
      authorName: "",
      authorRole: "",
      quote: "",
      authorPhoto: null,
      status: "draft",
      featured: false,
    });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (row: TestimonialRow) => {
    setEditing(row);
    setForm({
      slug: row.slug,
      authorName: row.authorName,
      authorRole: row.authorRole ?? "",
      quote: row.quote,
      authorPhoto: row.authorPhoto?.path
        ? { path: row.authorPhoto.path, alt: row.authorPhoto.alt }
        : null,
      status: row.status,
      featured: row.featured ?? false,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      authorPhoto: form.authorPhoto
        ? { path: form.authorPhoto.path, alt: form.authorPhoto.alt ?? "" }
        : null,
    };
    const result = editing
      ? await updateTestimonial(editing._id, payload)
      : await createTestimonial(payload);
    setLoading(false);
    if (result.success) {
      toast.success(editing ? "Testimonial updated." : "Testimonial created.");
      resetForm();
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteTestimonial(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Testimonial deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">Testimonials</h1>
          <p className="mt-1 text-[#343A40]">Manage player, parent, and alumni quotes.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white"
        >
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="rounded-xl border bg-white p-6 shadow-sm">
          <FormSection title={editing ? "Edit Testimonial" : "New Testimonial"}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Slug" name="slug">
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Name" name="authorName">
                <input
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Role / Relationship" name="authorRole">
                <input
                  value={form.authorRole}
                  onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
              <FormField label="Quote" name="quote" className="md:col-span-2">
                <textarea
                  rows={4}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <ImageUploadField
                label="Portrait"
                folder="misc"
                value={form.authorPhoto?.path ?? ""}
                altValue={form.authorPhoto?.alt ?? ""}
                onChange={(path) =>
                  setForm({
                    ...form,
                    authorPhoto: path ? { path, alt: form.authorPhoto?.alt ?? "" } : null,
                  })
                }
                onAltChange={(alt) =>
                  setForm({
                    ...form,
                    authorPhoto: form.authorPhoto?.path
                      ? { path: form.authorPhoto.path, alt }
                      : null,
                  })
                }
              />
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
        data={testimonials}
        columns={[
          { key: "authorName", header: "Name" },
          { key: "authorRole", header: "Role" },
          {
            key: "quote",
            header: "Quote",
            render: (row) => <span className="line-clamp-2 max-w-xs">{row.quote}</span>,
          },
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
        title="Delete Testimonial"
        description="This testimonial will be permanently removed."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
