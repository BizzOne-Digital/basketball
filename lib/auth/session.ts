import type { Session } from "next-auth";
import { auth } from "@/lib/auth/auth";

export async function getSession(): Promise<Session | null> {
  return auth();
}

export async function requireAdmin(): Promise<Session> {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "admin" && session.user.role !== "editor") {
    throw new Error("Forbidden");
  }

  return session;
}

export async function requireRole(role: "admin" | "editor"): Promise<Session> {
  const session = await requireAdmin();

  if (role === "admin" && session.user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return session;
}
