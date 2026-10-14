import type { ImageObject } from "@/types";

export const SITE_IMAGES = {
  programs: ["/images/Programs-1.png", "/images/Programs-2.png"] as const,
  gallery: [
    "/images/gallery-1.png",
    "/images/gallery-2.png",
    "/images/gallery-3.png",
    "/images/gallery-4.png",
    "/images/gallery-5.png",
    "/images/gallery-6.png",
    "/images/gallery-7.png",
    "/images/gallery-8.png",
    "/images/gallery-9.png",
  ] as const,
  shop: ["/images/shop-1.png", "/images/shop-2.png"] as const,
  blog: ["/images/Blog-1.png", "/images/Blog-2.png"] as const,
  team: ["/images/Team.png", "/images/Team-2.png", "/images/Team-3.png"] as const,
} as const;

export const DEFAULT_LOGO = "/images/mountie-logo.png";
export const HOME_INTRO_IMAGE = "/images/home-intro.png";

export const PLACEHOLDERS = {
  hero: "/images/hero-background.png",
  court: SITE_IMAGES.programs[1],
  team: SITE_IMAGES.team[0],
  gallery: SITE_IMAGES.gallery[0],
  product: SITE_IMAGES.shop[0],
  news: SITE_IMAGES.blog[0],
  service: SITE_IMAGES.programs[0],
  avatar: SITE_IMAGES.team[0], // Default avatar for players/coaches
  logo: DEFAULT_LOGO, // Default logo for schools/sponsors
} as const;

export type PlaceholderKey = keyof typeof PLACEHOLDERS;

export function imageObject(path: string, alt: string): ImageObject {
  return { path, alt };
}

export function resolveImagePath(
  image?: ImageObject | null,
  fallback: string = PLACEHOLDERS.hero,
): string {
  if (!image?.path) {
    return fallback;
  }

  const normalized = image.path.startsWith("/")
    ? image.path
    : `/${image.path}`;

  if (
    normalized.startsWith("/uploads/") ||
    normalized.includes("/images/placeholders/")
  ) {
    return fallback;
  }

  return normalized;
}

export function resolveProgramImage(service: {
  slug: string;
  cardImage?: ImageObject | null;
  hero?: { image?: ImageObject | null } | null;
}): string {
  const slugFallback: Record<string, string> = {
    "annual-youth-basketball-camp": SITE_IMAGES.programs[0],
    "youth-basketball-training-and-development": SITE_IMAGES.programs[1],
  };

  const fallback = slugFallback[service.slug] ?? SITE_IMAGES.programs[0];
  const image = service.hero?.image ?? service.cardImage;
  return resolveImagePath(image, fallback);
}

export function resolveProgramCardImage(service: {
  slug: string;
  cardImage?: ImageObject | null;
}): string {
  const slugFallback: Record<string, string> = {
    "annual-youth-basketball-camp": SITE_IMAGES.programs[0],
    "youth-basketball-training-and-development": SITE_IMAGES.programs[1],
  };

  return resolveImagePath(
    service.cardImage,
    slugFallback[service.slug] ?? SITE_IMAGES.programs[0],
  );
}

export function resolveNewsImage(post: {
  slug: string;
  coverImage?: ImageObject | null;
}): string {
  const slugFallback: Record<string, string> = {
    "welcome-to-mountie-basketball": SITE_IMAGES.blog[0],
    "youth-camp-information": SITE_IMAGES.blog[1],
  };

  return resolveImagePath(post.coverImage, slugFallback[post.slug] ?? SITE_IMAGES.blog[0]);
}

export function getGalleryImageByIndex(index: number): string {
  const images = SITE_IMAGES.gallery;
  return images[((index % images.length) + images.length) % images.length];
}

export function galleryImageObject(index: number, alt?: string): ImageObject {
  return imageObject(
    getGalleryImageByIndex(index),
    alt ?? `Mountie Basketball gallery photo ${index + 1}`,
  );
}

export function resolveGalleryImage(
  item: { slug: string; image?: ImageObject | null },
  index = 0,
): string {
  return resolveImagePath(item.image, getGalleryImageByIndex(index));
}

export function resolveGalleryHeroImage(image?: ImageObject | null): string {
  return resolveImagePath(image, SITE_IMAGES.gallery[0]);
}

export function resolveProductImage(product: {
  slug: string;
  images?: ImageObject[] | null;
}): string {
  const slugFallback: Record<string, string> = {
    "mountie-practice-tee": SITE_IMAGES.shop[0],
    "mountie-hoodie": SITE_IMAGES.shop[1],
  };

  const image = product.images?.[0];
  return resolveImagePath(image, slugFallback[product.slug] ?? SITE_IMAGES.shop[0]);
}

export function resolveTeamMemberImage(member: {
  slug: string;
  photo?: ImageObject | null;
}): string {
  const slugFallback: Record<string, string> = {
    "tj-anderson": SITE_IMAGES.team[0],
    "mountie-staff-2": SITE_IMAGES.team[1],
    "mountie-staff-3": SITE_IMAGES.team[2],
  };

  return resolveImagePath(
    member.photo,
    slugFallback[member.slug] ?? SITE_IMAGES.team[0],
  );
}

export function resolveSectionImage(section: {
  id: string;
  image?: ImageObject | null;
}): string {
  const sectionFallback: Record<string, string> = {
    "home-intro": HOME_INTRO_IMAGE,
    "team-philosophy": SITE_IMAGES.team[1],
  };

  return resolveImagePath(
    section.image,
    sectionFallback[section.id] ?? PLACEHOLDERS.court,
  );
}

export function resolveImageAlt(
  image?: ImageObject | null,
  fallback = "Mountie Basketball",
): string {
  return image?.alt?.trim() || fallback;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents);
}

export function formatDate(date?: Date | string | null): string {
  if (!date) {
    return "";
  }

  const value = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);
}
