import { cache } from "react";
import { withDatabase } from "@/lib/db/with-database";
import Page from "@/models/Page";
import type { ContentStatus, PageDocument } from "@/types";

function serializePage(doc: PageDocument): PageDocument {
  return {
    key: doc.key,
    slug: doc.slug,
    title: doc.title,
    status: doc.status,
    seo: doc.seo,
    sections: doc.sections ?? [],
  };
}

export const getPageByKey = cache(
  async (
    key: string,
    options: { status?: ContentStatus } = {},
  ): Promise<PageDocument | null> => {
    return withDatabase(async () => {
      const query: Record<string, unknown> = {
        key: key.trim().toLowerCase(),
      };

      if (options.status) {
        query.status = options.status;
      }

      const page = await Page.findOne(query).lean<PageDocument>();

      if (!page) {
        return null;
      }

      return serializePage(page);
    }, null);
  },
);

export const getPublishedPageByKey = cache(
  async (key: string): Promise<PageDocument | null> => {
    return getPageByKey(key, { status: "published" });
  },
);

export const getPageBySlug = cache(
  async (
    slug: string,
    options: { status?: ContentStatus } = {},
  ): Promise<PageDocument | null> => {
    return withDatabase(async () => {
      const query: Record<string, unknown> = {
        slug: slug.trim().toLowerCase(),
      };

      if (options.status) {
        query.status = options.status;
      }

      const page = await Page.findOne(query).lean<PageDocument>();

      if (!page) {
        return null;
      }

      return serializePage(page);
    }, null);
  },
);
