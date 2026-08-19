import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/data/blog";
import { getPublishedProducts } from "@/lib/data/products";
import { getPublishedServices } from "@/lib/data/services";
import { SEASONS, seasonHref } from "@/lib/content/seasons";
import {
  getOpponentGymGalleries,
  gymHref,
} from "@/lib/content/opponent-gym-galleries";
import { SITE_URL } from "@/lib/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, products, gymGalleries] = await Promise.all([
    getPublishedServices(),
    getPublishedPosts(),
    getPublishedProducts(),
    getOpponentGymGalleries(),
  ]);

  const staticRoutes = [
    "",
    "/meet-the-mounties",
    "/schedule",
    "/coaching-staff",
    "/team-philosophy",
    "/join-our-team",
    "/support",
    "/sponsors",
    "/cash-bash",
    "/fundraising",
    "/xmas-tournament",
    "/opponent-gyms",
    "/record-book",
    "/record-book/thousand-point-scorers",
    "/record-book/award-winners",
    "/alumni",
    "/central-pa-lions",
    "/related-sites",
    "/news",
    "/contact",
    "/about",
    "/services",
    "/shop",
    "/testimonials",
    "/faqs",
    "/pricing",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const seasonRoutes = SEASONS.map((season) => ({
    url: `${SITE_URL}${seasonHref(season.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const gymRoutes = gymGalleries.map((gallery) => ({
    url: `${SITE_URL}${gymHref(gallery.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: post.publishedAt ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...seasonRoutes,
    ...gymRoutes,
    ...serviceRoutes,
    ...postRoutes,
    ...productRoutes,
  ];
}
