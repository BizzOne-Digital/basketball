import { ALUMNI_1976_CHAMPIONSHIP } from "@/lib/content/alumni-1976-championship";
import { ALUMNI_HALL_OF_FAME_2026 } from "@/lib/content/alumni-hall-of-fame";
import { ALUMNI_SIGNUP_HOME_CONTENT } from "@/lib/content/alumni-signup";
import { CENTRAL_PA_LIONS_CONTENT } from "@/lib/content/central-pa-lions";
import { HOME_MEDIA } from "@/lib/content/home-media";
import { MOUNTIE_GEAR_CONTENT } from "@/lib/content/mountie-gear";
import {
  ALUMNI_CONTENT,
  CASH_BASH,
  COACHING_RECORDS,
  COACHING_STAFF,
  FUNDRAISING,
  JACK_BAILEY_QUOTE,
  LEAGUE_CHAMPIONS,
  PROGRAM_BRAND,
  RECORD_BOOK_SECTIONS,
  RELATED_SITES,
  ROSTER_BY_CLASS,
  SPONSORS_2026,
  SUPPORT_PROGRAM,
  TEAM_PHILOSOPHY,
  XMAS_TOURNAMENT,
} from "@/lib/content/mountie-program";
import { PO_BASKETBALL_NEWSLETTERS } from "@/lib/content/newsletters";
import { PO_LOGOS } from "@/lib/content/po-logos";
import { SEASON_ROSTERS } from "@/lib/content/season-rosters";
import {
  getSeasonSchedule,
  getSeasonSchedulePhotos,
  getSeasonScheduleScreenshots,
  SCHEDULE_PAGE_SEASONS,
  type SeasonGame,
} from "@/lib/content/season-schedules";
import { TEAM_SIGNUPS } from "@/lib/content/team-signups";
import { THOUSAND_POINT_SCORERS } from "@/lib/content/thousand-point-scorers";

/**
 * Every editable block of public-site content. The values below are the
 * built-in defaults (the content the site ships with). Anything an admin
 * saves in the CMS is stored in MongoDB and layered on top of these, so the
 * live site is unchanged until someone edits a block.
 */

const SCHEDULE_PAGE = {
  maxprepsUrl:
    "https://www.maxpreps.com/pa/philipsburg/philipsburg-osceola-mounties/basketball/schedule/",
  seasons: SCHEDULE_PAGE_SEASONS.map((season) => {
    const schedule = getSeasonSchedule(season.slug);
    return {
      slug: season.slug as string,
      label: season.label as string,
      record: schedule?.record ?? "",
      conferenceRecord: schedule?.conferenceRecord ?? "",
      conferenceRank: schedule?.conferenceRank ?? "",
      games: (schedule?.games ?? []) as SeasonGame[],
      screenshots: getSeasonScheduleScreenshots(season.slug),
      photos: getSeasonSchedulePhotos(season.slug),
    };
  }),
};

const COACHING_STAFF_BLOCK = {
  members: COACHING_STAFF.map((member) => ({
    name: member.name as string,
    role: member.role as string,
    photo: "",
  })),
};

export const CONTENT_DEFAULTS = {
  "schedule-page": SCHEDULE_PAGE,
  "coaching-staff": COACHING_STAFF_BLOCK,
  "season-rosters": SEASON_ROSTERS,
  "roster-by-class": { groups: ROSTER_BY_CLASS },
  "home-brand": {
    brand: PROGRAM_BRAND,
    quote: JACK_BAILEY_QUOTE,
    champions: LEAGUE_CHAMPIONS,
  },
  "home-media": HOME_MEDIA,
  "partner-logos": { logos: PO_LOGOS },
  "team-philosophy": TEAM_PHILOSOPHY,
  "support-program": SUPPORT_PROGRAM,
  sponsors: SPONSORS_2026,
  "cash-bash": CASH_BASH,
  fundraising: FUNDRAISING,
  "xmas-tournament": XMAS_TOURNAMENT,
  "related-sites": { sites: RELATED_SITES },
  alumni: ALUMNI_CONTENT,
  "alumni-signup": ALUMNI_SIGNUP_HOME_CONTENT,
  "alumni-hall-of-fame": ALUMNI_HALL_OF_FAME_2026,
  "alumni-1976": ALUMNI_1976_CHAMPIONSHIP,
  "record-book": {
    ...RECORD_BOOK_SECTIONS,
    coaches: COACHING_RECORDS,
  },
  "thousand-point-scorers": THOUSAND_POINT_SCORERS,
  "join-our-team": TEAM_SIGNUPS,
  "mountie-gear": MOUNTIE_GEAR_CONTENT,
  "central-pa-lions": CENTRAL_PA_LIONS_CONTENT,
  newsletters: { issues: PO_BASKETBALL_NEWSLETTERS },
};

