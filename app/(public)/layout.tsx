import type { ReactNode } from "react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { getSiteSettings } from "@/lib/data/settings";

export default async function PublicRouteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const settings = await getSiteSettings();

  return <PublicLayout settings={settings}>{children}</PublicLayout>;
}
