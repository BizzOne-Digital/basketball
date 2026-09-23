"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createGalleryCategory,
  deleteGalleryCategory,
} from "@/lib/actions/admin/gallery";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";
import { FormField, SubmitButton } from "@/components/admin/FormField";

type CategoryRow = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
};

export function GalleryCategoriesClient({
  categories,
}: {
  categories: CategoryRow[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await createGalleryCategory({ name, slug, description });
    setLoading(false);
    if (result.success) {
      toast.success("Category created.");
      setName("");
      setSlug("");
      setDescription("");
      setShowForm(false);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteGalleryCategory(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Category deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">Gallery</h1>
          <p className="mt-1 text-[#343A40]">Manage gallery categories and images.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white hover:bg-[#04101F]"
        >
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-[#B7C0CC]/40 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Category Name" name="name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
                required
              />
            </FormField>
            <FormField label="Slug" name="slug">
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
                required
              />
            </FormField>
            <FormField label="Description" name="description" className="md:col-span-2">
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
              />
            </FormField>
          </div>
          <div className="mt-4">
            <SubmitButton loading={loading} label="Create Category" />
          </div>
        </form>
      )}

      <DataTable
        data={categories}
        columns={[
          { key: "name", header: "Name" },
          { key: "slug", header: "Slug" },
          { key: "description", header: "Description" },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <div className="flex gap-2">
                <Link
                  href={`/admin/gallery/categories/${row._id}`}
                  className="rounded-md bg-[#0B2F63] px-3 py-1.5 text-xs font-medium text-white"
                >
                  Manage Images
                </Link>
                <DataTableActions onDelete={() => setDeleteId(row._id)} />
              </div>
            ),
          },
        ]}
        emptyMessage="No gallery categories yet."
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Category"
        description="This will delete the category and all its images."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
