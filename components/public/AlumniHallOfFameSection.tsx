import Image from "next/image";
import { ALUMNI_HALL_OF_FAME_2026 } from "@/lib/content/alumni-hall-of-fame";

export function AlumniHallOfFameSection() {
  const content = ALUMNI_HALL_OF_FAME_2026;
  const { honoree } = content;

  return (
    <section className="space-y-8 rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-8">
      <div className="space-y-4 text-center">
        <p className="font-display text-xl uppercase tracking-[0.06em] text-mountie-white sm:text-2xl">
          ‼️{content.announcement}‼️
        </p>
        <p className="text-lg leading-8 text-mountie-silver">{content.intro}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-midnight">
          <Image
            src={honoree.image.path}
            alt={honoree.image.alt}
            width={800}
            height={1000}
            className="h-auto w-full object-contain"
            sizes="(max-width: 1024px) 100vw, 400px"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-2xl leading-9 text-mountie-white">
              ⭐️{honoree.name} ({honoree.designation}) —
            </p>
            <p className="mt-2 text-lg leading-8 text-ice-blue">
              {honoree.school} | {honoree.roles}
            </p>
          </div>

          <p className="text-base leading-8 text-mountie-silver">
            {content.classMessage}
          </p>

          {content.biography.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-base leading-8 text-mountie-silver"
            >
              ⭐️ {paragraph}
            </p>
          ))}

          <p className="text-base font-semibold leading-8 text-mountie-white">
            {content.closing}
          </p>

          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue">
            {content.hashtags.join(" ")}
          </p>
        </div>
      </div>
    </section>
  );
}
