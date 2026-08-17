export const PROGRAM_BRAND = {
  name: "Mountaineer Basketball",
  school: "Philipsburg-Osceola",
  tagline: "ONE TEAM. ONE GOAL. ONE PURPOSE.",
} as const;

export const JACK_BAILEY_QUOTE = {
  text: "The Mountie tradition, cannot be entrusted to the weak or timid",
  attribution: "Coach Jack Bailey",
} as const;

export const LEAGUE_CHAMPIONS = {
  year: 1976,
  label: "League Champions",
} as const;

export const MAXPREPS_SCHEDULE_URL =
  "https://www.maxpreps.com/pa/philipsburg/philipsburg-osceola-mounties/basketball/schedule/";

export const ROSTER_BY_CLASS = [
  {
    classYear: "Seniors",
    players: ["Nick Desimone", "Mason Klingler", "Robert McClenahan"],
  },
  {
    classYear: "Juniors",
    players: ["David Kendziora", "Joe Kendziora"],
  },
  {
    classYear: "Sophomores",
    players: [
      "Lucas Beish",
      "Brady Mason",
      "Gunar Martin",
      "Blake Couturiaux",
      "Aidyn Harris",
    ],
  },
  {
    classYear: "Freshmen",
    players: ["Dylan Novais"],
  },
] as const;

export const COACHING_STAFF = [
  { name: "Mark Nartatez", role: "Coach" },
  { name: "Max Kennendy", role: "Coach" },
  { name: "Shane Kelly", role: "Coach" },
  { name: "Jake DeSimone", role: "Coach" },
  { name: "Carter Hoffman", role: "Bookkeeper / Manager" },
] as const;

export const TEAM_PHILOSOPHY = {
  title: "PO Basketball",
  subtitle: "This Year's Outline For PO High School Boy's Basketball Program",
  circle:
    "We will always start our practices at the circle for our thought of the day. It represents unity, a circle has no top or bottom, and everyone is equal. Everybody has a job to do and everybody has a role on this team. We are all working together for a common goal.",
  philosophyTitle: "Our Team Philosophy",
  philosophyValues: "Attitude, Commitment, & Class",
  philosophyBody:
    "We want all of our players to keep a positive Attitude. By being the best that they can be to make our team the best that it could be and to always behave in a first class manner. We take great pride in our player's behavior on and off the floor.",
  commitmentsHeading:
    "The 10 Commitments (I would like to keep these on a board in the gym)",
  commitments: [
    {
      number: 1,
      title: "We Will Set Our Defense Every Time",
      detail:
        "5 guys need to set our Defense at the same time for it to work",
    },
    {
      number: 2,
      title: "We Will Pressure The Man With The Ball",
      detail:
        "Anyone who's guarding the man with the ball should stick with him and pressure him",
    },
    {
      number: 3,
      title: "We Will Pack The Lane To Prevent Penetration",
      detail:
        "Penetration comes in four ways: Dribble Penetration, Passing Penetration, Cutting Penetration, Rebound Penetration. We need to prevent all four and we will do this by packing the lanes while one to two guys are pressuring the ball",
    },
    {
      number: 4,
      title: "We will contest all shots hands high, without fouling",
      detail: "We want to contest shots but not foul shooters",
    },
    {
      number: 5,
      title: "We Will Block Out, Rebound And Run",
      detail: "This is a must",
    },
    {
      number: 6,
      title: "We Will Run For Lay-Ups And Open Threes",
      detail:
        "We will condition our players. We must win the race — it's a race to see who could beat the other person down the floor. The team that is well conditioned will have the victory",
    },
    {
      number: 7,
      title: "We Will Share The Ball",
      detail:
        "There's only one ball with five guys on the court, so you must pass it to get a good look at the basket",
    },
    {
      number: 8,
      title: "We Will Penetrate The Defense",
      detail: "We must do this one every single possession",
    },
    {
      number: 9,
      title: "We Will Create Good Shots Both Inside And Outside",
      detail:
        "It's very important to have balance into our attack. We want our inside guys to get their game going but we want to give the green light to our shooters. Balance at the half court level is the key to a good offense.",
    },
    {
      number: 10,
      title: "We Will Attack The Offensive Boards",
      detail:
        "We want to make sure that we have our rebounders attacking the glass every time the ball is in the air. 80% of the rebounds go opposite of the shooter — we must attack the weak side of the glass",
    },
  ],
  closingNotes: [
    "I would like for our players to see this everyday. I would like to go over these in our circle before and after practice.",
    "The First Five Commitments have to do with defense and stopping the opponents from scoring.",
    "The Next Five Commitments are offensive with us putting the ball in the basket a high percentage of the time.",
  ],
} as const;

