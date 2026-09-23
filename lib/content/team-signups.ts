export const TEAM_SIGNUPS = {
  title: "Join Our Team",
  description:
    "Sign up for Philipsburg-Osceola Mountaineer Basketball using the forms below.",
  intro:
    "Ready to be a Mountie? Complete the signup form for your program level. Each form opens in Google Forms — please fill it out completely so our coaching staff has your information.",
  forms: [
    {
      id: "varsity",
      title: "Varsity Basketball Sign Ups",
      description:
        "High school varsity basketball registration for the Mountaineer program.",
      url: "https://forms.gle/cMzNhRWeS9m4CiDR6",
      ctaLabel: "Open Varsity Signup Form",
    },
    {
      id: "jr-high",
      title: "Jr High Team Sign Ups",
      description:
        "Junior high basketball registration for Philipsburg-Osceola student-athletes.",
      url: "https://forms.gle/TrmA2Rs7NrAdF9hk9",
      ctaLabel: "Open Jr High Signup Form",
    },
  ],
} as const;
