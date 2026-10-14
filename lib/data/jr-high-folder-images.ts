import fs from "fs";
import path from "path";
import { cache } from "react";

const IMAGES_ROOT = path.join(process.cwd(), "public/images");

const IMAGE_EXT = /\.(png|jpe?g|gif|webp)$/i;

export const getJrHighFolderImages = cache((folderName?: string): string[] => {
  if (!folderName) {
    return [];
  }

  const directory = path.join(IMAGES_ROOT, folderName);
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/images/${folderName}/${file}`.replace(/\\/g, "/"));
});

export function resolveJrHighImageList(
  images?: string | string[],
): string[] {
  if (!images) {
    return [];
  }

  return Array.isArray(images) ? images : [images];
}
