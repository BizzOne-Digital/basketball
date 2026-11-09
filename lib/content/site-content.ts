import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import SiteContent from "@/models/SiteContent";
import {
  CONTENT_DEFAULTS,
  type ContentKey,
  type ContentMap,
} from "@/lib/content/registry";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Layers saved content on top of the defaults. Objects are merged key by key
 * (so fields added to the defaults later still appear); arrays and primitives
 * from the saved copy replace the default outright. Keyed records such as
 * "season -> roster" are taken from the saved copy as a whole so that entries
 * removed in the admin stay removed.
 */
export function mergeContent(base: unknown, saved: unknown): unknown {
  if (saved === undefined || saved === null) {
    return base;
  }

  if (isPlainObject(base) && isPlainObject(saved)) {
    const baseKeys = Object.keys(base);
    const savedKeys = Object.keys(saved);
    const isKeyedRecord =
      baseKeys.length > 1 &&
      baseKeys.every((key) => typeof base[key] === "object" && base[key] !== null) &&
      baseKeys.every((key) => /\d/.test(key));

    if (isKeyedRecord) {
      return savedKeys.length > 0 ? saved : base;
    }

    const result: Record<string, unknown> = { ...base };
    for (const key of savedKeys) {
      result[key] = mergeContent(base[key], saved[key]);
    }
    return result;
  }

  if (base === undefined) {
    return saved;
  }

  if (Array.isArray(base) !== Array.isArray(saved) || typeof base !== typeof saved) {
    return base;
  }

  return saved;
}

const loadSaved = cache(async (key: string): Promise<unknown> => {
  try {
    await connectDB();
    const doc = await SiteContent.findOne({ key }).lean<{ data: unknown }>();
    return doc?.data ?? null;
  } catch (error) {
    console.warn(`Using default content for "${key}" (database unavailable).`, error);
    return null;
  }
});

export async function getContent<K extends ContentKey>(
  key: K,
): Promise<ContentMap[K]> {
  const defaults = CONTENT_DEFAULTS[key];
  const saved = await loadSaved(key);
  return mergeContent(defaults, saved) as ContentMap[K];
}

export async function getSavedContent(key: ContentKey): Promise<unknown> {
  return loadSaved(key);
}
