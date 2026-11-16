import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getContent } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Mountie College Players",
  description:
    "Philipsburg-Osceola Mountie Basketball players who have earned a spot on college basketball rosters.",
};

export default async function MountieCollegePlayersPage() {
  const content = await getContent("college-players");

  return (
    <ProgramPageShell
      title={content.title}
      description={content.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: content.title },
      ]}
    >
      <div className="space-y-16">
        {content.intro ? (
          <p className="max-w-3xl text-lg leading-8 text-mountie-silver">
            {content.intro}
          </p>
        ) : null}

        {content.classes.map((group) => (
          <section key={group.label} className="space-y-8">
            <SectionHeading eyebrow="Mountie College Players" title={group.label} />

            <div className="space-y-10">
              {group.players.map((player) => (
                <article
                  key={player.name}
                  className="grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/20 p-6 md:grid-cols-[minmax(0,380px)_1fr] md:p-8"
                >
                  {player.image ? (
                    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={player.image}
                        alt={player.imageAlt || player.name}
                        width={1024}
                        height={1536}
                        sizes="(min-width: 768px) 380px, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-col justify-center gap-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-ice-blue">
                      {player.headline}
                    </p>
                    <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-mountie-white sm:text-4xl">
                      {player.name}
                    </h2>
                    <p className="text-sm uppercase tracking-[0.14em] text-mountie-silver">
                      {player.highSchoolClass} &middot; {player.college}
                    </p>
                    <p className="leading-8 text-mountie-silver">{player.body}</p>
                    {player.closing ? (
                      <p className="leading-8 text-mountie-white">{player.closing}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ProgramPageShell>
  );
}
