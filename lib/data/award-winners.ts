import fs from "fs";
import path from "path";
import { cache } from "react";

const AWARD_WINNERS_ROOT = path.join(
  process.cwd(),
  "public/images/Award Winners Through The Years",
);

const PUBLIC_BASE = "/images/Award Winners Through The Years";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|heic)$/i;

export interface AwardWinner {
  name: string;
  imagePath: string;
  imageAlt: string;
}

export interface AwardWinnersSeason {
  slug: string;
  label: string;
  sortKey: string;
  winners: AwardWinner[];
}

function toPublicPath(...segments: string[]) {
  return [PUBLIC_BASE, ...segments].join("/");
}

function formatSeasonLabel(folderName: string) {
  const match = folderName.match(/^(\d{4})-(\d{2})(?:\s+team)?$/i);
  if (match) {
    const [, startYear, endShort] = match;
    const endYear = `${startYear.slice(0, 2)}${endShort}`;
    return `${startYear}-${endYear} Award Winners`;
  }

  return `${folderName.replace(/\s+team$/i, "")} Award Winners`;
}

function seasonSortKey(folderName: string) {
  const match = folderName.match(/^(\d{4})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : folderName;
}

function collectWinners(seasonFolder: string): AwardWinner[] {
  const seasonPath = path.join(AWARD_WINNERS_ROOT, seasonFolder);
  const winners: AwardWinner[] = [];

  for (const entry of fs.readdirSync(seasonPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const imageFile = fs
        .readdirSync(path.join(seasonPath, entry.name))
        .find((file) => IMAGE_EXT.test(file));

      if (!imageFile) continue;

      winners.push({
        name: entry.name,
        imagePath: toPublicPath(seasonFolder, entry.name, imageFile),
        imageAlt: `${entry.name} — ${formatSeasonLabel(seasonFolder)}`,
      });
      continue;
    }

    if (IMAGE_EXT.test(entry.name)) {
      winners.push({
        name: "Award Winner",
        imagePath: toPublicPath(seasonFolder, entry.name),
        imageAlt: formatSeasonLabel(seasonFolder),
      });
    }
  }

  return winners.sort((a, b) => a.name.localeCompare(b.name));
}

export const getAwardWinnersBySeason = cache((): AwardWinnersSeason[] => {
  if (!fs.existsSync(AWARD_WINNERS_ROOT)) {
    return [];
  }

  return fs
    .readdirSync(AWARD_WINNERS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      slug: entry.name.toLowerCase().replace(/\s+/g, "-"),
      label: formatSeasonLabel(entry.name),
      sortKey: seasonSortKey(entry.name),
      winners: collectWinners(entry.name),
    }))
    .filter((season) => season.winners.length > 0)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
});
