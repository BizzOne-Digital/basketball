export interface CollegePlayer {
  name: string;
  highSchoolClass: string;
  college: string;
  headline: string;
  body: string;
  closing: string;
  image: string;
  imageAlt: string;
}

export interface CollegePlayerClass {
  label: string;
  players: CollegePlayer[];
}

export const COLLEGE_PLAYERS_CONTENT = {
  title: "Mountie College Players",
  description:
    "Mounties who have taken the next step and earned a spot on a college basketball roster.",
  intro:
    "Once a Mountie. Always a Mountie. Congratulations to the P-O players who have moved on to play college basketball.",
  classes: [
    {
      label: "Class of 2026",
      players: [
        {
          name: "Zack Meyers",
          highSchoolClass: "P-O Class of 2026",
          college: "Penn College Wildcats",
          headline: "Headed to the Next Level",
          body: "We are proud to announce that Zack Meyers, P-O Class of 2026, has earned a spot on the Penn College Wildcats basketball team. Zack is the first P-O varsity boys’ basketball player to advance to college basketball since Coach Tj Anderson became head coach at P-O. This is a special accomplishment for Zack and a proud milestone for our program.",
          closing:
            "Zack, we are extremely proud of you and wish you the best as you begin this next chapter. We look forward to cheering you on! Once a Mountie. Always a Mountie.",
          image: "/images/college-players/zack-meyers-penn-college-2026.png",
          imageAlt:
            "Zack Meyers, P-O Class of 2026, headed to Penn College Wildcats basketball",
        },
      ] as CollegePlayer[],
    },
  ] as CollegePlayerClass[],
};
