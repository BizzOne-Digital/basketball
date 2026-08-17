export interface SeasonGame {
  date: string;
  time?: string;
  opponent: string;
  location: "home" | "away";
  result: "W" | "L";
  score: string;
  conference?: boolean;
}

export interface SeasonSchedule {
  record: string;
  conferenceRecord?: string;
  conferenceRank?: string;
  games: SeasonGame[];
}

const SCHEDULE_2020_21: SeasonSchedule = {
  record: "11-7",
  conferenceRecord: "8-5",
  conferenceRank: "4th, Mountain",
  games: [
    { date: "Jan 9", time: "3:00pm", opponent: "SJCA", location: "home", result: "W", score: "73-55" },
    { date: "Jan 15", time: "6:30pm", opponent: "Bellefonte", location: "home", result: "W", score: "63-52", conference: true },
    { date: "Jan 16", time: "4:00pm", opponent: "Clearfield", location: "home", result: "L", score: "54-43", conference: true },
    { date: "Jan 19", time: "7:30pm", opponent: "Clearfield", location: "away", result: "L", score: "70-58", conference: true },
    { date: "Jan 22", time: "7:30pm", opponent: "BEAHS", location: "away", result: "W", score: "66-32", conference: true },
    { date: "Jan 29", time: "7:30pm", opponent: "Huntingdon", location: "home", result: "W", score: "71-60", conference: true },
    { date: "Jan 30", time: "7:30pm", opponent: "East Juniata", location: "home", result: "W", score: "67-34" },
    { date: "Feb 12", time: "7:30pm", opponent: "PVAHS", location: "home", result: "W", score: "50-46", conference: true },
    { date: "Feb 13", time: "3:30pm", opponent: "Bellefonte", location: "away", result: "W", score: "57-52", conference: true },
    { date: "Feb 16", time: "7:30pm", opponent: "Tyrone", location: "home", result: "L", score: "65-45", conference: true },
    { date: "Feb 17", time: "7:30pm", opponent: "BEAHS", location: "home", result: "W", score: "68-34", conference: true },
    { date: "Feb 19", time: "7:30pm", opponent: "Huntingdon", location: "away", result: "W", score: "71-60", conference: true },
    { date: "Feb 20", time: "3:30pm", opponent: "Mifflin County", location: "away", result: "L", score: "51-38" },
    { date: "Feb 23", time: "7:30pm", opponent: "PVAHS", location: "away", result: "W", score: "43-39", conference: true },
    { date: "Feb 25", time: "7:30pm", opponent: "Central", location: "away", result: "L", score: "62-43", conference: true },
    { date: "Feb 27", time: "3:30pm", opponent: "Central", location: "home", result: "L", score: "59-56", conference: true },
    { date: "Mar 4", time: "7:00pm", opponent: "Bellwood-Antis", location: "home", result: "W", score: "60-39" },
    { date: "Mar 9", time: "7:00pm", opponent: "WHHS", location: "home", result: "L", score: "66-62" },
  ],
};

