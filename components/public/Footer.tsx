import Link from "next/link";
import { Logo } from "@/components/public/Logo";
import { SocialLinks } from "@/components/public/SocialLinks";
import { FOOTER_LINK_GROUPS } from "@/lib/navigation";
import type { SiteSettingsDocument } from "@/types";

interface FooterProps {
  settings: SiteSettingsDocument;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="w-full overflow-x-clip border-t border-white/10 bg-midnight grain-overlay">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-6">
            <Logo
              logo={settings.logo}
              organizationName={settings.organizationName}
            />
            <p className="max-w-md text-sm leading-7 text-mountie-silver">
              {settings.footerText ??
                settings.tagline ??
                "Elite youth basketball development for Philipsburg-Osceola athletes."}
            </p>
            <SocialLinks links={settings.socialLinks} />
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 font-display text-sm uppercase tracking-[0.18em] text-ice-blue">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-mountie-silver transition-colors hover:text-mountie-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-mountie-silver md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            {settings.contactEmail ? (
              <p>
                Email:{" "}
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="break-all hover:text-ice-blue"
                >
                  {settings.contactEmail}
                </a>
              </p>
            ) : null}
            {settings.contactPhone ? (
              <p>
                Phone:{" "}
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="hover:text-ice-blue"
                >
                  {settings.contactPhone}
                </a>
              </p>
            ) : null}
            {settings.address ? <p>{settings.address}</p> : null}
          </div>
          <p>
            © {new Date().getFullYear()} {settings.organizationName}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
