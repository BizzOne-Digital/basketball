export const THOUSAND_POINT_SCORERS = {
  title: "1,000 Career Points Scorers",
  subtitle: "P-O 1,000 Point Scores (We had Two 1,000 Point Scores in 6 years)",
  andersonNote: "*Players Coached By Coach Anderson",
  scorers: [
    {
      rank: 1,
      name: "David Majeski",
      years: "1995-99",
      points: 1248,
      note: "P-O Boys All Time Scoring Leader",
      coachedByAnderson: false,
    },
    {
      rank: 2,
      name: "Ryan Whitehead",
      years: "2016-2020",
      points: 1218,
      coachedByAnderson: true,
      image: {
        path: "/images/record-book/thousand-point-scorers/ryan-whitehead.png",
        alt: "Ryan Whitehead — 1,218 career points, 2nd all-time P-O boys scoring leader",
      },
      highlight:
        "1st Team All Mountain League Allstar. 2nd all-time boys scoring leader — 38 points from the P-O boys all-time scoring record. Progressland Player of the Year.",
    },
    {
      rank: 3,
      name: "Fred Craig",
      years: "1958-60",
      points: 1162,
      coachedByAnderson: false,
    },
    {
      rank: 4,
      name: "Jake DeSimone",
      years: "2019-2023",
      points: 1094,
      coachedByAnderson: true,
      image: {
        path: "/images/record-book/thousand-point-scorers/jake-desimone.png",
        alt: "Jake DeSimone — 6th member of the 1,000 points club, Class of 2023",
      },
      highlight:
        "6th member of the 1,000 points club. 1st Team All Mountain League Allstar and team leader. Class of 2023.",
    },
    {
      rank: 5,
      name: "Darrin Potts",
      years: "1980-82",
      points: 1013,
      coachedByAnderson: false,
    },
    {
      rank: 6,
      name: "Robert Culp",
      years: "1986-88",
      points: 1008,
      coachedByAnderson: false,
    },
  ],
} as const;

export function formatScorerPoints(points: number) {
  return `${points.toLocaleString("en-US")}pts`;
}
