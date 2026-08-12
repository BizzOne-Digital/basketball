"use client";

import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import type { PageSection } from "@/types";
import type { UploadFolder } from "@/lib/uploads/constants";
import { cn } from "@/lib/utils/cn";
import { FormField } from "./FormField";
import { ImageUploadField } from "./ImageUploadField";
import { RichTextEditor } from "./RichTextEditor";

type PageSectionEditorProps = {
  sections: PageSection[];
  onChange: (sections: PageSection[]) => void;
  uploadFolder?: UploadFolder;
};

export function PageSectionEditor({
  sections,
  onChange,
  uploadFolder = "pages",
}: PageSectionEditorProps) {
  const updateSection = (index: number, patch: Partial<PageSection>) => {
    const next = sections.map((section, i) =>
      i === index ? { ...section, ...patch } : section
    );
    onChange(next);
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next.map((s, i) => ({ ...s, order: i })));
  };

  const toggleEnabled = (index: number) => {
    updateSection(index, { enabled: !sections[index].enabled });
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={cn(
            "rounded-xl border bg-white p-5 shadow-sm",
            section.enabled
              ? "border-[#B7C0CC]/40"
              : "border-dashed border-[#B7C0CC]/30 opacity-70"
          )}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#5BB9FF]">
                {section.sectionType}
              </p>
              <h3 className="font-semibold text-[#04101F]">
                {section.heading || section.sectionType || `Section ${index + 1}`}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleEnabled(index)}
                className="rounded-lg border border-[#B7C0CC]/40 p-2 hover:bg-[#F7F9FC]"
                title={section.enabled ? "Disable section" : "Enable section"}
              >
                {section.enabled ? (
                  <Eye className="h-4 w-4 text-[#0B2F63]" />
                ) : (
                  <EyeOff className="h-4 w-4 text-[#B7C0CC]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => moveSection(index, "up")}
                disabled={index === 0}
                className="rounded-lg border border-[#B7C0CC]/40 p-2 hover:bg-[#F7F9FC] disabled:opacity-40"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveSection(index, "down")}
                disabled={index === sections.length - 1}
                className="rounded-lg border border-[#B7C0CC]/40 p-2 hover:bg-[#F7F9FC] disabled:opacity-40"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Heading" name={`heading-${section.id}`}>
              <input
                value={section.heading ?? ""}
                onChange={(e) => updateSection(index, { heading: e.target.value })}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
              />
            </FormField>
            <FormField label="Eyebrow" name={`eyebrow-${section.id}`}>
              <input
                value={section.eyebrow ?? ""}
                onChange={(e) => updateSection(index, { eyebrow: e.target.value })}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
              />
            </FormField>
            <div className="md:col-span-2">
              <RichTextEditor
                label="Body"
                value={section.body ?? ""}
                onChange={(body) => updateSection(index, { body })}
              />
            </div>
            <ImageUploadField
              label="Section Image"
              folder={uploadFolder}
              value={section.image?.path ?? ""}
              altValue={section.imageAlt ?? section.image?.alt ?? ""}
              onChange={(path) =>
                updateSection(index, {
                  image: path ? { path, alt: section.imageAlt ?? "" } : undefined,
                })
              }
              onAltChange={(alt) =>
                updateSection(index, {
                  imageAlt: alt,
                  image: section.image?.path
                    ? { ...section.image, path: section.image.path, alt }
                    : undefined,
                })
              }
            />
            <FormField label="Layout Variant" name={`layout-${section.id}`}>
              <input
                value={section.layoutVariant ?? ""}
                onChange={(e) => updateSection(index, { layoutVariant: e.target.value })}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
              />
            </FormField>
            <FormField label="CTA Label" name={`ctaLabel-${section.id}`}>
              <input
                value={section.ctaLabel ?? ""}
                onChange={(e) => updateSection(index, { ctaLabel: e.target.value })}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
              />
            </FormField>
            <FormField label="CTA URL" name={`ctaUrl-${section.id}`}>
              <input
                value={section.ctaUrl ?? ""}
                onChange={(e) => updateSection(index, { ctaUrl: e.target.value })}
                className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
              />
            </FormField>
          </div>
        </div>
      ))}
    </div>
  );
}
