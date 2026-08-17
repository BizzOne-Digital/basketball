import fs from "node:fs/promises";
import path from "node:path";
import type { GalleryImageDocument } from "@/types";

/**
 * Drop one folder per school into `public/images/opponent-gyms/`, e.g.
 * `public/images/opponent-gyms/Tyrone High School/photo1.jpg`. Folder and file
 * names are read straight off disk, so no code changes are needed when photos
 * are added.
 */
const GYMS_ROOT = path.join(process.cwd(), "public", "images", "opponent-gyms");

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
]);

export const OPPONENT_GYM_NAMES = [
  "Bald Eagle High School",
  "Bedford High School",
  "Bellefonte High School",
  "Bellwood-Antis High School",
  "Bishop Carroll High School",
  "Bishop Guilfoyle High School",
  "Bishop McCort High School",
  "Central Cambria High School",
  "Central High School",
  "Chestnut Ridge High School",
  "Clearfield High School",
  "Forest Hills High School",
  "Greater Johnstown High School",
  "Hollidaysburg High School",
  "Huntingdon High School",
  "Penns Valley High School",
  "Richland High School",
  "Tyrone High School",
  "Westmont Hilltop High School",
] as const;

export interface OpponentGymGallery {
  slug: string;
  name: string;
  photos: string[];
}

export function gymSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function gymHref(slug: string): string {
  return `/opponent-gyms/${slug}`;
}

function toPublicPath(folder: string, file: string): string {
  return `/images/opponent-gyms/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

async function readGymFolders(): Promise<string[]> {
  try {
    const entries = await fs.readdir(GYMS_ROOT, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return [];
  }
}

async function readGymPhotos(folder: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(path.join(GYMS_ROOT, folder), {
      withFileTypes: true,
    });

    return entries
      .filter(
        (entry) =>
          entry.isFile() &&
          IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
      )
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => toPublicPath(folder, file));
  } catch {
    return [];
  }
}

export async function getOpponentGymGalleries(): Promise<OpponentGymGallery[]> {
  const folders = await readGymFolders();
  const folderBySlug = new Map(folders.map((folder) => [gymSlug(folder), folder]));

  // Known schools first (stable order), then any extra folders that were added.
  const names: string[] = [...OPPONENT_GYM_NAMES];
  for (const folder of folders) {
    if (!names.some((name) => gymSlug(name) === gymSlug(folder))) {
      names.push(folder);
    }
  }

  return Promise.all(
    names.map(async (name) => {
      const slug = gymSlug(name);
      const folder = folderBySlug.get(slug);

      return {
        slug,
        name,
        photos: folder ? await readGymPhotos(folder) : [],
      };
    }),
  );
}

export async function getOpponentGymGallery(
  slug: string,
): Promise<OpponentGymGallery | undefined> {
  const galleries = await getOpponentGymGalleries();
  return galleries.find((gallery) => gallery.slug === slug);
}

export function toGalleryImages(
  gallery: OpponentGymGallery,
): GalleryImageDocument[] {
  return gallery.photos.map((photoPath, index) => ({
    slug: `${gallery.slug}-photo-${index + 1}`,
    title: gallery.name,
    image: {
      path: photoPath,
      alt: `${gallery.name} gym photo ${index + 1}`,
    },
    categorySlug: gallery.slug,
    status: "published" as const,
  }));
}
