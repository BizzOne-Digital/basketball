import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { ContactForm } from "@/components/public/ContactForm";
import { PageHero } from "@/components/public/PageHero";
import { SocialLinks } from "@/components/public/SocialLinks";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/settings";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "contact",
    "/contact",
    "Contact",
    "Get in touch with Mountie Basketball.",
  );
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    getPublishedPageByKey("contact"),
    getSiteSettings(),
  ]);

  const cmsSections =
    page?.sections.filter(
      (section) => section.enabled && section.sectionType !== "hero",
    ) ?? [];

  return (
    <>
      <PageHero
        title={page?.title ?? "Contact Us"}
        description="Reach out about programs, registration, or partnerships."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        image={page?.sections[0]?.image}
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-8">
            <div className="space-y-5 rounded-3xl border border-white/10 bg-mountie-blue/10 p-5 sm:p-8">
              <h2 className="font-display text-3xl uppercase tracking-[0.08em]">
                Get In Touch
              </h2>
              {settings.contactEmail ? (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex min-w-0 items-center gap-3 break-all text-mountie-silver hover:text-ice-blue"
                >
                  <Mail size={18} />
                  {settings.contactEmail}
                </a>
              ) : null}
              {settings.contactPhone ? (
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="flex items-center gap-3 text-mountie-silver hover:text-ice-blue"
                >
                  <Phone size={18} />
                  {settings.contactPhone}
                </a>
              ) : null}
              {settings.address ? (
                <p className="flex items-start gap-3 text-mountie-silver">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  {settings.address}
                </p>
              ) : null}
              <SocialLinks links={settings.socialLinks} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gunmetal/20 p-5 sm:p-8">
            <h2 className="mb-6 font-display text-3xl uppercase tracking-[0.08em]">
              Send A Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {cmsSections.length > 0 ? (
        <SectionRenderer sections={cmsSections} />
      ) : null}
    </>
  );
}
