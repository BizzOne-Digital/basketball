"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateSettings } from "@/lib/actions/admin/settings";
import { FormField, FormSection, SubmitButton } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type SettingsFormProps = {
  initial: {
    organizationName: string;
    headline?: string;
    tagline?: string;
    logo?: { path: string; alt?: string } | null;
    favicon?: { path: string; alt?: string } | null;
    headCoachName?: string;
    email?: string;
    phone?: string;
    address?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    twitterUrl?: string;
    footerText?: string;
    defaultSeoTitle?: string;
    defaultSeoDescription?: string;
    defaultOgImage?: { path: string; alt?: string } | null;
    announcementEnabled?: boolean;
    announcementMessage?: string;
    announcementLink?: string;
  };
};

export function SettingsForm({ initial }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    organizationName: initial.organizationName,
    headline: initial.headline ?? "",
    tagline: initial.tagline ?? "",
    logo: initial.logo ?? null,
    favicon: initial.favicon ?? null,
    headCoachName: initial.headCoachName ?? "",
    email: initial.email ?? "",
    phone: initial.phone ?? "",
    address: initial.address ?? "",
    instagramUrl: initial.instagramUrl ?? "",
    facebookUrl: initial.facebookUrl ?? "",
    twitterUrl: initial.twitterUrl ?? "",
    footerText: initial.footerText ?? "",
    defaultSeoTitle: initial.defaultSeoTitle ?? "",
    defaultSeoDescription: initial.defaultSeoDescription ?? "",
    defaultOgImage: initial.defaultOgImage ?? null,
    announcementEnabled: initial.announcementEnabled ?? false,
    announcementMessage: initial.announcementMessage ?? "",
    announcementLink: initial.announcementLink ?? "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateSettings({
      ...form,
      logo: form.logo ? { path: form.logo.path, alt: form.logo.alt ?? "" } : null,
      favicon: form.favicon ? { path: form.favicon.path, alt: form.favicon.alt ?? "" } : null,
      defaultOgImage: form.defaultOgImage
        ? { path: form.defaultOgImage.path, alt: form.defaultOgImage.alt ?? "" }
        : null,
    });
    setLoading(false);
    if (result.success) {
      toast.success("Settings saved.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <FormSection title="Site Identity">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Organization Name" name="organizationName">
            <input
              value={form.organizationName}
              onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              required
            />
          </FormField>
          <FormField label="Headline" name="headline">
            <input
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Tagline" name="tagline" className="md:col-span-2">
            <input
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <ImageUploadField
            label="Logo"
            folder="misc"
            value={form.logo?.path ?? ""}
            altValue={form.logo?.alt ?? ""}
            onChange={(path) =>
              setForm({
                ...form,
                logo: path ? { path, alt: form.logo?.alt ?? "" } : null,
              })
            }
            onAltChange={(alt) =>
              setForm({
                ...form,
                logo: form.logo?.path ? { path: form.logo.path, alt } : null,
              })
            }
          />
          <ImageUploadField
            label="Favicon"
            folder="misc"
            value={form.favicon?.path ?? ""}
            onChange={(path) =>
              setForm({ ...form, favicon: path ? { path, alt: "" } : null })
            }
          />
        </div>
      </FormSection>

      <FormSection title="Contact Information">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Head Coach Name" name="headCoachName">
            <input
              value={form.headCoachName}
              onChange={(e) => setForm({ ...form, headCoachName: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
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
          <FormField label="Address" name="address">
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection title="Social Links">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Instagram URL" name="instagramUrl">
            <input
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Facebook URL" name="facebookUrl">
            <input
              value={form.facebookUrl}
              onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="X / Twitter URL" name="twitterUrl" className="md:col-span-2">
            <input
              value={form.twitterUrl}
              onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection title="Footer & SEO Defaults">
        <div className="grid gap-4">
          <FormField label="Footer Text" name="footerText">
            <textarea
              rows={3}
              value={form.footerText}
              onChange={(e) => setForm({ ...form, footerText: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Default SEO Title" name="defaultSeoTitle">
            <input
              value={form.defaultSeoTitle}
              onChange={(e) => setForm({ ...form, defaultSeoTitle: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Default SEO Description" name="defaultSeoDescription">
            <textarea
              rows={2}
              value={form.defaultSeoDescription}
              onChange={(e) => setForm({ ...form, defaultSeoDescription: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <ImageUploadField
            label="Default OG Image"
            folder="misc"
            value={form.defaultOgImage?.path ?? ""}
            onChange={(path) =>
              setForm({ ...form, defaultOgImage: path ? { path, alt: "" } : null })
            }
          />
        </div>
      </FormSection>

      <FormSection title="Announcement Bar">
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.announcementEnabled}
            onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })}
          />
          Enable announcement bar
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Message" name="announcementMessage" className="md:col-span-2">
            <input
              value={form.announcementMessage}
              onChange={(e) => setForm({ ...form, announcementMessage: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Link URL" name="announcementLink" className="md:col-span-2">
            <input
              value={form.announcementLink}
              onChange={(e) => setForm({ ...form, announcementLink: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </FormField>
        </div>
      </FormSection>

      <SubmitButton loading={loading} />
    </form>
  );
}
