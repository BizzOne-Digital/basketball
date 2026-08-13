export const HEADER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/meet-the-mounties", label: "Meet the Mounties" },
  { href: "/schedule", label: "Schedule" },
  { href: "/coaching-staff", label: "Coaching Staff" },
  { href: "/team-philosophy", label: "Philosophy" },
  { href: "/support", label: "Support" },
] as const;

export const HEADER_MORE_LINKS = [
  { href: "/sponsors", label: "2026 Sponsors" },
  { href: "/cash-bash", label: "Cash Bash" },
  { href: "/fundraising", label: "Fundraising" },
  { href: "/xmas-tournament", label: "X-mass Tournament" },
  { href: "/opponent-gyms", label: "Opponent Gyms" },
  { href: "/record-book", label: "Record Book" },
  { href: "/alumni", label: "Alumni" },
  { href: "/related-sites", label: "Related Sites" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "Game Articles" },
] as const;

export const ALL_NAV_LINKS = [...HEADER_NAV_LINKS, ...HEADER_MORE_LINKS] as const;

export const FOOTER_LINK_GROUPS = [
  {
    title: "Program",
    links: [
      { href: "/meet-the-mounties", label: "Meet the Mounties" },
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
      { href: "/related-sites", label: "Related Sites" },
      { href: "/gallery", label: "Team Pictures" },
      { href: "/news", label: "Game Articles" },
    ],
  },
] as const;
