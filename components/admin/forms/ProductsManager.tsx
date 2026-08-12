"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/actions/admin/products";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type ProductRow = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  status: "draft" | "published";
};

type ProductFormState = {
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string;
  sku: string;
  inventory: string;
  images: { path: string; alt?: string }[];
  order: number;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
};

export function ProductsManager({
  products,
  fullProducts,
}: {
  products: ProductRow[];
  fullProducts: Array<
    ProductRow & {
      description?: string;
      compareAtPrice?: number | null;
      sku?: string;
      inventory?: number | null;
      images?: { path: string; alt?: string }[];
      order?: number;
      seoTitle?: string;
      seoDescription?: string;
    }
  >;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<(typeof fullProducts)[number] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const emptyForm: ProductFormState = {
    name: "",
    slug: "",
    description: "",
    price: "0",
    compareAtPrice: "",
    sku: "",
    inventory: "",
    images: [],
    order: 0,
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  };
  const [form, setForm] = useState<ProductFormState>(emptyForm);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (row: ProductRow) => {
    const full = fullProducts.find((p) => p._id === row._id);
    if (!full) return;
    setEditing(full);
    setForm({
      name: full.name,
      slug: full.slug,
      description: full.description ?? "",
      price: String(full.price ?? 0),
      compareAtPrice: full.compareAtPrice != null ? String(full.compareAtPrice) : "",
      sku: full.sku ?? "",
      inventory: full.inventory != null ? String(full.inventory) : "",
      images: full.images ?? [],
      order: full.order ?? 0,
      status: full.status,
      seoTitle: full.seoTitle ?? "",
      seoDescription: full.seoDescription ?? "",
    });
    setShowForm(true);
  };

  const buildPayload = () => ({
    name: form.name,
    slug: form.slug,
    description: form.description,
    price: Number(form.price) || 0,
    compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
    sku: form.sku || undefined,
    inventory: form.inventory ? Number(form.inventory) : null,
    images: form.images.map((img) => ({ path: img.path, alt: img.alt ?? "" })),
    order: form.order,
    status: form.status,
    seo: { title: form.seoTitle, description: form.seoDescription },
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = buildPayload();
    const result = editing
      ? await updateProduct(editing._id, payload)
      : await createProduct(payload);
    setLoading(false);
    if (result.success) {
      toast.success(editing ? "Product updated." : "Product created.");
      resetForm();
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteProduct(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Product deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">Products / Shop</h1>
          <p className="mt-1 text-[#343A40]">Manage gear catalog and product details.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white"
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="rounded-xl border bg-white p-6 shadow-sm">
          <FormSection title={editing ? "Edit Product" : "New Product"}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Name" name="name">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Slug" name="slug">
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Price" name="price">
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </FormField>
              <FormField label="Compare At Price" name="compareAtPrice">
                <input
                  type="number"
                  step="0.01"
                  value={form.compareAtPrice}
                  onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
              <div className="md:col-span-2">
                <RichTextEditor
                  label="Description"
                  value={form.description}
                  onChange={(description) => setForm({ ...form, description })}
                />
              </div>
              <div className="md:col-span-2">
                <ImageUploadField
                  label="Add Product Image"
                  folder="products"
                  value=""
                  onChange={(path) => {
                    if (path) setForm({ ...form, images: [...form.images, { path, alt: "" }] });
                  }}
                />
              </div>
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
        data={products}
        columns={[
          { key: "name", header: "Name" },
          { key: "slug", header: "Slug" },
          {
            key: "price",
            header: "Price",
            render: (r) => `$${r.price.toFixed(2)}`,
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
        title="Delete Product"
        description="This product will be permanently removed."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
