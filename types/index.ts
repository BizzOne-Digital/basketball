import type { Types } from "mongoose";

export type ContentStatus = "draft" | "published";

export type SectionType =
  | "hero"
  | "text"
  | "image-text"
  | "cta"
  | "gallery"
  | "testimonials"
  | "faq"
  | "features"
  | "stats"
  | "schedule"
  | "custom"
  | "text-image"
  | "full-width-media"
  | "statistics"
  | "values-grid"
  | "cards-grid"
  | "quote"
  | "timeline"
  | "gallery-preview"
  | "testimonial-feature"
  | "CTA"
  | "custom-editorial-split";

export type ImagePosition = "left" | "right" | "top" | "background" | "center";

export type SectionTheme = "light" | "dark" | "brand" | "neutral" | string;

export interface ImageObject {
  path: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface CTA {
  label: string;
  url: string;
}

export interface SEO {
  title?: string;
  description?: string;
  ogImage?: ImageObject;
  noIndex?: boolean;
}

export interface PageSection {
  id: string;
  sectionType: SectionType;
  eyebrow?: string;
  heading?: string;
  body?: string;
  image?: ImageObject;
  imageAlt?: string;
  imagePosition?: ImagePosition;
  secondaryImage?: ImageObject;
  ctaLabel?: string;
  ctaUrl?: string;
  theme?: SectionTheme;
  layoutVariant?: string;
  order: number;
  enabled: boolean;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
}

export interface CoachInfo {
  name: string;
  title?: string;
  bio?: string;
  photo?: ImageObject;
  email?: string;
  phone?: string;
}

export interface AnnouncementBar {
  enabled: boolean;
  message?: string;
  linkUrl?: string;
  linkLabel?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface SiteSettingsDocument {
  singletonKey: "default";
  organizationName: string;
  headline?: string;
  tagline?: string;
  logo?: ImageObject;
  favicon?: ImageObject;
  coach?: CoachInfo;
  socialLinks?: SocialLinks;
  announcementBar?: AnnouncementBar;
  defaultSeo?: SEO;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  footerText?: string;
}

export interface PageDocument {
  key: string;
  slug: string;
  title: string;
  status: ContentStatus;
  seo?: SEO;
  sections: PageSection[];
}

export interface ServiceBenefit {
  title: string;
  description?: string;
  icon?: string;
}

export interface ServiceAudience {
  title?: string;
  description?: string;
  items?: string[];
}

export interface ServiceScheduleItem {
  day?: string;
  time?: string;
  location?: string;
}

export interface ServiceSchedule {
  title?: string;
  description?: string;
  items?: ServiceScheduleItem[];
}

export interface ServiceDocument {
  slug: string;
  title: string;
  status: ContentStatus;
  cardTitle?: string;
  cardDescription?: string;
  cardImage?: ImageObject;
  cardCtaLabel?: string;
  order?: number;
  seo?: SEO;
  hero?: PageSection;
  intro?: string;
  detailSections?: PageSection[];
  benefits?: ServiceBenefit[];
  audience?: ServiceAudience;
  schedule?: ServiceSchedule;
  whatToBring?: string[];
  relatedImages?: ImageObject[];
}

export interface GalleryCategoryDocument {
  slug: string;
  name: string;
  description?: string;
  coverImage?: ImageObject;
  order?: number;
  status: ContentStatus;
}

export interface GalleryImageDocument {
  slug: string;
  title?: string;
  caption?: string;
  image: ImageObject;
  categorySlug: string;
  order?: number;
  status: ContentStatus;
  featured?: boolean;
}

export interface TestimonialDocument {
  slug: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: ImageObject;
  quote: string;
  rating?: number;
  order?: number;
  status: ContentStatus;
  featured?: boolean;
}

export interface FAQDocument {
  slug: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  status: ContentStatus;
}

export interface BlogPostDocument {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: ImageObject;
  authorName?: string;
  publishedAt?: Date;
  tags?: string[];
  status: ContentStatus;
  seo?: SEO;
}

export interface TeamMemberDocument {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  photo?: ImageObject;
  email?: string;
  phone?: string;
  order?: number;
  status: ContentStatus;
}

export interface ProductDocument {
  slug: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  images?: ImageObject[];
  sku?: string;
  inventory?: number;
  order?: number;
  status: ContentStatus;
  seo?: SEO;
}

export interface ContactSubmissionDocument {
  name: string;
  email: string;
  phone?: string;
  programInterest?: string;
  message: string;
  consent: boolean;
  read: boolean;
  honeypot?: string;
}

export interface AdminUserDocument {
  email: string;
  passwordHash: string;
  name: string;
  role: "admin" | "editor";
  active: boolean;
}

export interface PlayerRosterDocument {
  slug: string;
  name: string;
  grade: "Freshman" | "Sophomore" | "Junior" | "Senior";
  jerseyNumber?: number;
  position?: string;
  height?: string;
  headshot?: ImageObject;
  bio?: string;
  season: string;
  order?: number;
  status: ContentStatus;
}

export interface SponsorDocument {
  slug: string;
  name: string;
  logo?: ImageObject;
  websiteUrl?: string;
  tier: "platinum" | "gold" | "silver" | "bronze" | "supporter";
  season: string;
  description?: string;
  order?: number;
  status: ContentStatus;
}

export interface OpponentGymDocument {
  slug: string;
  schoolName: string;
  address: string;
  logo?: ImageObject;
  mapUrl?: string;
  websiteUrl?: string;
  order?: number;
  status: ContentStatus;
}

export interface AlumniSpotlightDocument {
  slug: string;
  name: string;
  graduationYear: number;
  photo?: ImageObject;
  position?: string;
  bio?: string;
  achievements?: string[];
  careerHighlights?: string;
  currentStatus?: string;
  featured?: boolean;
  order?: number;
  seo?: SEO;
  status: ContentStatus;
}

export interface RecordBookDocument {
  category: "team" | "individual" | "coaching";
  recordType: string;
  subcategory?: string;
  recordHolder?: string;
  value: string;
  season?: string;
  opponent?: string;
  date?: string;
  notes?: string;
  order?: number;
  status: ContentStatus;
}

export interface CoachingRecordDocument {
  coachName: string;
  yearsCoached: string;
  wins: number;
  losses: number;
  winPercentage?: number;
  photo?: ImageObject;
  achievements?: string[];
  bio?: string;
  order?: number;
  status: ContentStatus;
}

export type DocumentId = Types.ObjectId;

/** @deprecated Use SectionType */
export type PageSectionType = SectionType;
