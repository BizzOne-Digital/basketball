"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/session";
import { CONTENT_DEFAULTS, isContentKey } from "@/lib/content/registry";
import { mergeContent } from "@/lib/content/site-content";
import { collectUploadUrls } from "@/lib/uploads/collect-urls";
import { deleteStoredUploadByUrl } from "@/lib/uploads/stored-uploads";
import SiteContent from "@/models/SiteContent";
import { actionError, type ActionResult } from "./shared";

const MAX_CONTENT_BYTES = 1_000_000;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function getContentEditorData(key: string) {
  await requireAdmin();

  if (!isContentKey(key)) {
    return null;
  }

  await connectDB();
  const saved = await SiteContent.findOne({ key }).lean<{ data: unknown }>();

  return {
    key,
    data: JSON.parse(
      JSON.stringify(mergeContent(CONTENT_DEFAULTS[key], saved?.data ?? null)),
    ) as unknown,
    customized: Boolean(saved),
  };
}

export async function getCustomizedContentKeys(): Promise<string[]> {
  await requireAdmin();
  await connectDB();
  const docs = await SiteContent.find().select("key").lean<{ key: string }[]>();
  return docs.map((doc) => doc.key);
}

export async function saveSiteContent(
  key: string,
  data: unknown,
): Promise<ActionResult> {
  try {
    await requireAdmin();

    if (!isContentKey(key)) {
      return { success: false, error: "Unknown content block." };
    }

    const defaults = CONTENT_DEFAULTS[key] as unknown;

    const validShape = Array.isArray(defaults)
      ? Array.isArray(data)
      : isPlainObject(data);

    if (!validShape) {
      return { success: false, error: "Content has an invalid structure." };
    }

    const serialized = JSON.stringify(data);

    if (serialized.length > MAX_CONTENT_BYTES) {
      return { success: false, error: "Content is too large to save." };
    }

    const clean = JSON.parse(serialized) as unknown;

    await connectDB();
    const previous = await SiteContent.findOne({ key }).lean<{ data: unknown }>();

    await SiteContent.findOneAndUpdate(
      { key },
      { $set: { data: clean } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );

    // Remove uploaded images that this save no longer references.
    const stillUsed = new Set(collectUploadUrls(clean));
    for (const url of collectUploadUrls(previous?.data)) {
      if (!stillUsed.has(url)) {
        await deleteStoredUploadByUrl(url).catch(() => false);
      }
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function resetSiteContent(key: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    if (!isContentKey(key)) {
      return { success: false, error: "Unknown content block." };
    }

    await connectDB();
    const previous = await SiteContent.findOneAndDelete({ key }).lean<{
      data: unknown;
    }>();

    for (const url of collectUploadUrls(previous?.data)) {
      await deleteStoredUploadByUrl(url).catch(() => false);
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
