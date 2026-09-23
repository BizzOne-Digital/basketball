import { getSettings } from "@/lib/actions/admin/settings";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">Settings</h1>
        <p className="mt-1 text-[#343A40]">
          Global site identity, contact info, and SEO defaults.
        </p>
      </div>
      <SettingsForm
        initial={{
          organizationName: settings?.organizationName ?? "Philipsburg-Osceola Mountie Basketball",
          headline: settings?.headline,
          tagline: settings?.tagline,
          logo: settings?.logo,
          favicon: settings?.favicon,
          headCoachName: settings?.coach?.name,
          email: settings?.contactEmail ?? settings?.coach?.email,
          phone: settings?.contactPhone ?? settings?.coach?.phone,
          address: settings?.address,
          instagramUrl: settings?.socialLinks?.instagram,
          facebookUrl: settings?.socialLinks?.facebook,
          twitterUrl: settings?.socialLinks?.twitter,
          footerText: settings?.footerText,
          defaultSeoTitle: settings?.defaultSeo?.title,
          defaultSeoDescription: settings?.defaultSeo?.description,
          defaultOgImage: settings?.defaultSeo?.ogImage,
          announcementEnabled: settings?.announcementBar?.enabled,
          announcementMessage: settings?.announcementBar?.message,
          announcementLink: settings?.announcementBar?.linkUrl,
        }}
      />
    </div>
  );
}
