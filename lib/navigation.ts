import { SEASONS, seasonHref } from "@/lib/content/seasons";

export const HEADER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/coaching-staff", label: "Coaching Staff" },
  { href: "/team-philosophy", label: "Philosophy" },
  { href: "/join-our-team", label: "Join Our Team" },
  { href: "/mountie-gear", label: "Mountie Gear" },
  { href: "/po-jr-high-basketball", label: "Jr High" },
  { href: "/support", label: "Support" },
] as const;

export const MEET_THE_MOUNTIES_HREF = "/meet-the-mounties";

export const MEET_THE_MOUNTIES_LINKS = [
  { href: "/meet-the-mounties/senior-spotlight", label: "Senior Spotlight" },
  ...SEASONS.map((season) => ({
    href: seasonHref(season.slug),
    label: season.label,
  })),
];

export const HEADER_MORE_LINKS = [
  { href: "/central-pa-lions", label: "Central PA Lions AAU" },
  { href: "/sponsors", label: "2026 Sponsors" },
  { href: "/cash-bash", label: "Cash Bash" },
  { href: "/fundraising", label: "Fundraising" },
  { href: "/xmas-tournament", label: "X-mass Tournament" },
  { href: "/opponent-gyms", label: "Opponent Gyms" },
  { href: "/record-book", label: "Record Book" },
  { href: "/alumni", label: "Alumni" },
  { href: "/related-sites", label: "Related Sites" },
  { href: "/news", label: "Game Articles" },
] as const;

export const ALL_NAV_LINKS = [...HEADER_NAV_LINKS, ...HEADER_MORE_LINKS] as const;

export const FOOTER_LINK_GROUPS = [
  {
    title: "Program",
    links: [
      { href: "/meet-the-mounties", label: "Meet the Mounties" },
      { href: "/join-our-team", label: "Join Our Team" },
      { href: "/mountie-gear", label: "Mountie Gear" },
      { href: "/po-jr-high-basketball", label: "PO Jr High Basketball" },
      { href: "/schedule", label: "Schedule & Results" },
      { href: "/coaching-staff", label: "Coaching Staff" },
      { href: "/team-philosophy", label: "Team Philosophy" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Support The Program" },
      { href: "/sponsors", label: "2026 Sponsors" },
      { href: "/cash-bash", label: "Cash Bash" },
      { href: "/fundraising", label: "Fundraising" },
      { href: "/xmas-tournament", label: "X-mass Tournament" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/opponent-gyms", label: "Opponent Gym Addresses" },
      { href: "/record-book", label: "Record Book" },
      { href: "/alumni", label: "Alumni" },
      { href: "/central-pa-lions", label: "Central PA Lions AAU" },
      { href: "/related-sites", label: "Related Sites" },
      { href: "/meet-the-mounties", label: "Team Pictures" },
      { href: "/news", label: "Game Articles" },
    ],
  },
] as const;
