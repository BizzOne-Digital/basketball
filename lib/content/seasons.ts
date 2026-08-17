import { getGalleryImageByIndex, SITE_IMAGES } from "@/lib/images";
import type { GalleryImageDocument } from "@/types";

export interface Season {
  slug: string;
  label: string;
  years: string;
  description: string;
  image: string;
  current?: boolean;
}

export const SEASONS: Season[] = [
  {
    slug: "2020-21",
    label: "2020-2021 Season",
    years: "2020 – 2021",
    description:
      "Coach Anderson's first season leading the Mountaineers. Meet the roster and revisit the team photos that started this era of Mountie basketball.",
    image: SITE_IMAGES.gallery[0],
  },
  {
    slug: "2021-22",
    label: "2021-2022 Season",
    years: "2021 – 2022",
    description:
      "A young Mountie squad built on fundamentals and effort. View the full roster, class by class, along with team and game photos.",
    image: SITE_IMAGES.gallery[1],
  },
  {
    slug: "2022-23",
    label: "2022-2023 Season",
    years: "2022 – 2023",
    description:
      "Continued development across every class year as the program grew its identity of Attitude, Commitment, and Class.",
    image: SITE_IMAGES.gallery[2],
  },
  {
    slug: "2023-24",
    label: "2023-2024 Season",
    years: "2023 – 2024",
    description:
      "Mountain League competition, a deeper varsity rotation, and another step forward for Philipsburg-Osceola basketball.",
    image: SITE_IMAGES.team[1],
  },
  {
    slug: "2024-25",
    label: "2024-2025 Season",
    years: "2024 – 2025",
    description:
      "Returning starters and rising underclassmen set the tone. Browse the roster and season team pictures.",
    image: SITE_IMAGES.team[2],
  },
  {
    slug: "2025-26",
    label: "2025-2026 Season",
    years: "2025 – 2026",
    description:
      "Our current varsity roster — seniors, juniors, sophomores, and freshmen representing the Mountie tradition on the floor.",
    image: SITE_IMAGES.team[0],
    current: true,
  },
];

export const DEFAULT_SEASON = "2025-26";

// Real photo sets provided by the program, keyed by season slug. Seasons not
// listed here fall back to the shared gallery pool.
const SEASON_PHOTOS: Record<string, string[]> = {
  "2023-24": Array.from(
    { length: 12 },
    (_, index) =>
      `/images/roster/2023-24/photo-${String(index + 1).padStart(2, "0")}.png`,
  ),
};

const SEASON_GAME_ACTIONS: Record<string, string[]> = {
  "2020-21": Array.from(
    { length: 11 },
    (_, index) =>
      `/images/roster/2020-21/game-actions/action-${String(index + 1).padStart(2, "0")}.png`,
  ),
  "2025-26": Array.from(
    { length: 9 },
    (_, index) =>
      `/images/roster/2025-26/game-actions/action-${String(index + 1).padStart(2, "0")}.png`,
  ),
};

const SEASON_COACHING_PHOTOS: Record<string, string> = {
  "2025-26": "/images/roster/2025-26/coaching-staff.png",
};

export function seasonHref(slug: string): string {
  return `/meet-the-mounties/${slug}`;
}

export function getSeason(slug?: string): Season | undefined {
  if (!slug) {
    return undefined;
  }

  return SEASONS.find((season) => season.slug === slug);
}

export function getSeasonNeighbours(slug: string): {
  previous?: Season;
  next?: Season;
} {
  const index = SEASONS.findIndex((season) => season.slug === slug);

  if (index < 0) {
    return {};
  }

  return {
    previous: SEASONS[index - 1],
    next: SEASONS[index + 1],
  };
}

// Season photo sets are offset per season so each gallery leads with a
// different image while the shared pool repeats.
export function getSeasonPhotos(
  slug: string,
  count = 9,
): GalleryImageDocument[] {
  const index = SEASONS.findIndex((season) => season.slug === slug);
  const season = index < 0 ? undefined : SEASONS[index];

  const realPhotos = SEASON_PHOTOS[slug];
  if (realPhotos && realPhotos.length > 0) {
    return realPhotos.map((path, position) => ({
      slug: `${slug}-photo-${position + 1}`,
      title: season?.label,
      image: {
        path,
        alt: `${season?.label ?? "Mountaineer Basketball"} team photo ${position + 1}`,
      },
      categorySlug: slug,
      status: "published" as const,
    }));
  }

  const offset = Math.max(index, 0) * 2;

  return Array.from({ length: count }, (_, position) => ({
    slug: `${slug}-photo-${position + 1}`,
    title: season?.label,
    image: {
      path: getGalleryImageByIndex(offset + position),
      alt: `${season?.label ?? "Mountaineer Basketball"} team photo ${position + 1}`,
    },
    categorySlug: slug,
    status: "published" as const,
  }));
}

export function getSeasonGameActions(slug: string): GalleryImageDocument[] {
  const season = getSeason(slug);
  const photos = SEASON_GAME_ACTIONS[slug] ?? [];

  return photos.map((path, position) => ({
    slug: `${slug}-game-action-${position + 1}`,
    image: {
      path,
      alt: `${season?.label ?? "Mountaineer Basketball"} game action ${position + 1}`,
    },
    categorySlug: slug,
    status: "published" as const,
  }));
}

export function getSeasonCoachingPhoto(slug: string): string | undefined {
  return SEASON_COACHING_PHOTOS[slug];
}