const SCHEDULE_2021_22: SeasonSchedule = {
  record: "15-8",
  conferenceRecord: "8-6",
  conferenceRank: "3rd, Mountain",
  games: [
    { date: "Dec 13", time: "7:30pm", opponent: "Clearfield", location: "away", result: "L", score: "46-40", conference: true },
    { date: "Dec 16", time: "7:30pm", opponent: "BEAHS", location: "away", result: "W", score: "54-42", conference: true },
    { date: "Dec 20", time: "7:30pm", opponent: "Tyrone", location: "home", result: "L", score: "54-45", conference: true },
    { date: "Dec 22", time: "7:30pm", opponent: "Moshannon Valley", location: "home", result: "W", score: "74-36" },
    { date: "Dec 28", time: "7:30pm", opponent: "West Branch", location: "home", result: "W", score: "74-40" },
    { date: "Dec 29", time: "7:30pm", opponent: "Curwensville", location: "home", result: "W", score: "74-33" },
    { date: "Jan 3", time: "7:30pm", opponent: "Huntingdon", location: "home", result: "W", score: "57-54", conference: true },
    { date: "Jan 7", time: "7:30pm", opponent: "SJCA", location: "away", result: "W", score: "71-33" },
    { date: "Jan 10", time: "7:30pm", opponent: "Bellefonte", location: "away", result: "L", score: "76-69", conference: true },
    { date: "Jan 13", time: "7:30pm", opponent: "Hollidaysburg", location: "home", result: "L", score: "62-52", conference: true },
    { date: "Jan 21", time: "7:30pm", opponent: "BEAHS", location: "home", result: "W", score: "65-53", conference: true },
    { date: "Jan 24", time: "7:30pm", opponent: "Tyrone", location: "away", result: "W", score: "52-45", conference: true },
    { date: "Jan 26", time: "7:30pm", opponent: "Moshannon Valley", location: "away", result: "W", score: "68-48" },
    { date: "Jan 28", time: "7:30pm", opponent: "Huntingdon", location: "away", result: "W", score: "57-42", conference: true },
    { date: "Jan 29", time: "3:30pm", opponent: "Clearfield", location: "home", result: "L", score: "58-56 OT", conference: true },
    { date: "Jan 31", time: "5:30pm", opponent: "PVAHS", location: "away", result: "L", score: "56-45", conference: true },
    { date: "Feb 1", time: "7:30pm", opponent: "PVAHS", location: "home", result: "W", score: "56-42", conference: true },
    { date: "Feb 4", time: "7:30pm", opponent: "Bellefonte", location: "home", result: "W", score: "55-50", conference: true },
    { date: "Feb 8", time: "7:30pm", opponent: "Hollidaysburg", location: "away", result: "W", score: "69-65 OT", conference: true },
    { date: "Feb 9", time: "7:30pm", opponent: "SJCA", location: "home", result: "W", score: "54-27" },
    { date: "Feb 14", time: "7:00pm", opponent: "River Valley", location: "away", result: "L", score: "57-55" },
    { date: "Feb 16", time: "7:30pm", opponent: "St. Marys", location: "home", result: "W", score: "50-36" },
    { date: "Feb 22", time: "7:00pm", opponent: "PVAHS", location: "home", result: "L", score: "51-40" },
  ],
};

const SCHEDULE_2022_23: SeasonSchedule = {
  record: "10-13",
  conferenceRecord: "5-9",
  conferenceRank: "6th, Mountain",
  games: [
    { date: "Dec 7", time: "7:30pm", opponent: "Clearfield", location: "home", result: "L", score: "53-49", conference: true },
    { date: "Dec 9", time: "7:30pm", opponent: "West Branch", location: "away", result: "L", score: "67-53" },
    { date: "Dec 15", time: "7:30pm", opponent: "BEAHS", location: "home", result: "L", score: "45-43", conference: true },
    { date: "Dec 19", time: "7:30pm", opponent: "Tyrone", location: "away", result: "L", score: "70-29", conference: true },
    { date: "Dec 21", time: "7:30pm", opponent: "Moshannon Valley", location: "away", result: "W", score: "53-27" },
    { date: "Dec 28", time: "7:30pm", opponent: "Curwensville", location: "home", result: "W", score: "74-44" },
    { date: "Dec 29", time: "7:30pm", opponent: "SJCA", location: "home", result: "L", score: "62-50" },
    { date: "Jan 3", time: "7:30pm", opponent: "Huntingdon", location: "away", result: "W", score: "62-52", conference: true },
    { date: "Jan 5", time: "7:30pm", opponent: "PVAHS", location: "home", result: "W", score: "60-38", conference: true },
    { date: "Jan 9", time: "7:30pm", opponent: "Bellefonte", location: "home", result: "L", score: "58-49", conference: true },
    { date: "Jan 12", time: "7:30pm", opponent: "Hollidaysburg", location: "away", result: "L", score: "65-51", conference: true },
    { date: "Jan 14", time: "7:15pm", opponent: "East Juniata", location: "home", result: "W", score: "43-40" },
    { date: "Jan 17", time: "7:30pm", opponent: "Clearfield", location: "away", result: "W", score: "43-40", conference: true },
    { date: "Jan 19", time: "7:30pm", opponent: "BEAHS", location: "away", result: "W", score: "37-26", conference: true },
    { date: "Jan 23", time: "7:30pm", opponent: "Penns Manor", location: "away", result: "L", score: "75-72" },
    { date: "Jan 24", time: "7:30pm", opponent: "Tyrone", location: "home", result: "L", score: "71-60", conference: true },
    { date: "Jan 27", time: "7:30pm", opponent: "Huntingdon", location: "home", result: "L", score: "57-49", conference: true },
    { date: "Feb 3", time: "7:30pm", opponent: "Bellefonte", location: "away", result: "L", score: "50-38", conference: true },
    { date: "Feb 7", time: "7:30pm", opponent: "Hollidaysburg", location: "home", result: "L", score: "72-46", conference: true },
    { date: "Feb 9", time: "7:30pm", opponent: "Moshannon Valley", location: "home", result: "W", score: "77-39" },
    { date: "Feb 13", time: "7:30pm", opponent: "River Valley", location: "home", result: "W", score: "64-43" },
    { date: "Feb 15", time: "7:30pm", opponent: "PVAHS", location: "away", result: "W", score: "57-38", conference: true },
    { date: "Feb 21", time: "7:00pm", opponent: "Richland", location: "away", result: "L", score: "73-35" },
  ],
};

