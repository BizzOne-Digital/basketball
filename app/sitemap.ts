import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/data/blog";
import { getPublishedProducts } from "@/lib/data/products";
import { getPublishedServices } from "@/lib/data/services";
import { SITE_URL } from "@/lib/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, products] = await Promise.all([
    getPublishedServices(),
    getPublishedPosts(),
    getPublishedProducts(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/team",
    "/gallery",
    "/news",
    "/shop",
    "/testimonials",
    "/faqs",
    "/contact",
    "/pricing",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
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

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...productRoutes];
}
