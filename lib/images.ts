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

export const PLACEHOLDERS = {
  hero: "/images/hero-background.png",
  court: SITE_IMAGES.programs[1],
  team: SITE_IMAGES.team[0],
  gallery: SITE_IMAGES.gallery[0],
  product: SITE_IMAGES.shop[0],
  news: SITE_IMAGES.blog[0],
  service: SITE_IMAGES.programs[0],
} as const;

export type PlaceholderKey = keyof typeof PLACEHOLDERS;

export const DEFAULT_LOGO = "/images/mountie-logo.png";
export const HOME_INTRO_IMAGE = "/images/home-intro.png";

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

  if (normalized.startsWith("/uploads/")) {
    return fallback;
  }

  return normalized;
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
