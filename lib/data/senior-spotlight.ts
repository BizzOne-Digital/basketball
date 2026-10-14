import fs from "fs";
import path from "path";
import { cache } from "react";

const SENIOR_SPOTLIGHT_ROOT = path.join(
  process.cwd(),
  "public/images/Senior Spotlight",
);

const PUBLIC_BASE = "/images/Senior Spotlight";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp)$/i;

/** Season slugs mapped to folder paths under Senior Spotlight */
const SEASON_FOLDERS: Record<string, string> = {
  "2020-21": "Senior Spotlight 2020-2021",
  "2021-22": "Senior Pictures 2021-2022",
  "2022-23": "Senior Spotlight 2022-2023/Senior Pictures",
  "2023-24": "Senior Spotlight 2023-24 Season",
  "2025-26": "Senior Spotlight 2025-26 Season",
};

const SEASON_LABELS: Record<string, string> = {
  "2020-21": "2020-2021 Season",
  "2021-22": "2021-2022 Season",
  "2022-23": "2022-2023 Season",
  "2023-24": "2023-2024 Season",
  "2025-26": "2025-2026 Season",
};

export interface SeniorSpotlightPhoto {
  name: string;
  imagePath: string;
  imageAlt: string;
}

export interface SeniorSpotlightSeason {
  slug: string;
  label: string;
  photos: SeniorSpotlightPhoto[];
}

function toPublicPath(relativePath: string, fileName: string) {
  return `${PUBLIC_BASE}/${relativePath}/${fileName}`.replace(/\\/g, "/");
}

function titleFromFileName(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function collectImages(
  directory: string,
  relativePath: string,
  photos: SeniorSpotlightPhoto[],
) {
  if (!fs.existsSync(directory)) {
    return;
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    const entryRelative = `${relativePath}/${entry.name}`;

    if (entry.isDirectory()) {
      const imageFile = fs
        .readdirSync(entryPath)
        .find((file) => IMAGE_EXT.test(file));

      if (imageFile) {
        photos.push({
          name: entry.name,
          imagePath: toPublicPath(relativePath, `${entry.name}/${imageFile}`),
          imageAlt: `${entry.name} — Senior Spotlight`,
        });
      } else {
        collectImages(entryPath, entryRelative, photos);
      }
      continue;
    }

    if (IMAGE_EXT.test(entry.name)) {
      photos.push({
        name: titleFromFileName(entry.name),
        imagePath: toPublicPath(relativePath, entry.name),
        imageAlt: `${titleFromFileName(entry.name)} — Senior Spotlight`,
      });
    }
  }
}

function getSeasonPhotos(slug: string): SeniorSpotlightPhoto[] {
  const folder = SEASON_FOLDERS[slug];
  if (!folder) {
    return [];
  }

  const photos: SeniorSpotlightPhoto[] = [];
  collectImages(path.join(SENIOR_SPOTLIGHT_ROOT, folder), folder, photos);

  return photos.sort((a, b) => a.name.localeCompare(b.name));
}

export const getSeniorSpotlightSeasons = cache((): SeniorSpotlightSeason[] => {
  return Object.keys(SEASON_FOLDERS)
    .map((slug) => ({
      slug,
      label: SEASON_LABELS[slug] ?? slug,
      photos: getSeasonPhotos(slug),
    }))
    .filter((season) => season.photos.length > 0)
    .sort((a, b) => a.slug.localeCompare(b.slug));
});

export const getSeniorSpotlightForSeason = cache(
  (slug: string): SeniorSpotlightPhoto[] => getSeasonPhotos(slug),
);

export const SENIOR_SPOTLIGHT_SEASON_SLUGS = Object.keys(SEASON_FOLDERS);