const SCHEDULE_2023_24: SeasonSchedule = {
  record: "4-18",
  conferenceRecord: "2-16",
  conferenceRank: "21st, Laurel Highlands",
  games: [
    { date: "Dec 5", time: "7:30pm", opponent: "Huntingdon", location: "home", result: "L", score: "72-66", conference: true },
    { date: "Dec 8", time: "7:30pm", opponent: "Richland", location: "home", result: "L", score: "71-39", conference: true },
    { date: "Dec 11", time: "7:15pm", opponent: "BGHS", location: "away", result: "L", score: "65-25", conference: true },
    { date: "Dec 14", time: "7:30pm", opponent: "Bellwood-Antis", location: "home", result: "L", score: "40-32", conference: true },
    { date: "Dec 15", time: "7:30pm", opponent: "West Branch", location: "home", result: "L", score: "81-60" },
    { date: "Dec 18", time: "7:30pm", opponent: "Hollidaysburg", location: "away", result: "L", score: "57-27", conference: true },
    { date: "Dec 21", time: "7:30pm", opponent: "BEAHS", location: "away", result: "L", score: "52-44", conference: true },
    { date: "Dec 27", time: "7:30pm", opponent: "SJCA", location: "home", result: "W", score: "68-29" },
    { date: "Dec 28", time: "7:30pm", opponent: "BEAHS", location: "home", result: "L", score: "55-52" },
    { date: "Jan 4", time: "7:30pm", opponent: "Moshannon Valley", location: "home", result: "W", score: "68-36" },
    { date: "Jan 5", time: "7:30pm", opponent: "Somerset", location: "away", result: "W", score: "48-40", conference: true },
    { date: "Jan 8", time: "7:30pm", opponent: "Clearfield", location: "away", result: "L", score: "71-63", conference: true },
    { date: "Jan 11", time: "7:30pm", opponent: "PVAHS", location: "home", result: "L", score: "49-45", conference: true },
    { date: "Jan 17", time: "7:30pm", opponent: "Central", location: "away", result: "L", score: "65-27", conference: true },
    { date: "Jan 24", time: "7:30pm", opponent: "Bellefonte", location: "home", result: "L", score: "65-47", conference: true },
    { date: "Jan 26", time: "7:30pm", opponent: "Tyrone", location: "home", result: "L", score: "73-49", conference: true },
    { date: "Jan 27", time: "3:30pm", opponent: "Chestnut Ridge", location: "home", result: "L", score: "75-51", conference: true },
    { date: "Jan 31", time: "7:00pm", opponent: "Huntingdon", location: "away", result: "W", score: "65-45", conference: true },
    { date: "Feb 2", time: "7:15pm", opponent: "Forest Hills", location: "away", result: "L", score: "69-51", conference: true },
    { date: "Feb 7", time: "7:30pm", opponent: "BGHS", location: "home", result: "L", score: "94-51", conference: true },
    { date: "Feb 9", time: "7:30pm", opponent: "Bellwood-Antis", location: "away", result: "L", score: "53-48", conference: true },
    { date: "Feb 12", time: "7:30pm", opponent: "Hollidaysburg", location: "home", result: "L", score: "79-33", conference: true },
  ],
};