export const SUPPORT_PROGRAM = {
  title: "Support The Program",
  description: "Pick 3 Winners — help the Mountaineer Basketball program continue its proud tradition.",
} as const;

export const SPONSORS_2026 = {
  title: "2026 Sponsors and Donors",
  intro:
    "The Mountaineer Basketball Program and its families thanks all of this season's sponsors and donors. Your support will help us keep our proud tradition thriving by assuring our players have uniforms, equipment, and programs to keep them developing into the best players they can be.",
  logos: [
    { slug: "under-pressure-pro-cleaners", name: "Under Pressure Pro Cleaners LLC" },
    { slug: "philipsburg-marble-granite", name: "Philipsburg Marble & Granite" },
    { slug: "pa-warhawks", name: "PA Warhawks" },
    { slug: "central-pa-lions", name: "Central PA Lions" },
    { slug: "the-morning-grind", name: "The Morning Grind" },
    { slug: "alexander-b-property-repair", name: "Alexander B Property Repair & Restoration" },
    { slug: "manning-photography", name: "Manning Photography" },
    { slug: "glenn-o-hawbaker", name: "Glenn O. Hawbaker, Inc" },
    { slug: "nittany-energy", name: "Nittany Energy" },
    { slug: "lee-industries", name: "Lee Industries" },
    { slug: "osceola-lodge-515", name: "Osceola Lodge 515" },
  ],
} as const;

export const CASH_BASH = {
  title: "Philipsburg Osceola Elementary Basketball Cash Bash",
  theme: "Vegas Night",
  date: "January 10, 2026",
  time: "6–11 PM",
  doorsOpen: "Doors Open @ 5:45 pm",
  location: "Columbia Fire Hall, Curtain Street, Osceola Mills",
  entertainment: "Gigi Entertainment",
  ageRequirement: "Must be 21 to attend",
  ticketPrice: "$20 / ticket",
  grandPrize: "Final Cash Winner $1,000",
  cashChance: "Chance @ $100 every 15 minutes",
  ticketIncludes: [
    "Meal",
    "Adult Drinks",
    "Entertainment",
    "Chance @ $100 every 15 minutes",
  ],
  soldSeparately: [
    "Basket Raffle",
    "Rip-off Tickets",
    "Door Prizes",
    "50/50 + More",
  ],
  presentToWin: "You must be present to win @ 9 PM",
  flyerImage: "/images/events/cash-bash-flyer.png",
  facebookLabel: "PO Elementary Boys Basketball Cash Bash",
  facebookUrl: "https://www.facebook.com/",
} as const;

export const FUNDRAISING = {
  title: "Fundraising",
  items: ["Pick 3 lottery", "PO Elementary Boys Basketball Cash Bash"],
} as const;

export const XMAS_TOURNAMENT = {
  title: "P-O 7th Annual X-mass Tournament",
  body: [
    "We will give a team trophy for the 1st place and 2nd place team.",
    "We also will handout individual medals for All Tournament Team (5 members). One medal for MVP, Best Defense and Best Sportsmanship.",
    "These awards will be given out after the championship game.",
  ],
} as const;

export const OPPONENT_GYMS = [
  { school: "Bald Eagle High School", address: "710 S. Eagle Valley Road, Wingate, PA 16823" },
  { school: "Bedford High School", address: "330 E John St, Bedford, PA 15522" },
  { school: "Bellefonte High School", address: "830 E Bishop St, Bellefonte, PA 16823" },
  { school: "Bellwood-Antis High School", address: "400 Martin Street, Bellwood, PA 16617" },
  { school: "Bishop Carroll", address: "728 Benjamin Franklin Highway, Ebensburg, PA 15931" },
  { school: "Bishop Guilfoyle", address: "2400 Pleasant Valley Boulevard, Altoona, PA 16602" },
  { school: "Bishop McCort", address: "25 Osborne Street, Johnstown, PA 15905" },
  { school: "Central", address: "718 Central High Rd, Martinsburg, PA 16662" },
  { school: "Central Cambria", address: "204 Schoolhouse Road, Ebensburg, PA 15931" },
  { school: "Chestnut Ridge", address: "2588 Quaker Valley Road, New Paris, PA 15554" },
  { school: "Clearfield", address: "2831 Washington Avenue, Clearfield, PA 16830" },
  { school: "Forest Hills", address: "535 Locust Street, Sidman, PA 15955" },
  { school: "Greater Johnstown", address: "222 Central Avenue, Johnstown, PA 15902" },
  { school: "Hollidaysburg", address: "1510 North Montgomery Street, Hollidaysburg, PA 16648" },
  { school: "Huntingdon", address: "2400 Cassady Ave, Suite 2, Huntingdon, PA 16652" },
  { school: "Penns Valley", address: "4545 Penns Valley Road, Spring Mills, PA 16875" },
  { school: "Richland", address: "1 Academic Avenue, Johnstown, PA 15904" },
  { school: "Tyrone", address: "1001 Clay Ave, Tyrone, PA 16686" },
  { school: "Westmont Hilltop", address: "200 Fair Oaks Drive, Johnstown, PA 15905" },
] as const;

