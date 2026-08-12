import type { Metadata } from "next";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { EmptyState } from "@/components/public/EmptyState";
import { PageHero } from "@/components/public/PageHero";
import { TeamMemberCard } from "@/components/public/TeamMemberCard";
import { getPublishedPageByKey } from "@/lib/data/pages";
import { getPublishedTeamMembers } from "@/lib/data/team";
import { getPublicPageMetadata } from "@/lib/seo/page";

export async function generateMetadata(): Promise<Metadata> {
  return getPublicPageMetadata(
    "team",
    "/team",
    "Team",
    "Meet the Mountie Basketball coaching staff.",
  );
}

export default async function TeamPage() {
  const [page, members] = await Promise.all([
    getPublishedPageByKey("team"),
    getPublishedTeamMembers(),
  ]);

  const cmsSections =
    page?.sections.filter(
      (section) => section.enabled && section.sectionType !== "hero",
    ) ?? [];

  const teamGridClass =
    members.length === 1
      ? "mx-auto grid max-w-md grid-cols-1 gap-6"
      : members.length === 2
        ? "mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
        : "grid gap-6 md:grid-cols-2 xl:grid-cols-3";

  return (
    <>
      <PageHero
        title={page?.title ?? "Coaching Staff"}
        description="Experienced coaches committed to player development and competitive excellence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Team" },
        ]}
        image={page?.sections[0]?.image}
      />

      <section className="py-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {members.length > 0 ? (
            <div className={teamGridClass}>
              {members.map((member) => (
                <TeamMemberCard key={member.slug} member={member} />
              ))}
            </div>
          ) : (
            <EmptyState title="Team Profiles Coming Soon" />
          )}
        </div>
      </section>

      {cmsSections.length > 0 ? (
        <SectionRenderer sections={cmsSections} />
      ) : null}
    </>
  );
}