export type ContentKey = keyof typeof CONTENT_DEFAULTS;
export type ContentMap = typeof CONTENT_DEFAULTS;

export interface ContentBlockMeta {
  key: ContentKey;
  label: string;
  group: string;
  description: string;
  publicPath: string;
}

export const CONTENT_BLOCKS: ContentBlockMeta[] = [
  { key: "schedule-page", label: "Schedule & Results", group: "Schedules & Rosters", description: "Season schedules, game results, records and MaxPreps screenshots.", publicPath: "/schedule" },
  { key: "season-rosters", label: "Season Rosters", group: "Schedules & Rosters", description: "Players, jersey numbers and photos for each season.", publicPath: "/meet-the-mounties" },
  { key: "roster-by-class", label: "Current Roster by Class", group: "Schedules & Rosters", description: "Seniors, Juniors, Sophomores and Freshmen lists.", publicPath: "/meet-the-mounties" },
  { key: "coaching-staff", label: "Coaching Staff", group: "Coaches & Team", description: "Coach names, roles and photos.", publicPath: "/coaching-staff" },
  { key: "team-philosophy", label: "Team Philosophy", group: "Coaches & Team", description: "Team philosophy page text.", publicPath: "/team-philosophy" },
  { key: "join-our-team", label: "Join Our Team", group: "Coaches & Team", description: "Sign-up forms and links.", publicPath: "/join-our-team" },
  { key: "record-book", label: "Record Book", group: "Records & Alumni", description: "Coaching, team and individual records.", publicPath: "/record-book" },
  { key: "thousand-point-scorers", label: "1,000 Point Scorers", group: "Records & Alumni", description: "List of 1,000 point scorers.", publicPath: "/record-book/thousand-point-scorers" },
  { key: "alumni", label: "Alumni Page", group: "Records & Alumni", description: "Alumni headline, spotlight and sections.", publicPath: "/alumni" },
  { key: "alumni-signup", label: "Alumni Sign-up Section", group: "Records & Alumni", description: "Alumni sign-up promo shown on home and sign-up pages.", publicPath: "/alumni/sign-up" },
  { key: "alumni-hall-of-fame", label: "Alumni Hall of Fame", group: "Records & Alumni", description: "Hall of Fame section.", publicPath: "/alumni" },
  { key: "alumni-1976", label: "1976 Championship Team", group: "Records & Alumni", description: "1976 championship alumni section.", publicPath: "/alumni" },
  { key: "home-brand", label: "Home Hero Text", group: "Home & Branding", description: "School name, quote and League Champions badge.", publicPath: "/" },
  { key: "home-media", label: "Home Images & Video", group: "Home & Branding", description: "Home feature image and hype video.", publicPath: "/" },
  { key: "partner-logos", label: "Partner Logo Strip", group: "Home & Branding", description: "Logos shown in the scrolling strip.", publicPath: "/" },
  { key: "central-pa-lions", label: "Central PA Lions", group: "Home & Branding", description: "Central PA Lions section and page.", publicPath: "/central-pa-lions" },
  { key: "sponsors", label: "Sponsors", group: "Support & Events", description: "Sponsor intro and logos.", publicPath: "/sponsors" },
  { key: "support-program", label: "Support the Program", group: "Support & Events", description: "Support page text.", publicPath: "/support" },
  { key: "fundraising", label: "Fundraising", group: "Support & Events", description: "Fundraising page text.", publicPath: "/fundraising" },
  { key: "cash-bash", label: "Cash Bash", group: "Support & Events", description: "Event date, time, price and flyer.", publicPath: "/cash-bash" },
  { key: "xmas-tournament", label: "Xmas Tournament", group: "Support & Events", description: "Tournament page text.", publicPath: "/xmas-tournament" },
  { key: "mountie-gear", label: "Mountie Gear", group: "Support & Events", description: "Gear page text and links.", publicPath: "/mountie-gear" },
  { key: "newsletters", label: "Newsletters", group: "Support & Events", description: "Newsletter titles and links.", publicPath: "/newsletters" },
  { key: "related-sites", label: "Related Sites", group: "Support & Events", description: "External links list.", publicPath: "/related-sites" },
];

export function isContentKey(value: string): value is ContentKey {
  return Object.prototype.hasOwnProperty.call(CONTENT_DEFAULTS, value);
}
