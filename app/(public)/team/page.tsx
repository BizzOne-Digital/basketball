import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamRedirectPage() {
  redirect("/coaching-staff");
}
