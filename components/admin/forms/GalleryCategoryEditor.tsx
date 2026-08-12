"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createGalleryImage,
  deleteGalleryImage,
  updateGalleryCategory,
  updateGalleryImage,
} from "@/lib/actions/admin/gallery";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

type GalleryImageRow = {
  _id: string;
  slug: string;
  title?: string;
  caption?: string;
  path: string;
  alt?: string;
  order?: number;
  featured?: boolean;
};

export function GalleryCategoryEditor({
  category,
  images,
}: {
  category: Category;
  images: GalleryImageRow[];
}) {
  const router = useRouter();
  const [catForm, setCatForm] = useState(category);
  const [savingCat, setSavingCat] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [newImage, setNewImage] = useState({
    slug: "",
    title: "",
    caption: "",
    path: "",
    alt: "",
    featured: false,
  });
  const [adding, setAdding] = useState(false);

  const saveCategory = async () => {
    setSavingCat(true);
    const result = await updateGalleryCategory(category._id, {
      name: catForm.name,
      slug: catForm.slug,
      description: catForm.description,
    });
    setSavingCat(false);
    if (result.success) {
      toast.success("Category updated.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const addImage = async () => {
    if (!newImage.path || !newImage.slug) {
      toast.error("Upload an image and provide a slug.");
      return;
    }
    setAdding(true);
    const result = await createGalleryImage(category.slug, newImage);
    setAdding(false);
    if (result.success) {
      toast.success("Image added.");
      setNewImage({ slug: "", title: "", caption: "", path: "", alt: "", featured: false });
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteGalleryImage(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Image deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const updateImageField = async (image: GalleryImageRow, patch: Partial<GalleryImageRow>) => {
    const result = await updateGalleryImage(image._id, {
      slug: patch.slug ?? image.slug,
      title: patch.title ?? image.title,
      caption: patch.caption ?? image.caption,
      path: patch.path ?? image.path,
      alt: patch.alt ?? image.alt ?? "",
      featured: patch.featured ?? image.featured,
    });
    if (result.success) {
      toast.success("Image updated.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#5BB9FF]">Category</p>
        <h1 className="text-2xl font-bold text-[#04101F]">{category.name}</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void saveCategory();
        }}
      >
        <FormSection title="Category Details">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Name" name="name">
              <input
                value={catForm.name}
                onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </FormField>
            <FormField label="Slug" name="slug">
              <input
                value={catForm.slug}
                onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </FormField>
          </div>
          <SubmitButton loading={savingCat} label="Save Category" />
        </FormSection>
      </form>

      <FormSection title="Add Image">
        <div className="grid gap-4 md:grid-cols-2">
          <ImageUploadField
            label="Image"
            folder="gallery"
            value={newImage.path}
            altValue={newImage.alt}
            onChange={(path) => setNewImage({ ...newImage, path })}
            onAltChange={(alt) => setNewImage({ ...newImage, alt })}
          />
          <div className="space-y-4">
            <FormField label="Image Slug" name="slug">
              <input
                value={newImage.slug}
                onChange={(e) => setNewImage({ ...newImage, slug: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </FormField>
            <FormField label="Title" name="title">
              <input
                value={newImage.title}
                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </FormField>
            <FormField label="Caption" name="caption">
              <input
                value={newImage.caption}
                onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </FormField>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void addImage()}
          disabled={adding}
          className="mt-4 rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white"
        >
          {adding ? "Adding..." : "Add Image"}
        </button>
      </FormSection>

      <FormSection title={`Images (${images.length})`}>
        {images.length === 0 ? (
          <p className="text-sm text-[#B7C0CC]">No images in this category.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <div key={image._id} className="rounded-lg border p-3">
                <div className="relative aspect-video overflow-hidden rounded">
                  <Image src={image.path} alt={image.alt ?? ""} fill className="object-cover" sizes="300px" />
                </div>
                <div className="mt-3 space-y-2">
                  <input
                    value={image.caption ?? ""}
                    onBlur={(e) => void updateImageField(image, { caption: e.target.value })}
                    placeholder="Caption"
                    className="w-full rounded border px-2 py-1 text-xs"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void updateImageField(image, { featured: !image.featured })}
                      className="text-xs text-[#0B2F63]"
                    >
                      {image.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(image._id)}
                      className="text-xs text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </FormSection>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Image"
        description="This image will be permanently removed from the gallery."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