export const COACHING_RECORDS = [
  { coach: "Dennis Arnold", record: "18-31", years: "2005-07" },
  { coach: "Mel Curtis", record: "14-54", years: "2008-10" },
  { coach: "Dave McKnight", record: "13-72", years: "2011-14" },
  { coach: "Matt Curtis", record: "25-107", years: "2014-20" },
  { coach: "T. J. Anderson", record: "44-63", years: "2021-Now" },
] as const;

export const RECORD_BOOK_SECTIONS = {
  intro:
    "The P-O Mountaineer Basketball record book reflects Coach Anderson's tenure as head coach of the program since 2020. The record books are separated into team, individual, and career categories. Full stat documents will be linked from Google Drive as they are finalized.",
  team: [
    "Coaches Records (Through The Years)",
    "Championships (District and League)",
    "Winning Seasons",
    "Overall Record",
    "PIAA Advancements",
    "Most Wins in a Season",
    "Most Consecutive Wins",
    "Most Points In A Game",
    "Highest Average Points in a Season",
    "Most 3 Points in a Season",
    "Highest Free Throw % In A Season",
    "Highest Rebound Average in a Season",
    "Highest Steals Average in a season",
    "Highest Assists In a Season",
    "Highest Blocked Shots Average In A Season",
  ],
  individual: [
    "Most Career Points",
    "Most Points In A Season",
    "Most Points In A Game",
    "Mountain League Scoring Champion",
    "1st Team Mountain League Allstar",
    "2nd Team Mountain League Allstar",
    "Most 3 Points in a Career",
    "Most Rebounds In A Career",
    "Most Steals In A Career",
    "Most Assists In A Career",
    "Most Blocked Shots In A Career",
    "1,000 Point Scorers",
  ],
  coaches: ["Most Wins", "Highest % Season"],
} as const;

export const ALUMNI_CONTENT = {
  headline: "Honoring our 1976 Champions — 50 Year Anniversary",
  timelineNote: "Timeline and team pictures from Mountie history will be added here.",
  sections: [
    {
      title: "College Basketball Players / League Player Awards",
      images: [],
    },
    {
      title: "2020-2024 Team Pictures (Game and Team)",
      images: [
        {
          path: "/images/alumni/team-pictures/team-2020-21.png",
          alt: "2020-2021 Mounties team photo",
          label: "2020-2021",
        },
        {
          path: "/images/alumni/team-pictures/team-2021-22.png",
          alt: "2021-2022 Mounties team photo",
          label: "2021-2022",
        },
        {
          path: "/images/alumni/team-pictures/team-2022-23.png",
          alt: "2022-2023 Mounties team photo",
          label: "2022-2023",
        },
        {
          path: "/images/alumni/team-pictures/team-2023-24.png",
          alt: "2023-2024 Mounties team photo",
          label: "2023-2024",
        },
      ],
    },
    {
      title: "2024-2025 Team Pictures (Game and Team)",
      images: [
        {
          path: "/images/alumni/team-pictures/team-2024-25.png",
          alt: "2024-2025 Mounties team photo",
          label: "2024-2025",
        },
        {
          path: "/images/alumni/team-pictures/team-2025-26.png",
          alt: "2025-2026 Mounties team photo",
          label: "2025-2026",
        },
      ],
    },
  ],
  spotlight: {
    name: "Greg Wilson",
    note: "Alumni spotlight — full story coming soon.",
    image: "/images/alumni/greg-wilson.png",
  },
} as const;

export const RELATED_SITES = [
  {
    label: "X — Mountie Basketball",
    url: "https://twitter.com/PoBasketball",
    handle: "@PoBasketball",
  },
  {
    label: "Instagram — Philipsburg Osceola Basketball",
    url: "https://instagram.com/mountie_basketball_v",
    handle: "@mountie_basketball_v",
  },
  {
    label: "Facebook — Philipsburg-Osceola Mountaineer Basketball",
    url: "https://www.facebook.com/",
  },
  {
    label: "Facebook — PO Boys Basketball Student Section",
    url: "https://www.facebook.com/",
  },
  {
    label: "Facebook — Philipsburg-Osceola Boys Basketball Alumni Page",
    url: "https://www.facebook.com/",
  },
  {
    label: "MaxPreps Schedule & Results",
    url: MAXPREPS_SCHEDULE_URL,
  },
  {
    label: "PO Elementary Boys Basketball Cash Bash",
    url: "https://www.facebook.com/",
  },
] as const;
