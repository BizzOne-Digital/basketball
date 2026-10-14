/** Avoid failing `next build` when MongoDB is not reachable (e.g. local CI). */
export async function safeStaticParams<T>(
  loader: () => Promise<T[]>,
): Promise<T[]> {
  try {
    return await loader();
  } catch {
    console.warn(
      "Database unavailable during static generation; skipping dynamic routes for this build.",
    );
    return [];
  }
}
