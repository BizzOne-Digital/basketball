"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createNewsPost, updateNewsPost } from "@/lib/actions/admin/news";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type NewsFormProps = {
  mode: "create" | "edit";
  postId?: string;
  initial?: {
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: { path: string; alt?: string } | null;
    authorName?: string;
    tags?: string[];
    content?: string;
    seoTitle?: string;
    seoDescription?: string;
    status: "draft" | "published";
    publishedAt?: string;
  };
};

export function NewsForm({ mode, postId, initial }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    coverImage: initial?.coverImage ?? null,
    authorName: initial?.authorName ?? "",
    tagsText: (initial?.tags ?? []).join(", "),
    content: initial?.content ?? "",
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
    status: initial?.status ?? ("draft" as "draft" | "published"),
    publishedAt: initial?.publishedAt?.slice(0, 10) ?? "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      coverImage: form.coverImage
        ? { path: form.coverImage.path, alt: form.coverImage.alt ?? "" }
        : null,
      authorName: form.authorName,
      tags: form.tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      content: form.content,
      seo: { title: form.seoTitle, description: form.seoDescription },
      status: form.status,
      publishedAt: form.publishedAt || null,
    };

    const result =
      mode === "create"
        ? await createNewsPost(payload)
        : await updateNewsPost(postId!, payload);

    setLoading(false);
    if (result.success) {
      toast.success(mode === "create" ? "Post created." : "Post saved.");
      if (mode === "create" && result.data?.id) {
        router.push(`/admin/news/${result.data.id}`);
      } else {
        router.refresh();
      }
    } else {
      toast.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <FormSection title="Post Details">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Title" name="title">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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
          <FormField label="Author" name="authorName">
            <input
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Publish Date" name="publishedAt">
            <input
              type="date"
              value={form.publishedAt}
              onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Tags (comma separated)" name="tags" className="md:col-span-2">
            <input
              value={form.tagsText}
              onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Excerpt" name="excerpt" className="md:col-span-2">
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <ImageUploadField
            label="Cover Image"
            folder="misc"
            value={form.coverImage?.path ?? ""}
            altValue={form.coverImage?.alt ?? ""}
            onChange={(path) =>
              setForm({
                ...form,
                coverImage: path ? { path, alt: form.coverImage?.alt ?? "" } : null,
              })
            }
            onAltChange={(alt) =>
              setForm({
                ...form,
                coverImage: form.coverImage?.path
                  ? { path: form.coverImage.path, alt }
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
      </FormSection>

      <FormSection title="Article Content">
        <RichTextEditor
          value={form.content}
          onChange={(content) => setForm({ ...form, content })}
          rows={16}
        />
      </FormSection>

      <SubmitButton loading={loading} label={mode === "create" ? "Create Post" : "Save Post"} />
    </form>
  );
}
