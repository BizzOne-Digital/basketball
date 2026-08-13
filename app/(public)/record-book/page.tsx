import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import {
  COACHING_RECORDS,
  RECORD_BOOK_SECTIONS,
} from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Record Book",
  description: "P-O Mountaineer Basketball team and individual records.",
};

export default function RecordBookPage() {
  return (
    <ProgramPageShell
      title="Record Book"
      description="Team, individual, and coaching records for Mountaineer Basketball."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Record Book" },
      ]}
    >
      <div className="space-y-12">
        <p className="max-w-3xl text-lg leading-8 text-mountie-silver">
          {RECORD_BOOK_SECTIONS.intro}
        </p>

        <section>
          <h2 className="mb-4 font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
            P-O Basketball Boys Program — The Last Two Decades
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gunmetal/50 text-xs uppercase tracking-[0.16em] text-ice-blue">
                <tr>
                  <th className="px-4 py-3">Coach</th>
                  <th className="px-4 py-3">Record</th>
                  <th className="px-4 py-3">Years</th>
                </tr>
              </thead>
              <tbody>
                {COACHING_RECORDS.map((row) => (
                  <tr key={row.coach} className="border-t border-white/10">
                    <td className="px-4 py-3 text-mountie-white">{row.coach}</td>
                    <td className="px-4 py-3 text-mountie-silver">{row.record}</td>
                    <td className="px-4 py-3 text-mountie-silver">{row.years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {[
          { title: "Team Stats", items: RECORD_BOOK_SECTIONS.team },
          { title: "Individual Stats", items: RECORD_BOOK_SECTIONS.individual },
          { title: "Coaches", items: RECORD_BOOK_SECTIONS.coaches },
        ].map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
              {section.title}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm text-mountie-silver"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ProgramPageShell>
  );
}
