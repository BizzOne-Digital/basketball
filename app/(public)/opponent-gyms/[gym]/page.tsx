import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import {
  getOpponentGymGalleries,
  getOpponentGymGallery,
  toGalleryImages,
} from "@/lib/content/opponent-gym-galleries";
import { getPublishedOpponentGyms } from "@/lib/data/opponent-gyms";

interface GymDetailPageProps {
  params: Promise<{ gym: string }>;
}

export async function generateStaticParams() {
  const galleries = await getOpponentGymGalleries();
  return galleries.map((gallery) => ({ gym: gallery.slug }));
}

export async function generateMetadata({
  params,
}: GymDetailPageProps): Promise<Metadata> {
  const { gym: slug } = await params;
  const gallery = await getOpponentGymGallery(slug);

  if (!gallery) {
    return { title: "Gym Not Found" };
  }

  return {
    title: `${gallery.name} Gym`,
    description: `Photos of the ${gallery.name} gym — an opponent venue for Philipsburg-Osceola Mountaineer Basketball.`,
  };
}

export default async function GymDetailPage({ params }: GymDetailPageProps) {
  const { gym: slug } = await params;
  const gallery = await getOpponentGymGallery(slug);

  if (!gallery) {
    notFound();
  }

  const dbGyms = await getPublishedOpponentGyms();
  const details = dbGyms.find((entry) => entry.schoolName === gallery.name);
  const images = toGalleryImages(gallery);

  return (
    <ProgramPageShell
      title={gallery.name}
      description="Opponent gym photos"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Opponent Gyms", href: "/opponent-gyms" },
        { label: gallery.name },
      ]}
    >
      <Link
        href="/opponent-gyms"
        className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue hover:text-mountie-white"
      >
        <ArrowLeft size={14} />
        All Opponent Gyms
      </Link>

      {details ? (
        <div className="mb-10 space-y-3 rounded-2xl border border-white/10 bg-gunmetal/20 p-6">
          <div className="flex items-start gap-2 text-mountie-silver">
            <MapPin size={18} className="mt-0.5 shrink-0 text-ice-blue" />
            <p>{details.address}</p>
          </div>
          {details.websiteUrl ? (
            <Link
              href={details.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-ice-blue hover:underline"
            >
              Visit Website
              <ExternalLink size={12} />
            </Link>
          ) : null}
        </div>
      ) : null}

      {images.length > 0 ? (
        <GalleryGrid images={images} columns={3} />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-gunmetal/20 p-12 text-center">
          <p className="text-lg text-mountie-silver">
            Photos for this gym will be added soon.
          </p>
        </div>
      )}
    </ProgramPageShell>
  );
}
