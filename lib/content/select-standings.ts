export type StandingRow = { team: string; wins: number; losses: number; highlight?: boolean };

export type StandingsDivision = {
  id: string;
  title: string;
  asOf: string;
  rows: StandingRow[];
  note?: string;
  image?: { path: string; alt: string };
};

export const SELECT_STANDINGS_CONTENT = {
  title: "P-O Select Basketball League Standings",
  intro:
    "Weekly standings for the P-O Select Elementary Winter League. Standings are updated after each weekend of play.",
  updated: "November 25, 2026",
  divisions: [
    {
      id: "6th-grade",
      title: "5th / 6th Grade Division",
      asOf: "Week 1 — November 21, 2026",
      rows: [
        { team: "P-O 6th Grade", wins: 2, losses: 0, highlight: true },
        { team: "Bellwood", wins: 2, losses: 0 },
        { team: "P-O 5th Grade", wins: 1, losses: 1, highlight: true },
        { team: "Punxsutawney", wins: 1, losses: 1 },
        { team: "West Branch", wins: 1, losses: 1 },
        { team: "Tyrone", wins: 1, losses: 1 },
        { team: "Mo Valley", wins: 0, losses: 2 },
        { team: "Clearfield", wins: 0, losses: 2 },
      ],
      image: {
        path: "/images/standings/week-1-5th-6th-grade-2026-11-21.jpeg",
        alt: "P-O Select Basketball League Week 1 standings, 5th/6th grade division",
      },
    },
    {
      id: "4th-grade",
      title: "4th Grade Division",
      asOf: "Week 1 — November 22, 2026",
      rows: [
        { team: "P-O 4th Grade", wins: 2, losses: 0, highlight: true },
        { team: "Mifflin County", wins: 1, losses: 0 },
        { team: "Clearfield", wins: 0, losses: 1 },
        { team: "West Branch", wins: 0, losses: 1 },
        { team: "Mo Valley", wins: 0, losses: 1 },
      ],
      note: "Week 1 results: P-O 4th Grade beat West Branch 35-3 and Mo Valley 40-7. Mifflin County beat Clearfield 17-16.",
    },
  ] as StandingsDivision[],
};
