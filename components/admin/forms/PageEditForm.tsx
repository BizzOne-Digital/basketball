"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { PageSection } from "@/types";
import { updatePage, type UpdatePageInput } from "@/lib/actions/admin/pages";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { PageSectionEditor } from "@/components/admin/PageSectionEditor";

type PageData = {
  pageKey: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  seo?: {
    title?: string;
    description?: string;
    ogImage?: { path: string; alt?: string } | null;
  };
  sections?: PageSection[];
};

export function PageEditForm({ page }: { page: PageData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PageData>({
    ...page,
    seo: page.seo ?? {},
    sections: page.sections ?? [],
  });

  const handleSave = async () => {
    setLoading(true);
    const payload: UpdatePageInput = {
      pageKey: form.pageKey,
      title: form.title,
      slug: form.slug,
      status: form.status,
      seo: {
        title: form.seo?.title,
        description: form.seo?.description,
        ogImage: form.seo?.ogImage
          ? { path: form.seo.ogImage.path, alt: form.seo.ogImage.alt ?? "" }
          : null,
      },
      sections: (form.sections ?? []).map((s, i) => ({ ...s, order: i })),
    };

    const result = await updatePage(payload);
    setLoading(false);

    if (result.success) {
      toast.success("Page saved successfully.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSave();
      }}
      className="space-y-6"
    >
      <FormSection title="Page Info">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Title" name="title">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Slug" name="slug">
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Status" name="status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as "draft" | "published" })
              }
              className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection title="SEO">
        <div className="grid gap-4">
          <FormField label="SEO Title" name="seoTitle">
            <input
              value={form.seo?.title ?? ""}
              onChange={(e) =>
                setForm({ ...form, seo: { ...form.seo, title: e.target.value } })
              }
              className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="SEO Description" name="seoDescription">
            <textarea
              rows={3}
              value={form.seo?.description ?? ""}
              onChange={(e) =>
                setForm({ ...form, seo: { ...form.seo, description: e.target.value } })
              }
              className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
            />
          </FormField>
          <ImageUploadField
            label="OG Image"
            folder="pages"
            value={form.seo?.ogImage?.path ?? ""}
            altValue={form.seo?.ogImage?.alt ?? ""}
            onChange={(path) =>
              setForm({
                ...form,
                seo: {
                  ...form.seo,
                  ogImage: path ? { path, alt: form.seo?.ogImage?.alt ?? "" } : null,
                },
              })
            }
            onAltChange={(alt) =>
              setForm({
                ...form,
                seo: {
                  ...form.seo,
                  ogImage: form.seo?.ogImage?.path
                    ? { path: form.seo.ogImage.path, alt }
                    : null,
                },
              })
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Sections"
        description="Hero sections use sectionType 'hero'. Reorder, enable, and edit each block."
      >
        <PageSectionEditor
          sections={form.sections ?? []}
          onChange={(sections) => setForm({ ...form, sections })}
        />
      </FormSection>

      <SubmitButton loading={loading} />
    </form>
  );
}
