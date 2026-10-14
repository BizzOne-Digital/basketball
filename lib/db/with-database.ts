import { connectDB } from "@/lib/db/connect";

export async function withDatabase<T>(
  operation: () => Promise<T>,
  fallback: T,
  label = "Database unavailable.",
): Promise<T> {
  try {
    await connectDB();
    return await operation();
  } catch (error) {
    console.warn(label, error);
    return fallback;
  }
}
