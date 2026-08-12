import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import {
  AdminUser,
  BlogPost,
  FAQ,
  GalleryCategory,
  GalleryImage,
  Page,
  Product,
  Service,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/models";
import type { ImageObject, PageSection } from "@/types";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/mountie-basketball";

const LOGO: ImageObject = {
  path: "/images/mountie-logo.png",
  alt: "Philipsburg-Osceola Mountie Basketball logo",
  width: 800,
  height: 1200,
};

const PLACEHOLDER = (name: string, alt: string): ImageObject => ({
  path: `/images/placeholders/${name}.svg`,
  alt,
});

function section(partial: Omit<PageSection, "enabled"> & { enabled?: boolean }): PageSection {
  return { ...partial, enabled: partial.enabled ?? true };
}

const HERO_BACKGROUND: ImageObject = {
  path: "/images/hero-background.png",
  alt: "Mountaineer Basketball player on court at night",
};

function heroSections(
  eyebrow: string,
  heading: string,
  subtitle: string,
  bg = "hero",
): PageSection[] {
  return [
    section({
      id: "hero-main",
      sectionType: "hero",
      order: 0,
      eyebrow,
      heading,
      body: subtitle,
      image:
        bg === "hero"
          ? HERO_BACKGROUND
          : PLACEHOLDER(bg, heading),
      imagePosition: "background",
      ctaLabel: "Explore the Program",
      ctaUrl: "/services",
      theme: "dark",
    }),
  ];
}

function contentSections(extra: PageSection[], startOrder = 1): PageSection[] {
  return extra.map((s, i) => ({ ...s, order: startOrder + i }));
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@mountiebasketball.com";
  const password = process.env.ADMIN_PASSWORD ?? "MountieAdmin2026!";
  const hash = await bcrypt.hash(password, 12);

  await AdminUser.findOneAndUpdate(
    { email: email.toLowerCase() },
    {
      email: email.toLowerCase(),
      passwordHash: hash,
      name: "Site Administrator",
      role: "admin",
      active: true,
    },
    { upsert: true, returnDocument: "after" },
  );

  console.log(`Admin user ready: ${email}`);
}

async function seedSettings() {
  await SiteSettings.findOneAndUpdate(
    { singletonKey: "default" },
    {
      singletonKey: "default",
      organizationName: "Philipsburg-Osceola Mountie Basketball",
      headline: "MOUNTAINEER BASKETBALL",
      tagline: "ONE TEAM. ONE GOAL. ONE PURPOSE.",
      logo: LOGO,
      coach: {
        name: "Tj Anderson",
        title: "Head Coach",
        email: "Tjandersty@gmail.com",
        phone: "814-500-8613",
        bio: "Leading the Mounties with a focus on discipline, development, and community.",
        photo: PLACEHOLDER("team", "Head Coach Tj Anderson"),
      },
      contactEmail: "Tjandersty@gmail.com",
      contactPhone: "814-500-8613",
      address: "Philipsburg-Osceola Area School District, Central Pennsylvania",
      socialLinks: {
        instagram: "https://instagram.com/mountie_basketball_",
        facebook: "https://facebook.com/Philipsburg-Osceola Mountaineer Basketball",
        twitter: "https://twitter.com/PoBasketball",
      },
      announcementBar: {
        enabled: true,
        message: "Youth Basketball Camp registration opens soon — contact Coach Anderson for details.",
        linkUrl: "/contact",
        linkLabel: "Contact Coach",
      },
      defaultSeo: {
        title: "Philipsburg-Osceola Mountie Basketball",
        description:
          "Official home of Philipsburg-Osceola Mountie Basketball — youth camps, training, news, and community.",
        ogImage: LOGO,
      },
      footerText:
        "We are a public-school high school basketball program located in Central Pennsylvania. Home of the Mounties.",
    },
    { upsert: true, returnDocument: "after" },
  );

  console.log("Site settings seeded.");
}

async function seedPages() {
  const pages: Array<{
    key: string;
    slug: string;
    title: string;
    sections: PageSection[];
    seo?: { title?: string; description?: string };
  }> = [
    {
      key: "home",
      slug: "home",
      title: "Home",
      seo: {
        title: "Mountaineer Basketball | Philipsburg-Osceola",
        description: "ONE TEAM. ONE GOAL. ONE PURPOSE. Official Mountie Basketball program site.",
      },
      sections: [
        ...heroSections(
          "Philipsburg-Osceola",
          "MOUNTAINEER BASKETBALL",
          "ONE TEAM. ONE GOAL. ONE PURPOSE.",
        ),
        section({
          id: "home-intro",
          sectionType: "text-image",
          order: 1,
          eyebrow: "Home of the Mounties",
          heading: "Central Pennsylvania Basketball Excellence",
          body: "We are a public-school high school basketball program located in Central Pennsylvania. Our mission is to develop complete athletes through teamwork, discipline, and community.",
          image: {
            path: "/images/home-intro.png",
            alt: "Mountie Basketball team huddle on court",
          },
          imagePosition: "right",
        }),
        section({
          id: "home-values",
          sectionType: "values-grid",
          order: 2,
          eyebrow: "Mission & Values",
          heading: "What We Stand For",
          body: "Teamwork|Working together on and off the court\nDiscipline|Commitment to daily improvement\nDevelopment|Skill-building for every athlete\nCommunity|Supporting Philipsburg-Osceola\nAcademic Responsibility|Excellence in the classroom",
        }),
        section({
          id: "home-stats",
          sectionType: "statistics",
          order: 3,
          eyebrow: "Program Focus",
          heading: "Mountie Basketball By The Numbers",
          body: "2|Youth Programs\n100+|Community Reach\n365|Days of Development\n1|Shared Purpose",
          theme: "brand",
        }),
        section({
          id: "home-cta",
          sectionType: "CTA",
          order: 4,
          heading: "Join the Mounties",
          body: "Connect with Coach Anderson to learn about camps, training, and how to get involved.",
          ctaLabel: "Contact Coach",
          ctaUrl: "/contact",
        }),
      ],
    },
    {
      key: "about",
      slug: "about",
      title: "About",
      sections: [
        ...heroSections("About", "Who We Are", "Home of the Mounties.", "team"),
        section({
          id: "about-story",
          sectionType: "text-image",
          order: 1,
          eyebrow: "Who We Are",
          heading: "Central Pennsylvania Basketball Excellence",
          body: "<p>Philipsburg-Osceola Mountie Basketball represents our community on the court and in the classroom. We build leaders through competitive basketball, character development, and a standard of excellence that extends into every part of a student-athlete's life.</p>",
          image: {
            path: "/images/home-intro.png",
            alt: "Mountie Basketball team huddle",
          },
          imagePosition: "right",
        }),
        section({
          id: "about-mission",
          sectionType: "text",
          order: 2,
          eyebrow: "Mission & Vision",
          heading: "Develop Champions Of Character",
          body: "<p>Our mission is to prepare student-athletes for success through rigorous training, academic accountability, and service to our community. We believe the habits formed in our program — discipline, teamwork, and resilience — prepare Mounties for life beyond basketball.</p>",
        }),
        section({
          id: "about-philosophy",
          sectionType: "quote",
          order: 3,
          body: "Basketball is our platform — discipline, respect, and growth are our standard.",
          heading: "Tj Anderson",
        }),
        section({
          id: "about-development",
          sectionType: "text-image",
          order: 4,
          eyebrow: "Player Development",
          heading: "Elevate Every Athlete",
          body: "<p>From fundamentals and basketball IQ to competitive readiness, we meet athletes where they are and push them toward their potential with structure, honest feedback, and daily purpose.</p>",
          image: PLACEHOLDER("court", "Mountie Basketball training"),
          imagePosition: "left",
        }),
        section({
          id: "about-community",
          sectionType: "text",
          order: 5,
          eyebrow: "Community Connection",
          heading: "More Than A Program",
          body: "<p>Mountie Basketball brings together students, parents, alumni, and supporters across Central Pennsylvania. We compete with pride and stay connected to the community that lifts us up every season.</p>",
        }),
        section({
          id: "about-timeline",
          sectionType: "timeline",
          order: 6,
          eyebrow: "Milestones",
          heading: "Program Timeline",
          body: "Today|Building the next generation of Mounties\nSeason|Competing with purpose and pride\nCommunity|Connecting alumni, families, and supporters\nFuture|Launching October 2026",
        }),
        section({
          id: "about-cta",
          sectionType: "CTA",
          order: 7,
          eyebrow: "Get Involved",
          heading: "Join The Mountie Family",
          body: "Meet our coaches, explore our programs, or reach out to Coach Anderson today.",
          ctaLabel: "Contact Coach",
          ctaUrl: "/contact",
        }),
      ],
    },
    {
      key: "services",
      slug: "services",
      title: "Programs",
      sections: [
        ...heroSections("Programs", "Train With The Mounties", "Youth camps and development programs.", "service"),
        section({
          id: "services-intro",
          sectionType: "text",
          order: 1,
          body: "<p>Our programs emphasize fundamentals, competitive growth, and character. Contact us for current camp and training pricing.</p>",
        }),
      ],
    },
    {
      key: "team",
      slug: "team",
      title: "Team",
      sections: [
        ...heroSections("Team", "Coaching Staff & Roster", "Led by Head Coach Tj Anderson.", "team"),
        section({
          id: "team-philosophy",
          sectionType: "text-image",
          order: 1,
          heading: "Coaching Philosophy",
          body: "<p>We coach with high standards, clear communication, and a player-first approach to development.</p>",
          image: PLACEHOLDER("team", "Coaching staff"),
          imagePosition: "right",
        }),
      ],
    },
    {
      key: "gallery",
      slug: "gallery",
      title: "Gallery",
      sections: heroSections("Gallery", "Game Day & Training", "Moments from the Mountie program.", "gallery"),
    },
    {
      key: "news",
      slug: "news",
      title: "News",
      sections: heroSections("News", "Latest Updates", "Program news and announcements.", "news"),
    },
    {
      key: "shop",
      slug: "shop",
      title: "Shop",
      sections: heroSections("Shop", "Mountie Gear", "Show your Mountie pride.", "product"),
    },
    {
      key: "testimonials",
      slug: "testimonials",
      title: "Testimonials",
      sections: heroSections("Testimonials", "Community Voices", "Stories from our Mountie family.", "team"),
    },
    {
      key: "faqs",
      slug: "faqs",
      title: "FAQs",
      sections: heroSections("FAQs", "Questions & Answers", "Everything you need to know.", "court"),
    },
    {
      key: "contact",
      slug: "contact",
      title: "Contact",
      sections: heroSections("Contact", "Get In Touch", "Reach Head Coach Tj Anderson.", "court"),
    },
    {
      key: "pricing",
      slug: "pricing",
      title: "Pricing",
      sections: [
        ...heroSections("Pricing", "Program Pricing", "Contact us for current rates.", "service"),
        section({
          id: "pricing-info",
          sectionType: "text",
          order: 1,
          body: "<p>Camp and training pricing may vary by season and availability. Gear pricing is listed on individual products in our shop. Contact Coach Anderson for program pricing.</p>",
          ctaLabel: "Contact for Pricing",
          ctaUrl: "/contact",
        }),
      ],
    },
  ];

  for (const page of pages) {
    await Page.findOneAndUpdate(
      { key: page.key },
      {
        key: page.key,
        slug: page.slug,
        title: page.title,
        status: "published",
        seo: page.seo,
        sections: page.sections,
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  console.log(`Seeded ${pages.length} pages.`);
}

async function seedServices() {
  const services = [
    {
      slug: "annual-youth-basketball-camp",
      title: "Annual Youth Basketball Camp",
      cardTitle: "Annual Youth Basketball Camp",
      cardDescription:
        "A high-energy camp focused on fundamentals, competitive drills, and Mountie team culture.",
      cardImage: PLACEHOLDER("service", "Youth basketball camp"),
      cardCtaLabel: "Learn More",
      order: 0,
      intro:
        "<p>Our annual youth camp welcomes athletes looking to improve skills, compete, and learn the Mountie standard. Contact Coach Anderson for current pricing and dates.</p>",
      benefits: [
        { title: "Fundamentals", description: "Ball handling, shooting, and defensive basics." },
        { title: "Competition", description: "Scrimmages and situational drills." },
        { title: "Character", description: "Teamwork and sportsmanship emphasized daily." },
      ],
      audience: {
        title: "Who Should Attend",
        items: ["Youth athletes", "Beginner to intermediate skill levels", "Families in Central PA"],
      },
      schedule: {
        title: "Schedule",
        description: "Dates announced seasonally — contact for details.",
      },
      whatToBring: ["Athletic shoes", "Water bottle", "Practice gear"],
    },
    {
      slug: "youth-basketball-training-and-development",
      title: "Youth Basketball Training and Development",
      cardTitle: "Youth Training & Development",
      cardDescription:
        "Structured training sessions designed to elevate skill, IQ, and confidence on the court.",
      cardImage: PLACEHOLDER("court", "Youth training session"),
      cardCtaLabel: "Learn More",
      order: 1,
      intro:
        "<p>Ongoing training and development for youth athletes who want to grow with Mountie Basketball. Contact for pricing and session availability.</p>",
      benefits: [
        { title: "Skill Development", description: "Position-specific and all-around training." },
        { title: "Film & Feedback", description: "Coaching feedback to accelerate growth." },
        { title: "Pathway", description: "Preparation for school and competitive play." },
      ],
      audience: {
        title: "Intended Audience",
        items: ["Youth players", "Parents seeking structured development"],
      },
      whatToBring: ["Basketball shoes", "Water", "Notebook optional"],
    },
  ];

  for (const svc of services) {
    await Service.findOneAndUpdate(
      { slug: svc.slug },
      { ...svc, status: "published" },
      { upsert: true, returnDocument: "after" },
    );
  }

  console.log(`Seeded ${services.length} services.`);
}

async function seedGallery() {
  const categories = [
    { slug: "game-day", name: "Game Day", order: 0 },
    { slug: "practice", name: "Practice", order: 1 },
    { slug: "community", name: "Community", order: 2 },
  ];

  for (const cat of categories) {
    await GalleryCategory.findOneAndUpdate(
      { slug: cat.slug },
      {
        ...cat,
        description: `${cat.name} moments — replace with official photography.`,
        coverImage: PLACEHOLDER("gallery", cat.name),
        status: "published",
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  const images = [
    { slug: "game-day-1", categorySlug: "game-day", title: "Arena Lights" },
    { slug: "game-day-2", categorySlug: "game-day", title: "Tip Off" },
    { slug: "practice-1", categorySlug: "practice", title: "Training Session" },
    { slug: "practice-2", categorySlug: "practice", title: "Skill Work" },
    { slug: "community-1", categorySlug: "community", title: "Mountie Supporters" },
    { slug: "community-2", categorySlug: "community", title: "Community Night" },
  ];

  for (const [index, img] of images.entries()) {
    await GalleryImage.findOneAndUpdate(
      { slug: img.slug },
      {
        ...img,
        caption: `[Draft placeholder] ${img.title} — replace via admin.`,
        image: PLACEHOLDER("gallery", img.title),
        order: index,
        featured: index < 3,
        status: "published",
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  console.log("Gallery seeded.");
}

async function seedTestimonials() {
  await Testimonial.deleteMany({
    slug: { $in: ["parent-draft-1", "player-draft-1", "alumni-draft-1"] },
  });

  const items = [
    {
      slug: "jennifer-m-parent",
      authorName: "Jennifer M.",
      authorRole: "Parent",
      quote:
        "Coach Anderson and the Mountie staff have been incredible for our son. The emphasis on accountability and teamwork shows up at home and in the classroom, not just on the court.",
      featured: true,
    },
    {
      slug: "marcus-t-player",
      authorName: "Marcus T.",
      authorRole: "Player",
      quote:
        "Training with Mountie Basketball changed how I approach every drill. The coaches push you to compete with purpose and respect your teammates.",
    },
    {
      slug: "david-lisa-r-parents",
      authorName: "David & Lisa R.",
      authorRole: "Parents",
      quote:
        "The youth camp was organized, high-energy, and genuinely focused on development. Our daughter came home excited to keep working on her game.",
    },
    {
      slug: "ryan-k-alumni",
      authorName: "Ryan K.",
      authorRole: "Alumni",
      quote:
        "Mountie Basketball stays connected to this community. The program builds relationships that last well beyond high school.",
    },
    {
      slug: "amanda-s-parent",
      authorName: "Amanda S.",
      authorRole: "Parent",
      quote:
        "From day one, the Mounties made our family feel welcome. It's more than basketball — it's pride in Philipsburg-Osceola and Central Pennsylvania.",
    },
  ];

  for (const [index, item] of items.entries()) {
    await Testimonial.findOneAndUpdate(
      { slug: item.slug },
      {
        ...item,
        authorPhoto: PLACEHOLDER("team", item.authorName),
        order: index,
        status: "published",
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  console.log("Testimonials seeded.");
}

async function seedFaqs() {
  const faqs = [
    {
      slug: "how-to-register-camp",
      category: "Programs",
      question: "How do I register for the youth camp?",
      answer:
        "Contact Head Coach Tj Anderson by email or phone for current camp dates, availability, and pricing.",
    },
    {
      slug: "program-pricing",
      category: "Programs",
      question: "What does camp or training cost?",
      answer:
        "Program pricing varies by season. Please contact Coach Anderson for the most current rates.",
    },
    {
      slug: "gear-orders",
      category: "Shop",
      question: "How do I order Mountie gear?",
      answer:
        "Browse products in our shop and use the contact link on each item to place an order.",
    },
    {
      slug: "who-can-join",
      category: "General",
      question: "Who can participate in Mountie programs?",
      answer:
        "Our youth camps and training programs are open to athletes in the community. Contact us to find the right fit.",
    },
  ];

  for (const [index, faq] of faqs.entries()) {
    await FAQ.findOneAndUpdate(
      { slug: faq.slug },
      { ...faq, order: index, status: "published" },
      { upsert: true, returnDocument: "after" },
    );
  }

  console.log("FAQs seeded.");
}

async function seedNews() {
  const posts = [
    {
      slug: "welcome-to-mountie-basketball",
      title: "Welcome to the Official Mountie Basketball Site",
      excerpt:
        "Our new digital home for programs, news, camp updates, and community stories from Philipsburg-Osceola Mountie Basketball.",
      content: `<p>We are proud to launch the official online home of Philipsburg-Osceola Mountie Basketball — a place where families, players, alumni, and supporters can stay connected to everything happening in our program.</p>
<p>Whether you are interested in our Annual Youth Basketball Camp, ongoing training and development sessions, or following the latest news from the Mounties, this site is designed to keep our community informed and engaged.</p>
<h2>What You Will Find Here</h2>
<p>Throughout the season, we will share program announcements, camp registration information, coaching updates, and stories that highlight the character and commitment of our athletes. Our goal is simple: make it easy for you to learn about our programs, connect with Coach Anderson, and support Mountie Basketball.</p>
<ul>
<li>Program details for youth camp and training</li>
<li>Team and coaching staff information</li>
<li>News, updates, and community highlights</li>
<li>Contact information for questions and registration</li>
</ul>
<h2>Looking Ahead</h2>
<p>We are building toward our target launch in October 2026, and this website will continue to grow with new content, photography, and updates from the court and the classroom. If you have questions about getting involved — as a player, parent, volunteer, or supporter — we invite you to reach out anytime.</p>
<p><strong>ONE TEAM. ONE GOAL. ONE PURPOSE.</strong> Thank you for being part of the Mountie family.</p>`,
      authorName: "Mountie Basketball Staff",
      tags: ["announcement", "community"],
    },
    {
      slug: "youth-camp-information",
      title: "Youth Camp Information Available On Request",
      excerpt:
        "Families can contact Head Coach Tj Anderson for current youth camp dates, availability, and registration details.",
      content: `<p>Registration and scheduling details for the Annual Youth Basketball Camp are shared directly with interested families. We want to make sure every parent and athlete receives accurate, up-to-date information about dates, session structure, and what to expect on day one.</p>
<h2>About The Camp</h2>
<p>Our youth camp is built around fundamentals, competitive energy, and Mountie team culture. Athletes can expect a structured environment focused on ball handling, shooting, defensive principles, and game situations — all while emphasizing teamwork, discipline, and respect.</p>
<p>Each session is designed to challenge players at their current level while giving them clear feedback they can apply throughout the season and in our training programs.</p>
<h2>Who Should Attend</h2>
<p>The camp welcomes youth athletes who want to improve their game and learn what it means to compete as a Mountie. If you are unsure whether the camp is the right fit for your athlete, Coach Anderson is happy to discuss skill level, goals, and recommended next steps.</p>
<ul>
<li>Youth athletes looking to build strong fundamentals</li>
<li>Players preparing for school or competitive seasons</li>
<li>Families seeking a structured, character-driven camp experience</li>
</ul>
<h2>How To Register</h2>
<p>Camp pricing and dates may vary by season. To request the latest information, please contact Head Coach Tj Anderson by email or phone. When you reach out, include your athlete’s name, grade, and any questions you have about scheduling or program fit.</p>
<p>We look forward to welcoming the next generation of Mounties to the gym.</p>`,
      authorName: "Tj Anderson",
      tags: ["camp", "youth", "registration"],
    },
  ];

  for (const post of posts) {
    await BlogPost.findOneAndUpdate(
      { slug: post.slug },
      {
        ...post,
        coverImage: PLACEHOLDER("news", post.title),
        status: "published",
        publishedAt: new Date(),
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  console.log("News posts seeded.");
}

async function seedTeam() {
  await TeamMember.findOneAndUpdate(
    { slug: "tj-anderson" },
    {
      slug: "tj-anderson",
      name: "Tj Anderson",
      role: "Head Coach",
      bio: "Head Coach of Philipsburg-Osceola Mountie Basketball, focused on player development, discipline, and community.",
      photo: PLACEHOLDER("team", "Head Coach Tj Anderson"),
      email: "Tjandersty@gmail.com",
      phone: "814-500-8613",
      order: 0,
      status: "published",
    },
    { upsert: true, returnDocument: "after" },
  );

  console.log("Team seeded.");
}

async function seedProducts() {
  const products = [
    {
      slug: "mountie-practice-tee",
      name: "Mountie Practice Tee",
      description: "Sample practice tee — replace with official merchandise details.",
      price: 25,
      images: [PLACEHOLDER("product", "Mountie Practice Tee")],
      inventory: 50,
      order: 0,
    },
    {
      slug: "mountie-hoodie",
      name: "Mountie Hoodie",
      description: "Sample hoodie listing — contact to order.",
      price: 45,
      compareAtPrice: 55,
      images: [PLACEHOLDER("product", "Mountie Hoodie")],
      inventory: 30,
      order: 1,
    },
  ];

  for (const product of products) {
    await Product.findOneAndUpdate(
      { slug: product.slug },
      { ...product, status: "published" },
      { upsert: true, returnDocument: "after" },
    );
  }

  console.log("Products seeded.");
}

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  await seedAdmin();
  await seedSettings();
  await seedPages();
  await seedServices();
  await seedGallery();
  await seedTestimonials();
  await seedFaqs();
  await seedNews();
  await seedTeam();
  await seedProducts();

  console.log("Seed completed successfully.");
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
