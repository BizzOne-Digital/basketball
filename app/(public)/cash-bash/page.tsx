import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { CASH_BASH } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "PO Elementary Boys Basketball Cash Bash",
  description: "Cash Bash raffle and fundraising event for Mountie youth basketball.",
};

export default function CashBashPage() {
  return (
    <ProgramPageShell
      title={CASH_BASH.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cash Bash" },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href={CASH_BASH.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-ice-blue hover:underline"
        >
          Facebook: {CASH_BASH.facebookLabel}
          <ExternalLink size={14} />
        </Link>
        {CASH_BASH.highlights.map((item) => (
          <p key={item} className="text-lg leading-8 text-mountie-silver">
            {item}
          </p>
        ))}
      </div>
    </ProgramPageShell>
  );
}