const SCHEDULE_2024_25: SeasonSchedule = {
  record: "4-17",
  conferenceRecord: "2-15",
  conferenceRank: "19th, Laurel Highlands",
  games: [
    { date: "Dec 3", time: "6:30pm", opponent: "Huntingdon", location: "away", result: "L", score: "97-68", conference: true },
    { date: "Dec 6", time: "6:00pm", opponent: "Richland", location: "away", result: "L", score: "63-36", conference: true },
    { date: "Dec 9", time: "7:30pm", opponent: "BGHS", location: "home", result: "L", score: "82-35", conference: true },
    { date: "Dec 16", time: "7:30pm", opponent: "Hollidaysburg", location: "home", result: "L", score: "84-36", conference: true },
    { date: "Dec 18", time: "6:00pm", opponent: "West Branch", location: "away", result: "L", score: "80-56" },
    { date: "Dec 19", time: "7:30pm", opponent: "BEAHS", location: "home", result: "L", score: "44-43", conference: true },
    { date: "Dec 27", time: "7:30pm", opponent: "SJCA", location: "home", result: "L", score: "49-47" },
    { date: "Dec 28", time: "6:00pm", opponent: "BEAHS", location: "home", result: "W", score: "46-42" },
    { date: "Jan 3", time: "6:00pm", opponent: "Somerset", location: "home", result: "W", score: "66-50", conference: true },
    { date: "Jan 8", time: "7:30pm", opponent: "Clearfield", location: "home", result: "L", score: "64-33", conference: true },
    { date: "Jan 10", time: "6:30pm", opponent: "PVAHS", location: "away", result: "L", score: "64-37", conference: true },
    { date: "Jan 15", time: "7:30pm", opponent: "Central", location: "home", result: "L", score: "75-44", conference: true },
    { date: "Jan 17", time: "7:00pm", opponent: "Chestnut Ridge", location: "away", result: "L", score: "74-63", conference: true },
    { date: "Jan 20", time: "6:15pm", opponent: "Moshannon Valley", location: "away", result: "W", score: "72-55" },
    { date: "Jan 24", time: "7:30pm", opponent: "Tyrone", location: "away", result: "L", score: "71-38", conference: true },
    { date: "Jan 27", time: "6:30pm", opponent: "Bellwood-Antis", location: "away", result: "W", score: "44-38", conference: true },
    { date: "Jan 29", time: "7:30pm", opponent: "Huntingdon", location: "home", result: "L", score: "82-54", conference: true },
    { date: "Jan 31", time: "6:00pm", opponent: "Forest Hills", location: "home", result: "L", score: "83-35", conference: true },
    { date: "Feb 3", time: "6:30pm", opponent: "Bellefonte", location: "away", result: "L", score: "55-22", conference: true },
    { date: "Feb 7", time: "7:30pm", opponent: "Bellwood-Antis", location: "home", result: "L", score: "60-50", conference: true },
    { date: "Feb 10", time: "7:00pm", opponent: "Hollidaysburg", location: "away", result: "L", score: "74-32", conference: true },
  ],
};

