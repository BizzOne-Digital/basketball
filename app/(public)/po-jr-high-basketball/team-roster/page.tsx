import { redirect } from "next/navigation";
import { DEFAULT_JR_HIGH_SEASON } from "@/lib/content/jr-high-basketball";

export default function LegacyJrHighRosterRedirect() {
  redirect(`/po-jr-high-basketball/${DEFAULT_JR_HIGH_SEASON}/team-roster`);
}
