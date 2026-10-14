import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { Alumni1976ChampionshipSection } from "@/components/public/Alumni1976ChampionshipSection";
import { AlumniHallOfFameSection } from "@/components/public/AlumniHallOfFameSection";
import { getPublishedAlumniSpotlights, getFeaturedAlumni } from "@/lib/data/alumni";
import { ALUMNI_CONTENT } from "@/lib/content/mountie-program";
import { PLACEHOLDERS, resolveImagePath } from "@/lib/images";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Philipsburg-Osceola Mountaineer Basketball alumni and program history.",
};

export default async function AlumniPage() {
  const [alumni, featured] = await Promise.all([
    getPublishedAlumniSpotlights(),
    getFeaturedAlumni(),
  ]);

  return (
    <ProgramPageShell
      title="Alumni"
      description={ALUMNI_CONTENT.headline}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Alumni" }]}
    >
      <div className="space-y-16">
        <Alumni1976ChampionshipSection />

        <AlumniHallOfFameSection />

        {/* Alumni Spotlight */}
        <section className="grid gap-10 rounded-2xl border border-white/10 bg-gunmetal/20 p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">
              Alumni Spotlight
            </p>
            <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-mountie-white">
              {ALUMNI_CONTENT.spotlight.name}
            </h3>
            <p className="mt-6 text-lg leading-8 text-mountie-silver">
              {ALUMNI_CONTENT.spotlight.note}
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={ALUMNI_CONTENT.spotlight.image}
              alt={`${ALUMNI_CONTENT.spotlight.name} — Mountie Basketball alumni tribute`}
              fill
              className="object-contain bg-midnight"
              priority
            />
          </div>
        </section>

        {/* Featured Alumni from CMS */}
        {featured && featured.name !== ALUMNI_CONTENT.spotlight.name ? (
          <section className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={
                  featured.photo
                    ? resolveImagePath(featured.photo, PLACEHOLDERS.avatar)
                    : PLACEHOLDERS.avatar
                }
                alt={featured.photo?.alt ?? featured.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">
                Featured Alumni
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-mountie-white">
                {featured.name}
              </h3>
              <p className="mt-1 text-sm text-mountie-silver">
                Class of {featured.graduationYear}
                {featured.position ? ` • ${featured.position}` : ""}
              </p>
              {featured.bio ? (
                <p className="mt-6 text-lg leading-8 text-mountie-silver">
                  {featured.bio}
                </p>
              ) : null}
              {featured.achievements && featured.achievements.length > 0 ? (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-ice-blue">
                    Achievements
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {featured.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-sm leading-7 text-mountie-silver"
                      >
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* All Alumni Grid */}
        {alumni.length > 1 ? (
          <section>
            <h2 className="mb-8 font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
              All Alumni Spotlights
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {alumni.map((alum) => (
                <div
                  key={alum.slug}
                  className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6 text-center"
                >
                  <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-ice-blue/30">
                    <Image
                      src={
                        alum.photo
                          ? resolveImagePath(alum.photo, PLACEHOLDERS.avatar)
                          : PLACEHOLDERS.avatar
                      }
                      alt={alum.photo?.alt ?? alum.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                    {alum.name}
                  </h3>
                  <p className="mt-1 text-sm text-ice-blue">
                    Class of {alum.graduationYear}
                  </p>
                  {alum.position ? (
                    <p className="mt-1 text-xs uppercase tracking-wider text-mountie-silver">
                      {alum.position}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Alumni Sections */}
        <section className="space-y-12">
          <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
            Alumni Sections
          </h2>
          {ALUMNI_CONTENT.sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-4 font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                {section.title}
              </h3>
              {section.images.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {section.images.map((photo) => (
                    <figure
                      key={photo.path}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={photo.path}
                          alt={photo.alt}
                          fill
                          className="object-contain bg-midnight"
                        />
                      </div>
                      <figcaption className="border-t border-white/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue">
                        {photo.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-7 text-mountie-silver">
                  Content coming soon.
                </p>
              )}
            </div>
          ))}
        </section>
      </div>
    </ProgramPageShell>
  );
}
