"use server";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import {
  Page,
  Service,
  GalleryImage,
  Testimonial,
  FAQ,
  BlogPost,
  TeamMember,
  Product,
  ContactSubmission,
} from "@/models";
import SiteSettings from "@/models/SiteSettings";
import { actionError, type ActionResult } from "./shared";

export type DashboardStats = {
  pages: number;
  services: number;
  galleryImages: number;
  testimonials: number;
  faqs: number;
  blogPosts: number;
  teamMembers: number;
  products: number;
  unreadContacts: number;
  publishedContent: number;
  draftContent: number;
  recentlyUpdated: Array<{
    type: string;
    title: string;
    updatedAt: string;
  }>;
};

export async function getDashboardStats(): Promise<ActionResult<DashboardStats>> {
  try {
    await requireAdmin();
    await connectDB();

    const [
      pages,
      services,
      galleryImages,
      testimonials,
      faqs,
      blogPosts,
      teamMembers,
      products,
      unreadContacts,
      publishedPages,
      draftPages,
      publishedServices,
      draftServices,
      publishedPosts,
      draftPosts,
      recentPages,
      recentServices,
      recentPosts,
    ] = await Promise.all([
      Page.countDocuments(),
      Service.countDocuments(),
      GalleryImage.countDocuments(),
      Testimonial.countDocuments(),
      FAQ.countDocuments(),
      BlogPost.countDocuments(),
      TeamMember.countDocuments(),
      Product.countDocuments(),
      ContactSubmission.countDocuments({ read: false }),
      Page.countDocuments({ status: "published" }),
      Page.countDocuments({ status: "draft" }),
      Service.countDocuments({ status: "published" }),
      Service.countDocuments({ status: "draft" }),
      BlogPost.countDocuments({ status: "published" }),
      BlogPost.countDocuments({ status: "draft" }),
      Page.find().sort({ updatedAt: -1 }).limit(3).select("title updatedAt").lean(),
      Service.find().sort({ updatedAt: -1 }).limit(3).select("title updatedAt").lean(),
      BlogPost.find().sort({ updatedAt: -1 }).limit(3).select("title updatedAt").lean(),
    ]);

    const recentlyUpdated = [
      ...recentPages.map((p) => {
        const doc = p as typeof p & { updatedAt?: Date };
        return {
          type: "Page",
          title: p.title,
          updatedAt: doc.updatedAt?.toISOString?.() ?? "",
        };
      }),
      ...recentServices.map((s) => {
        const doc = s as typeof s & { updatedAt?: Date };
        return {
          type: "Service",
          title: s.title,
          updatedAt: doc.updatedAt?.toISOString?.() ?? "",
        };
      }),
      ...recentPosts.map((p) => {
        const doc = p as typeof p & { updatedAt?: Date };
        return {
          type: "News",
          title: p.title,
          updatedAt: doc.updatedAt?.toISOString?.() ?? "",
        };
      }),
    ]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 6);

    return {
      success: true,
      data: {
        pages,
        services,
        galleryImages,
        testimonials,
        faqs,
        blogPosts,
        teamMembers,
        products,
        unreadContacts,
        publishedContent: publishedPages + publishedServices + publishedPosts,
        draftContent: draftPages + draftServices + draftPosts,
        recentlyUpdated,
      },
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function getSiteIdentity(): Promise<
  ActionResult<{ organizationName: string; headline: string }>
> {
  try {
    await requireAdmin();
    await connectDB();
    const settings = await SiteSettings.findOne({ singletonKey: "default" }).lean();
    return {
      success: true,
      data: {
        organizationName: settings?.organizationName ?? "Mountie Basketball",
        headline: settings?.headline ?? "MOUNTAINEER BASKETBALL",
      },
    };
  } catch (error) {
    return actionError(error);
  }
}
