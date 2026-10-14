import "dotenv/config";
import mongoose from "mongoose";
import {
  PlayerRoster,
  OpponentGym,
  CoachingRecord,
  AlumniSpotlight,
  Page,
  GalleryCategory,
} from "@/models";
import {
  ROSTER_BY_CLASS,
  COACHING_STAFF,
  OPPONENT_GYMS,
  COACHING_RECORDS,
  ALUMNI_CONTENT,
} from "@/lib/content/mountie-program";
import { imageObject, SITE_IMAGES } from "@/lib/images";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/mountie-basketball";

type RosterGrade = "Freshman" | "Sophomore" | "Junior" | "Senior";

function classYearToGrade(classYear: string): RosterGrade {
  const gradeMap: Record<string, RosterGrade> = {
    Seniors: "Senior",
    Juniors: "Junior",
    Sophomores: "Sophomore",
    Freshmen: "Freshman",
  };

  return gradeMap[classYear] ?? "Senior";
}

async function seedRoster() {
  const season = "2025-26";
  let order = 0;

  for (const gradeGroup of ROSTER_BY_CLASS) {
    for (const playerName of gradeGroup.players) {
      const slug = playerName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      await PlayerRoster.findOneAndUpdate(
        { slug },
        {
          slug,
          name: playerName,
          grade: classYearToGrade(gradeGroup.classYear),
          season,
          order,
          status: "published",
          headshot: undefined, // Will be added via admin later
        },
        { upsert: true },
      );

      order++;
    }
  }

  console.log(`✅ Seeded ${order} players for ${season} season.`);
}

async function seedCoachingStaff() {
  let order = 0;

  for (const coach of COACHING_STAFF) {
    await CoachingRecord.findOneAndUpdate(
      { coachName: coach.name },
      {
        coachName: coach.name,
        yearsCoached: "2025-26",
        wins: 0,
        losses: 0,
        bio: `${coach.name} — ${coach.role} for Philipsburg-Osceola Mountaineer Basketball.`,
        order,
        status: "published",
      },
      { upsert: true },
    );

    order++;
  }

  console.log(`✅ Seeded ${COACHING_STAFF.length} coaching staff members.`);
}

async function seedOpponentGyms() {
  let order = 0;

  for (const gym of OPPONENT_GYMS) {
    const slug = gym.school.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    await OpponentGym.findOneAndUpdate(
      { slug },
      {
        slug,
        schoolName: gym.school,
        address: gym.address,
        order,
        status: "published",
        logo: undefined, // Will be added via admin
      },
      { upsert: true },
    );

    order++;
  }

  console.log(`✅ Seeded ${OPPONENT_GYMS.length} opponent gyms.`);
}

async function seedHistoricalCoaches() {
  let order = 0;

  for (const record of COACHING_RECORDS) {
    const [wins, losses] = record.record.split("-").map(Number);
    const winPercentage = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;

    await CoachingRecord.findOneAndUpdate(
      { coachName: record.coach },
      {
        coachName: record.coach,
        yearsCoached: record.years,
        wins,
        losses,
        winPercentage: Math.round(winPercentage * 100) / 100,
        order,
        status: "published",
      },
      { upsert: true },
    );

    order++;
  }

  console.log(`✅ Seeded historical coaching records.`);
}

async function seedAlumniSpotlight() {
  await AlumniSpotlight.findOneAndUpdate(
    { slug: "greg-wilson" },
    {
      slug: "greg-wilson",
      name: "Greg Wilson",
      graduationYear: 1976, // Placeholder
      featured: true,
      bio: ALUMNI_CONTENT.spotlight.note,
      status: "published",
      photo: {
        path: ALUMNI_CONTENT.spotlight.image,
        alt: `${ALUMNI_CONTENT.spotlight.name} — Mountie Basketball alumni tribute`,
      },
    },
    { upsert: true },
  );

  console.log("✅ Seeded Greg Wilson alumni spotlight.");
}

async function updateAlumniPage() {
  await Page.findOneAndUpdate(
    { key: "alumni" },
    {
      $set: {
        sections: [
          {
            id: "alumni-hero",
            sectionType: "hero",
            order: 0,
            eyebrow: "Alumni",
            heading: ALUMNI_CONTENT.headline,
            body: "Celebrating 50 years of Mountie tradition since our 1976 Championship team.",
            enabled: true,
          },
          {
            id: "alumni-intro",
            sectionType: "text",
            order: 1,
            eyebrow: "Legacy",
            heading: "Mountie Basketball Alumni",
            body: `<p>${ALUMNI_CONTENT.timelineNote}</p><p>${ALUMNI_CONTENT.sections.map((section) => section.title).join(" • ")}</p>`,
            enabled: true,
          },
          {
            id: "alumni-spotlight",
            sectionType: "text-image",
            order: 2,
            eyebrow: "Featured Alumni",
            heading: ALUMNI_CONTENT.spotlight.name,
            body: `<p>${ALUMNI_CONTENT.spotlight.note}</p>`,
            imagePosition: "right",
            enabled: true,
          },
          {
            id: "alumni-gallery",
            sectionType: "gallery-preview",
            order: 3,
            eyebrow: "Through The Years",
            heading: "Team Photos & Memories",
            body: "Historical photos from 1976 to present day. Photos organized by season.",
            enabled: true,
          },
        ],
      },
    },
  );

  console.log("✅ Updated Alumni page.");
}

async function seedGalleryCategories() {
  const categories = [
    { slug: "1976-championship", name: "1976 Championship Team", order: 0 },
    { slug: "2020-21-season", name: "2020-21 Season", order: 1 },
    { slug: "2021-22-season", name: "2021-22 Season", order: 2 },
    { slug: "2022-23-season", name: "2022-23 Season", order: 3 },
    { slug: "2023-24-season", name: "2023-24 Season", order: 4 },
    { slug: "2024-25-season", name: "2024-25 Season", order: 5 },
    { slug: "2025-26-season", name: "2025-26 Season (Current)", order: 6 },
    { slug: "coaching-staff", name: "Coaching Staff", order: 7 },
    { slug: "game-action", name: "Game Action", order: 8 },
    { slug: "team-events", name: "Team Events", order: 9 },
  ];

  for (const cat of categories) {
    await GalleryCategory.findOneAndUpdate(
      { slug: cat.slug },
      {
        slug: cat.slug,
        name: cat.name,
        order: cat.order,
        description: `Photos from ${cat.name}.`,
        status: "published",
        coverImage: imageObject(
          SITE_IMAGES.team[cat.order % SITE_IMAGES.team.length],
          cat.name,
        ),
      },
      { upsert: true },
    );
  }

  console.log(`✅ Seeded ${categories.length} gallery categories.`);
}

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.\n");

  await seedRoster();
  await seedCoachingStaff();
  await seedOpponentGyms();
  await seedHistoricalCoaches();
  await seedAlumniSpotlight();
  await updateAlumniPage();
  await seedGalleryCategories();

  console.log("\n✅ Content update completed successfully.");
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error("❌ Content update failed:", error);
  process.exit(1);
});
