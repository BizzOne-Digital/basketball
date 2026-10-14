# Philipsburg-Osceola Mountie Basketball

Production-quality website and custom CMS for **Philipsburg-Osceola Mountie Basketball** — a cinematic public site with a full admin portal, MongoDB content management, and local image uploads.

## Technology Stack

- **Next.js 16** (App Router) + **TypeScript** (strict)
- **Tailwind CSS 4** — brand-driven cinematic UI
- **MongoDB** + **Mongoose** — local database (`mountie-basketball`)
- **NextAuth / Auth.js** — credentials-based admin authentication
- **Framer Motion**, **GSAP + ScrollTrigger**, **Lenis** — motion and smooth scroll
- **React Hook Form** + **Zod** — validation
- **Sharp** — local image processing (WebP)
- **Sonner** — toast notifications
- **Swiper** — sliders where appropriate

## Prerequisites

- **Node.js 20+**
- **MongoDB** running locally on `127.0.0.1:27017`
- **MongoDB Compass** (optional, for inspecting data)

## MongoDB Setup

1. Install and start MongoDB locally.
2. Connection string:

```
mongodb://127.0.0.1:27017/mountie-basketball
```

### MongoDB Compass

1. Open MongoDB Compass.
2. Connect with: `mongodb://127.0.0.1:27017`
3. Select database: **`mountie-basketball`**
4. Collections include: `pages`, `services`, `blogposts`, `products`, `sitesettings`, `adminusers`, etc.

## Environment Setup

Copy the example env file and adjust values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Local MongoDB connection |
| `AUTH_SECRET` | Long random string for session signing |
| `ADMIN_EMAIL` | Initial admin email (seed script) |
| `ADMIN_PASSWORD` | Initial admin password (seed script) |
| `NEXT_PUBLIC_SITE_URL` | Public URL (e.g. `http://localhost:3000`) |

**Never commit `.env.local` or real credentials.**

## Installation

```bash
npm install
```

## Seeding

Idempotent seed — safe to run multiple times:

```bash
npm run seed
```

Creates:

- Admin user
- Site settings (contact, social, announcement bar)
- All CMS pages (home, about, programs, team, gallery, news, shop, testimonials, FAQs, contact, pricing)
- Two youth programs/services
- Sample gallery, testimonials, FAQs, news, team, products

## Development

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin portal: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Admin Login

After seeding, sign in with the credentials from `.env.local`:

- **Email:** value of `ADMIN_EMAIL` (default `admin@mountiebasketball.com`)
- **Password:** value of `ADMIN_PASSWORD`

Change these before any production deployment.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run seed` | Seed / update MongoDB content |

## Project Structure

```
app/
  (public)/          # Public routes (home, about, services, etc.)
  admin/             # Protected CMS admin portal
  api/               # Auth, upload, contact endpoints
components/
  public/            # Public UI components
  admin/             # Admin UI components
  motion/            # Cinematic intro, transitions, Lenis
  cms/               # Section renderer registry
lib/
  db/                # MongoDB connection
  auth/              # NextAuth + session helpers
  data/              # Cached server data fetchers
  actions/           # Server actions (admin + contact)
  uploads/           # Local file upload pipeline
  validation/        # Zod schemas
models/              # Mongoose schemas
public/uploads/      # Uploaded media (organized by type)
scripts/seed.ts      # Database seed command
```

## Local Image Uploads

Images upload to **`public/uploads/`** in subfolders:

- `pages/`, `services/`, `gallery/`, `blogs/`, `team/`, `testimonials/`, `products/`, `settings/`

Paths stored in MongoDB as normalized relative paths, e.g. `/uploads/gallery/example.webp`.

Uploads are validated (MIME type, size, path traversal prevention), processed with Sharp, and given collision-safe filenames.

### Deployment Warning

**Local uploads require a persistent Node.js server filesystem.** On read-only or ephemeral serverless hosts (Vercel default, etc.), uploaded files will **not** persist unless you mount persistent storage or use an external volume. Back up both MongoDB and `public/uploads/` together.

## Backup Guidance

1. **MongoDB:** `mongodump --uri="mongodb://127.0.0.1:27017/mountie-basketball" --out=./backup`
2. **Uploads:** Copy `public/uploads/` directory
3. Restore both together to keep content and images in sync

## Public Routes

| Route | Description |
|-------|-------------|
| `/` | Cinematic homepage |
| `/about` | Program story and values |
| `/services` | Programs listing |
| `/services/[slug]` | Program detail (auto from CMS) |
| `/team` | Coaching staff and roster |
| `/gallery` | Filterable gallery + lightbox |
| `/news` | News/blog grid |
| `/news/[slug]` | Article detail |
| `/shop` | Gear catalog |
| `/shop/[slug]` | Product detail |
| `/testimonials` | Testimonials |
| `/faqs` | FAQ accordions |
| `/contact` | Contact form + settings-driven info |
| `/pricing` | Contact-for-pricing info |

## Admin Routes

Protected at `/admin/*` (login at `/admin/login`):

Dashboard, Pages, Services, Gallery, Testimonials, FAQs, News, Team, Products, Contact Submissions, Settings.

## Settings Propagation

Contact email, phone, social links, announcement bar, and footer content come from the **singleton Settings** document. Updating Settings in admin automatically updates the **footer** and **Contact page**.

## Motion & Accessibility

- First-visit cinematic intro (skippable, stored in `sessionStorage`)
- Page transitions, scroll reveals, parallax (disabled on touch / reduced motion)
- `prefers-reduced-motion` honored — intro skipped, animations simplified

## Production Build

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Content Still Needed From Client

Replace draft/placeholder content with official assets:

- Final team and action photography
- Official merchandise images and pricing
- Verified program dates, schedules, and pricing
- Approved testimonials and news copy
- Licensed logo variants (Nike branding excluded unless provided)

Logo reference integrated at `public/images/mountie-logo.png`.

## Contact

**Head Coach:** Tj Anderson  
**Email:** Tjandersty@gmail.com  
**Phone:** 814-500-8613
