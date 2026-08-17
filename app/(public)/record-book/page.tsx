import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { getPublishedRecordsByCategory, getCoachingRecords } from "@/lib/data/records";
import { RECORD_BOOK_SECTIONS } from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Record Book",
  description: "Philipsburg-Osceola Mountaineer Basketball records and achievements.",
};

export default async function RecordBookPage() {
  const [teamRecords, individualRecords, coachingRecords] = await Promise.all([
    getPublishedRecordsByCategory("team"),
    getPublishedRecordsByCategory("individual"),
    getCoachingRecords(),
  ]);

  return (
    <ProgramPageShell
      title="Record Book"
      description="Team, Individual, and Coaching Records"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Record Book" },
      ]}
    >
      <div className="space-y-12">
        <div className="rounded-xl border border-white/10 bg-mountie-blue/10 p-6">
          <p className="text-sm leading-7 text-mountie-silver">
            {RECORD_BOOK_SECTIONS.intro}
          </p>
        </div>

        {/* Coaching Records */}
        <section>
          <h2 className="mb-6 font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
            Coaching Records
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 pr-4 text-left text-xs uppercase tracking-wider text-mountie-silver">
                    Coach
                  </th>
                  <th className="pb-3 px-4 text-left text-xs uppercase tracking-wider text-mountie-silver">
                    Years
                  </th>
                  <th className="pb-3 px-4 text-left text-xs uppercase tracking-wider text-mountie-silver">
                    Record
                  </th>
                  <th className="pb-3 pl-4 text-left text-xs uppercase tracking-wider text-mountie-silver">
                    Win %
                  </th>
                </tr>
              </thead>
              <tbody>
                {coachingRecords.map((coach) => (
                  <tr key={coach.coachName} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-mountie-white">
                      {coach.coachName}
                    </td>
                    <td className="py-3 px-4 text-mountie-silver">
                      {coach.yearsCoached}
                    </td>
                    <td className="py-3 px-4 text-mountie-silver">
                      {coach.wins}-{coach.losses}
                    </td>
                    <td className="py-3 pl-4 text-mountie-silver">
                      {coach.winPercentage ? `${coach.winPercentage.toFixed(1)}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Team Records Categories */}
        <section>
          <h2 className="mb-6 font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
            Team Records
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RECORD_BOOK_SECTIONS.team.map((record) => (
              <div
                key={record}
                className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-3 text-sm text-mountie-silver"
              >
                {record}
              </div>
            ))}
          </div>
          {teamRecords.length > 0 ? (
            <div className="mt-6 space-y-3">
              {teamRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-midnight px-5 py-3"
                >
                  <span className="font-medium text-mountie-white">
                    {record.recordType}
                  </span>
                  <span className="text-ice-blue">{record.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {/* Individual Records Categories */}
        <section>
          <h2 className="mb-6 font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
            Individual Records
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RECORD_BOOK_SECTIONS.individual.map((record) => (
              <div
                key={record}
                className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-3 text-sm text-mountie-silver"
              >
                {record}
              </div>
            ))}
          </div>
          {individualRecords.length > 0 ? (
            <div className="mt-6 space-y-3">
              {individualRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-midnight px-5 py-3"
                >
                  <div>
                    <span className="font-medium text-mountie-white">
                      {record.recordType}
                    </span>
                    {record.recordHolder ? (
                      <span className="ml-2 text-sm text-mountie-silver">
                        — {record.recordHolder}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-ice-blue">{record.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <div className="rounded-xl border border-white/10 bg-gunmetal/20 p-6 text-sm text-mountie-silver">
          <p>
            Full stat documents from Google Drive will be linked here as they are finalized. Record book data can be managed through the admin portal.
          </p>
        </div>
      </div>
    </ProgramPageShell>
  );
}
