import fs from "fs";
import path from "path";
import { cache } from "react";

const IMAGES_ROOT = path.join(process.cwd(), "public/images");

const IMAGE_EXT = /\.(png|jpe?g|gif|webp)$/i;

export interface JrHighPlayerPhoto {
  name: string;
  imagePath: string;
  imageAlt: string;
}

function titleFromFileName(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/\s+copy(\s+\d+)?$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const getJrHighPlayerPhotos = cache(
  (folderName?: string): JrHighPlayerPhoto[] => {
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
      .map((file) => {
        const name = titleFromFileName(file);
        return {
          name,
          imagePath: `/images/${folderName}/${file}`.replace(/\\/g, "/"),
          imageAlt: `${name} — Jr High Basketball`,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  },
);
