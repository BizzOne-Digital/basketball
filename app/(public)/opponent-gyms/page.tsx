import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ImageIcon } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import {
  getOpponentGymGalleries,
  gymHref,
} from "@/lib/content/opponent-gym-galleries";
import { getPublishedOpponentGyms } from "@/lib/data/opponent-gyms";

export const metadata: Metadata = {
  title: "Opponent Gym Addresses",
  description:
    "Photo galleries, addresses, and locations for Philipsburg-Osceola opponent schools.",
};

export default async function OpponentGymsPage() {
  const [galleries, dbGyms] = await Promise.all([
    getOpponentGymGalleries(),
    getPublishedOpponentGyms(),
  ]);

  const addressByName = new Map(
    dbGyms.map((gym) => [gym.schoolName, gym.address]),
  );

  return (
    <ProgramPageShell
      title="Opponent Gyms"
      description="Browse photo galleries for every opponent venue"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Opponent Gyms" },
      ]}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery, index) => {
          const cover = gallery.photos[0];
          const address = addressByName.get(gallery.name);

          return (
            <Link
              key={gallery.slug}
              href={gymHref(gallery.slug)}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20 transition-all duration-500 hover:border-ice-blue/50 hover:shadow-[0_24px_60px_-30px_rgba(125,211,252,0.4)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-midnight/60">
                {cover ? (
                  <Image
                    src={cover}
                    alt={`${gallery.name} gym`}
                    fill
                    priority={index < 6}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-mountie-silver/40">
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/10 to-transparent" />
              </div>

              <div className="space-y-3 p-6">
                <h3 className="font-display text-lg uppercase tracking-[0.08em] text-mountie-white">
                  {gallery.name}
                </h3>

                {address ? (
                  <div className="flex items-start gap-2 text-sm text-mountie-silver">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-ice-blue" />
                    <p>{address}</p>
                  </div>
                ) : null}

                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue">
                  {gallery.photos.length > 0
                    ? `View Gallery (${gallery.photos.length})`
                    : "View Gym"}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </ProgramPageShell>
  );
}
