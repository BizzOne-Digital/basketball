import type { ImageObject } from "@/types";

export const PLACEHOLDERS = {
  hero: "/images/hero-background.png",
  court: "/images/placeholders/court.svg",
  team: "/images/placeholders/team.svg",
  gallery: "/images/placeholders/gallery.svg",
  product: "/images/placeholders/product.svg",
  news: "/images/placeholders/news.svg",
  service: "/images/placeholders/service.svg",
} as const;

export type PlaceholderKey = keyof typeof PLACEHOLDERS;

export const DEFAULT_LOGO = "/images/mountie-logo.png";
export const HOME_INTRO_IMAGE = "/images/home-intro.png";

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