const SCHEDULE_2025_26: SeasonSchedule = {
  record: "4-18",
  conferenceRecord: "2-16",
  conferenceRank: "19th, Laurel Highlands",
  games: [
    { date: "Dec 3", time: "7:15pm", opponent: "BEAHS", location: "away", result: "W", score: "57-54", conference: true },
    { date: "Dec 8", time: "7:15pm", opponent: "West Branch", location: "home", result: "W", score: "78-66" },
    { date: "Dec 11", time: "7:30pm", opponent: "Clearfield", location: "away", result: "L", score: "76-30", conference: true },
    { date: "Dec 13", time: "3:00pm", opponent: "CCHS", location: "away", result: "L", score: "71-48", conference: true },
    { date: "Dec 15", time: "7:15pm", opponent: "Central", location: "home", result: "L", score: "65-52", conference: true },
    { date: "Dec 17", time: "7:00pm", opponent: "Marion Center", location: "home", result: "L", score: "72-42" },
    { date: "Dec 22", time: "7:15pm", opponent: "PVAHS", location: "home", result: "L", score: "80-61", conference: true },
    { date: "Dec 27", time: "1:30pm", opponent: "West Branch", location: "home", result: "L", score: "62-50" },
    { date: "Dec 27", time: "4:00pm", opponent: "BVHS", location: "home", result: "W", score: "49-40" },
    { date: "Jan 2", time: "7:30pm", opponent: "Bishop Carroll", location: "home", result: "L", score: "70-49", conference: true },
    { date: "Jan 5", time: "7:15pm", opponent: "Bellefonte", location: "home", result: "W", score: "57-43", conference: true },
    { date: "Jan 8", time: "7:15pm", opponent: "Tyrone", location: "home", result: "L", score: "57-39", conference: true },
    { date: "Jan 12", time: "7:00pm", opponent: "Huntingdon", location: "away", result: "L", score: "70-40", conference: true },
    { date: "Jan 14", time: "6:00pm", opponent: "BGHS", location: "away", result: "L", score: "74-31", conference: true },
    { date: "Jan 16", time: "7:00pm", opponent: "Penn Cambria", location: "home", result: "L", score: "80-39", conference: true },
    { date: "Jan 22", time: "7:30pm", opponent: "Bellwood-Antis", location: "away", result: "L", score: "67-45", conference: true },
    { date: "Jan 23", time: "7:15pm", opponent: "Hollidaysburg", location: "home", result: "L", score: "77-45", conference: true },
    { date: "Jan 30", time: "7:30pm", opponent: "Bishop McCort", location: "home", result: "L", score: "51-46", conference: true },
    { date: "Feb 5", time: "7:15pm", opponent: "Clearfield", location: "home", result: "L", score: "65-36", conference: true },
    { date: "Feb 9", time: "7:15pm", opponent: "Central", location: "away", result: "L", score: "65-28", conference: true },
    { date: "Feb 11", time: "7:30pm", opponent: "Tyrone", location: "away", result: "L", score: "64-53", conference: true },
    { date: "Feb 13", time: "7:30pm", opponent: "BEAHS", location: "home", result: "L", score: "48-42", conference: true },
  ],
};

export const SEASON_SCHEDULES: Record<string, SeasonSchedule> = {
  "2020-21": SCHEDULE_2020_21,
  "2021-22": SCHEDULE_2021_22,
  "2022-23": SCHEDULE_2022_23,
  "2023-24": SCHEDULE_2023_24,
  "2024-25": SCHEDULE_2024_25,
  "2025-26": SCHEDULE_2025_26,
};

export function getSeasonSchedule(slug: string): SeasonSchedule | undefined {
  return SEASON_SCHEDULES[slug];
}

export const SCHEDULE_PAGE_SEASONS = [
  { slug: "2020-21", label: "2020-2021" },
  { slug: "2021-22", label: "2021-2022" },
  { slug: "2022-23", label: "2022-2023" },
  { slug: "2023-24", label: "2023-2024" },
  { slug: "2024-25", label: "2024-2025" },
  { slug: "2025-26", label: "2025-2026" },
] as const;

const SCHEDULE_SCREENSHOT_COUNTS: Record<string, number> = {
  "2020-21": 4,
  "2021-22": 5,
  "2022-23": 5,
  "2023-24": 5,
  "2024-25": 6,
  "2025-26": 5,
};

/** MaxPreps schedule screenshots provided by the program. */
export function getSeasonScheduleScreenshots(slug: string): string[] {
  const count = SCHEDULE_SCREENSHOT_COUNTS[slug] ?? 0;

  return Array.from(
    { length: count },
    (_, index) =>
      `/images/schedule/${slug}/maxpreps-${String(index + 1).padStart(2, "0")}.png`,
  );
}

/** Game/team photos per season — filled in as provided. */
const SCHEDULE_SEASON_PHOTOS: Record<string, string[]> = {};

export function getSeasonSchedulePhotos(slug: string): string[] {
  return SCHEDULE_SEASON_PHOTOS[slug] ?? [];
}
