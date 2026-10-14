"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createFAQ, deleteFAQ, updateFAQ } from "@/lib/actions/admin/faqs";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type FAQRow = {
  _id: string;
  slug: string;
  question: string;
  answer: string;
  category?: string;
  status: "draft" | "published";
};

export function FAQsManager({ faqs }: { faqs: FAQRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<FAQRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    question: "",
    answer: "",
    category: "",
    status: "draft" as "draft" | "published",
  });

  const resetForm = () => {
    setForm({ slug: "", question: "", answer: "", category: "", status: "draft" });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (row: FAQRow) => {
    setEditing(row);
    setForm({
      slug: row.slug,
      question: row.question,
      answer: row.answer,
      category: row.category ?? "",
      status: row.status,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = editing ? await updateFAQ(editing._id, form) : await createFAQ(form);
    setLoading(false);
    if (result.success) {
      toast.success(editing ? "FAQ updated." : "FAQ created.");
      resetForm();
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteFAQ(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("FAQ deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">FAQs</h1>
          <p className="mt-1 text-[#343A40]">Manage frequently asked questions.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white"
        >
          Add FAQ
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="rounded-xl border bg-white p-6 shadow-sm">
          <FormSection title={editing ? "Edit FAQ" : "New FAQ"}>
            <FormField label="Slug" name="slug">
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                required
              />
            </FormField>
            <FormField label="Question" name="question">
              <input
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                required
              />
            </FormField>
            <RichTextEditor
              label="Answer"
              value={form.answer}
              onChange={(answer) => setForm({ ...form, answer })}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Category" name="category">
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
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
        data={faqs}
        columns={[
          { key: "question", header: "Question" },
          { key: "category", header: "Category" },
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
        title="Delete FAQ"
        description="This FAQ will be permanently removed."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
