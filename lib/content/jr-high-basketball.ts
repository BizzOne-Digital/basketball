export interface JrHighSeason {
  slug: string;
  label: string;
  years: string;
  description: string;
  teamPicture?: string;
  teamSchedule?: string[];
  scheduleFolder?: string;
  teamRoster?: string | string[];
  playersFolder?: string;
  playersImages?: string[];
  showPlayersOnTeamPage: boolean;
  hasPlayersTab: boolean;
  current?: boolean;
}

export const JR_HIGH_TITLE = "PO Jr High Basketball";

export const JR_HIGH_DESCRIPTION =
  "Philipsburg-Osceola Mountaineer junior high boys basketball — season by season.";

export const DEFAULT_JR_HIGH_SEASON = "2025-26";

export const JR_HIGH_SEASONS: JrHighSeason[] = [
  {
    slug: "2020-21",
    label: "2020-2021 Season",
    years: "2020 – 2021",
    description: "Boys' junior high basketball team pictures, schedule, and roster.",
    teamSchedule: ["/images/jr-high/2020-21/team-schedule.png"],
    teamRoster: "/images/jr-high/2020-21/team-roster.png",
    playersFolder: "Players Pictures 2020-21 Season",
    showPlayersOnTeamPage: true,
    hasPlayersTab: false,
  },
  {
    slug: "2021-22",
    label: "2021-2022 Season",
    years: "2021 – 2022",
    description: "Boys' junior high basketball team pictures, schedule, and roster.",
    teamSchedule: ["/images/jr-high/2021-22/team-schedule.png"],
    teamRoster: "/images/jr-high/2021-22/team-roster.png",
    playersFolder: "Player Pictures 2021-22 Season",
    showPlayersOnTeamPage: true,
    hasPlayersTab: true,
  },
  {
    slug: "2022-23",
    label: "2022-2023 Season",
    years: "2022 – 2023",
    description: "Boys' junior high basketball team pictures, schedule, and roster.",
    teamSchedule: [
      "/images/jr-high/2022-23/team-schedule-01.png",
      "/images/jr-high/2022-23/team-schedule-02.png",
      "/images/jr-high/2022-23/team-schedule-03.png",
      "/images/jr-high/2022-23/team-schedule-04.png",
    ],
    teamRoster: "/images/jr-high/2022-23/team-roster.png",
    playersFolder: "Players Pictures 2022-23 Season",
    showPlayersOnTeamPage: true,
    hasPlayersTab: true,
  },
  {
    slug: "2023-24",
    label: "2023-2024 Season",
    years: "2023 – 2024",
    description: "Boys' junior high basketball team pictures, schedule, and roster.",
    playersFolder: "Players Pictures 2022-24 Season",
    scheduleFolder: "Team Schedule 2023-2024",
    teamRoster: "/images/jr-high/2023-24/team-roster.png",
    showPlayersOnTeamPage: true,
    hasPlayersTab: true,
  },
  {
    slug: "2024-25",
    label: "2024-2025 Season",
    years: "2024 – 2025",
    description: "Boys' junior high basketball team pictures, schedule, and roster.",
    teamPicture: "/images/jr-high/2024-25/team-picture.png",
    scheduleFolder: "Team Schedule 2024-2025",
    teamRoster: [
      "/images/jr-high/2024-25/team-roster-jr-high.png",
      "/images/jr-high/2024-25/team-roster-varsity.png",
    ],
    playersImages: ["/images/jr-high/2024-25/players-collage.png"],
    showPlayersOnTeamPage: true,
    hasPlayersTab: true,
  },
  {
    slug: "2025-26",
    label: "2025-2026 Season",
    years: "2025 – 2026",
    description: "Current boys' junior high basketball season.",
    teamPicture: "/images/jr-high/2025-26/team-picture.png",
    teamSchedule: ["/images/jr-high/2025-26/team-schedule.png"],
    teamRoster: "/images/jr-high/2025-26/team-roster.png",
    playersFolder: "Players Pictures 2025-26 Season",
    showPlayersOnTeamPage: true,
    hasPlayersTab: false,
    current: true,
  },
];

export function getJrHighSeason(slug?: string): JrHighSeason | undefined {
  if (!slug) {
    return undefined;
  }

  return JR_HIGH_SEASONS.find((season) => season.slug === slug);
}

export function jrHighSeasonHref(slug: string): string {
  return `/po-jr-high-basketball/${slug}`;
}

export function getJrHighNavLinks(season: JrHighSeason) {
  const base = jrHighSeasonHref(season.slug);
  const links: { href: string; label: string }[] = [
    { href: base, label: "Team Picture" },
  ];

  if (season.hasPlayersTab) {
    links.push({ href: `${base}/players-pictures`, label: "Players Pictures" });
  }

  links.push(
    { href: `${base}/team-schedule`, label: "Team Schedule" },
    { href: `${base}/team-roster`, label: "Team Roster" },
  );

  return links;
}
