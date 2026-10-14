export interface SeasonPlayer {
  slug: string;
  name: string;
  jerseyNumber?: number;
  photo: string;
  /**
   * When true, the photo is a pre-designed card that already includes the
   * player's name/number, so the UI should not draw its own overlay.
   */
  labeled?: boolean;
}

const ROSTER_2025_26: SeasonPlayer[] = [
  { slug: "zack-meyers", name: "Zack Meyers", jerseyNumber: 12 },
  { slug: "rob-mcclenahan", name: "Rob McClenahan", jerseyNumber: 23 },
  { slug: "nick-desimone", name: "Nick DeSimone", jerseyNumber: 13 },
  { slug: "mason-klingler", name: "Mason Klingler", jerseyNumber: 4 },
  { slug: "lucas-beish", name: "Lucas Beish" },
  { slug: "joe-kendziora", name: "Joe Kendziora", jerseyNumber: 11 },
  { slug: "henry-matia", name: "Henry Matia", jerseyNumber: 32 },
  { slug: "gunar-martin", name: "Gunar Martin", jerseyNumber: 22 },
  { slug: "david-kendziora", name: "David Kendziora", jerseyNumber: 21 },
  { slug: "brady-mason", name: "Brady Mason", jerseyNumber: 10 },
  { slug: "blake-couturiaux", name: "Blake Couturiaux", jerseyNumber: 2 },
].map((player) => ({
  ...player,
  photo: `/images/roster/2025-26/${player.slug}.png`,
}));

const ROSTER_2020_21: SeasonPlayer[] = [
  { slug: "aaron-depto", name: "Aaron Depto" },
  { slug: "brandon-hahn", name: "Brandon Hahn" },
  { slug: "cameron-mason", name: "Cameron Mason" },
  { slug: "dawson-snyder", name: "Dawson Snyder" },
  { slug: "desimone", name: "DeSimone" },
  { slug: "hahn-brothers", name: "Hahn Brothers" },
  { slug: "harpster-family", name: "Harpster Family" },
  { slug: "jacob-desimone", name: "Jacob DeSimone" },
  { slug: "jeremy-whitehead", name: "Jeremy Whitehead" },
  { slug: "kyle-hahn", name: "Kyle Hahn" },
  { slug: "logan-phillippi", name: "Logan Phillippi" },
  { slug: "lucas-peterson", name: "Lucas Peterson" },
  { slug: "nick-johnson", name: "Nick Johnson" },
  { slug: "oliver-harpster", name: "Oliver Harpster" },
  { slug: "preston-putillion", name: "Preston Putillion" },
  { slug: "ryan-whitehead", name: "Ryan Whitehead" },
  { slug: "shane-parish", name: "Shane Parish" },
  { slug: "the-whitehead-family", name: "The Whitehead Family" },
].map((player) => ({
  ...player,
  labeled: true,
  photo: `/images/roster/2020-21/${player.slug}.png`,
}));

const ROSTER_2021_22: SeasonPlayer[] = [
  { slug: "tristan-doyle", name: "Tristan Doyle" },
  { slug: "the-whitehead-family", name: "The Whitehead Family" },
  { slug: "the-desimone-family", name: "The DeSimone Family" },
  { slug: "oliver-harpster", name: "Oliver Harpster" },
  { slug: "nick-wolfinger", name: "Nick Wolfinger" },
  { slug: "nick-johnson", name: "Nick Johnson" },
  { slug: "logan-phillippi", name: "Logan Phillippi" },
  { slug: "jacob-desimone", name: "Jacob DeSimone" },
  { slug: "dawson-snyder", name: "Dawson Snyder" },
  { slug: "colby-hahn", name: "Colby Hahn" },
  { slug: "christian-delozier", name: "Christian Delozier" },
  { slug: "camden-mason", name: "Camden Mason" },
  { slug: "lucas-peterson", name: "Lucas Peterson" },
].map((player) => ({
  ...player,
  labeled: true,
  photo: `/images/roster/2021-22/${player.slug}.png`,
}));

const ROSTER_2022_23: SeasonPlayer[] = [
  { slug: "zack-meyers", name: "Zack Meyers" },
  { slug: "the-mason-family-pt-2", name: "The Mason Family Pt.2" },
  { slug: "the-desimone-family", name: "The DeSimone Family" },
  { slug: "siler-dixon", name: "Siler Dixon" },
  { slug: "shane-parish", name: "Shane Parish" },
  { slug: "parker-lamb", name: "Parker Lamb" },
  { slug: "oliver-harpster", name: "Oliver Harpster" },
  { slug: "nick-wolfinger", name: "Nick Wolfinger" },
  { slug: "nick-johnson", name: "Nick Johnson" },
  { slug: "luke-peterson", name: "Luke Peterson" },
  { slug: "logan-phillippi", name: "Logan Phillippi" },
  { slug: "jacob-desimone", name: "Jacob DeSimone" },
  { slug: "dustin-glessner", name: "Dustin Glessner" },
  { slug: "christian-delozier", name: "Christian Delozier" },
  { slug: "cam-mason", name: "Cam Mason" },
  { slug: "brandon-hahn", name: "Brandon Hahn" },
  { slug: "aaron-henninger", name: "Aaron Henninger" },
].map((player) => ({
  ...player,
  labeled: true,
  photo: `/images/roster/2022-23/${player.slug}.png`,
}));

// 2023-2024 cards are pre-designed team photos without individual names.
const ROSTER_2023_24: SeasonPlayer[] = Array.from({ length: 12 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return {
    slug: `photo-${n}`,
    name: "",
    labeled: true,
    photo: `/images/roster/2023-24/photo-${n}.png`,
  };
});

const ROSTER_2024_25: SeasonPlayer[] = [
  { slug: "robert-mclenahan", name: "Robert Mclenahan", jerseyNumber: 30 },
  { slug: "henry-matia", name: "Henry Matia", jerseyNumber: 21 },
  { slug: "conner-matier", name: "Conner Matier" },
  { slug: "aaron-davis", name: "Aaron Davis", jerseyNumber: 23 },
  { slug: "luke-peterson", name: "Luke Peterson", jerseyNumber: 1 },
  { slug: "masson-klinger", name: "Masson Klinger", jerseyNumber: 11 },
  { slug: "zack-mayers", name: "Zack Mayers", jerseyNumber: 12 },
  { slug: "nick-desimone", name: "Nick Desimone", jerseyNumber: 13 },
  { slug: "sam-vesnesky", name: "Sam Vesnesky", jerseyNumber: 2 },
].map((player) => ({
  ...player,
  photo: `/images/roster/2024-25/${player.slug}.png`,
}));

export const SEASON_ROSTERS: Record<string, SeasonPlayer[]> = {
  "2025-26": ROSTER_2025_26,
  "2020-21": ROSTER_2020_21,
  "2021-22": ROSTER_2021_22,
  "2022-23": ROSTER_2022_23,
  "2023-24": ROSTER_2023_24,
  "2024-25": ROSTER_2024_25,
};

export function getSeasonRoster(slug: string): SeasonPlayer[] {
  return SEASON_ROSTERS[slug] ?? [];
}
