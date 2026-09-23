"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import { createService, updateService } from "@/lib/actions/admin/services";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { PageSectionEditor } from "@/components/admin/PageSectionEditor";
import type { PageSection } from "@/types";

type ServiceFormProps = {
  mode: "create" | "edit";
  serviceId?: string;
  initial?: {
    title: string;
    slug: string;
    cardDescription?: string;
    cardImage?: { path: string; alt?: string } | null;
    cardCtaLabel?: string;
    status: "draft" | "published";
    order?: number;
    seo?: { title?: string; description?: string };
    hero?: PageSection;
    intro?: string;
    detailSections?: PageSection[];
    benefitsText?: string;
    audienceDescription?: string;
    scheduleDescription?: string;
    whatToBringText?: string;
  };
};

const defaultHero = (): PageSection => ({
  id: "hero",
  sectionType: "hero",
  heading: "",
  body: "",
  order: 0,
  enabled: true,
});

export function ServiceForm({ mode, serviceId, initial }: ServiceFormProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"card" | "detail">("card");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    cardDescription: initial?.cardDescription ?? "",
    cardImage: initial?.cardImage ?? null,
    cardCtaLabel: initial?.cardCtaLabel ?? "",
    status: initial?.status ?? ("draft" as "draft" | "published"),
    order: initial?.order ?? 0,
    seoTitle: initial?.seo?.title ?? "",
    seoDescription: initial?.seo?.description ?? "",
    hero: initial?.hero ?? defaultHero(),
    intro: initial?.intro ?? "",
    detailSections: (initial?.detailSections ?? []) as PageSection[],
    benefitsText: initial?.benefitsText ?? "",
    audienceDescription: initial?.audienceDescription ?? "",
    scheduleDescription: initial?.scheduleDescription ?? "",
    whatToBringText: initial?.whatToBringText ?? "",
  });

  const parseBenefits = () =>
    form.benefitsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, description] = line.split("|");
        return { title: title.trim(), description: description?.trim() };
      });

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      title: form.title,
      slug: form.slug,
      cardDescription: form.cardDescription,
      cardImage: form.cardImage
        ? { path: form.cardImage.path, alt: form.cardImage.alt ?? "" }
        : null,
      cardCtaLabel: form.cardCtaLabel,
      status: form.status,
      order: form.order,
      detail: {
        seo: { title: form.seoTitle, description: form.seoDescription },
        hero: form.hero,
        intro: form.intro,
        detailSections: form.detailSections.map((s, i) => ({ ...s, order: i })),
        benefits: parseBenefits(),
        audienceDescription: form.audienceDescription,
        scheduleDescription: form.scheduleDescription,
        whatToBring: form.whatToBringText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      },
    };

    const result =
      mode === "create"
        ? await createService(payload)
        : await updateService({ ...payload, id: serviceId! });

    setLoading(false);

    if (result.success) {
      toast.success(mode === "create" ? "Service created." : "Service saved.");
      if (mode === "create" && result.data?.id) {
        router.push(`/admin/services/${result.data.id}`);
      } else {
        router.refresh();
      }
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
      <div className="flex gap-2 border-b border-[#B7C0CC]/30">
        {(["card", "detail"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 text-sm font-medium capitalize",
              tab === t
                ? "border-b-2 border-[#5BB9FF] text-[#0B2F63]"
                : "text-[#B7C0CC]"
            )}
          >
            {t === "card" ? "Card / Listing" : "Detail Page"}
          </button>
        ))}
      </div>

      {tab === "card" && (
        <FormSection title="Card Information">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Program Title" name="title">
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
            <FormField label="Card Description" name="cardDescription" className="md:col-span-2">
              <textarea
                rows={3}
                value={form.cardDescription}
                onChange={(e) => setForm({ ...form, cardDescription: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </FormField>
            <ImageUploadField
              label="Card Image"
              folder="misc"
              value={form.cardImage?.path ?? ""}
              altValue={form.cardImage?.alt ?? ""}
              onChange={(path) =>
                setForm({
                  ...form,
                  cardImage: path ? { path, alt: form.cardImage?.alt ?? "" } : null,
                })
              }
              onAltChange={(alt) =>
                setForm({
                  ...form,
                  cardImage: form.cardImage?.path
                    ? { path: form.cardImage.path, alt }
                    : null,
                })
              }
            />
            <FormField label="Card CTA Label" name="cardCtaLabel">
              <input
                value={form.cardCtaLabel}
                onChange={(e) => setForm({ ...form, cardCtaLabel: e.target.value })}
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
        </FormSection>
      )}

      {tab === "detail" && (
        <>
          <FormSection title="SEO">
            <div className="grid gap-4">
              <FormField label="SEO Title" name="seoTitle">
                <input
                  value={form.seoTitle}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
              <FormField label="SEO Description" name="seoDescription">
                <textarea
                  rows={2}
                  value={form.seoDescription}
                  onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
            </div>
          </FormSection>
          <FormSection title="Detail Hero Section">
            <PageSectionEditor
              sections={[form.hero]}
              onChange={([hero]) => setForm({ ...form, hero: hero ?? defaultHero() })}
              uploadFolder="misc"
            />
          </FormSection>
          <FormSection title="Introduction">
            <RichTextEditor
              value={form.intro}
              onChange={(intro) => setForm({ ...form, intro })}
            />
          </FormSection>
          <FormSection title="Detail Sections">
            <PageSectionEditor
              sections={form.detailSections}
              onChange={(detailSections) => setForm({ ...form, detailSections })}
              uploadFolder="misc"
            />
          </FormSection>
          <FormSection title="Additional Info">
            <div className="grid gap-4">
              <FormField label="Benefits (title|description per line)" name="benefits">
                <textarea
                  rows={4}
                  value={form.benefitsText}
                  onChange={(e) => setForm({ ...form, benefitsText: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
              <FormField label="Audience" name="audience">
                <textarea
                  rows={3}
                  value={form.audienceDescription}
                  onChange={(e) => setForm({ ...form, audienceDescription: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
              <FormField label="Schedule" name="schedule">
                <textarea
                  rows={3}
                  value={form.scheduleDescription}
                  onChange={(e) => setForm({ ...form, scheduleDescription: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
              <FormField label="What to Bring (one per line)" name="whatToBring">
                <textarea
                  rows={3}
                  value={form.whatToBringText}
                  onChange={(e) => setForm({ ...form, whatToBringText: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </FormField>
            </div>
          </FormSection>
        </>
      )}

      <SubmitButton loading={loading} label={mode === "create" ? "Create Service" : "Save Service"} />
    </form>
  );
}
