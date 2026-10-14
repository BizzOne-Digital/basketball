import type { Metadata } from "next";
import Link from "next/link";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { getPublishedRecordsByCategory } from "@/lib/data/records";
import {
  COACHING_RECORDS,
  RECORD_BOOK_SECTIONS,
} from "@/lib/content/mountie-program";

export const metadata: Metadata = {
  title: "Record Book",
  description: "Philipsburg-Osceola Mountaineer Basketball records and achievements.",
};

export default async function RecordBookPage() {
  const [teamRecords, individualRecords] = await Promise.all([
    getPublishedRecordsByCategory("team"),
    getPublishedRecordsByCategory("individual"),
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
          <h2 className="mb-3 font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
            {RECORD_BOOK_SECTIONS.coachingHeading}
          </h2>
          <p className="mb-6 font-display text-lg uppercase tracking-[0.06em] text-mountie-white">
            ‼️{RECORD_BOOK_SECTIONS.coachingSubtitle}‼️
          </p>
          <ul className="space-y-3">
            {COACHING_RECORDS.map((coach) => (
              <li
                key={coach.coach}
                className="rounded-xl border border-white/10 bg-gunmetal/20 px-5 py-4 text-base leading-7 text-mountie-silver"
              >
                <span className="font-semibold text-mountie-white">
                  {coach.coach}
                </span>{" "}
                Record:{" "}
                <span className="font-semibold text-ice-blue">
                  {coach.record}
                </span>{" "}
                Years:{" "}
                <span className="font-semibold text-mountie-white">
                  {coach.years}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-8">
          <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
            1,000 Career Points Scorers
          </h2>
          <p className="mt-4 text-base leading-8 text-mountie-silver">
            P-O 1,000 Point Scores — six Mountaineers have reached the 1,000-point
            club, including two under Coach Anderson in the last six years.
          </p>
          <Link
            href="/record-book/thousand-point-scorers"
            className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:underline"
          >
            View 1,000 Point Scorers →
          </Link>
        </section>

        <section className="rounded-2xl border border-ice-blue/30 bg-mountie-blue/10 p-8">
          <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-ice-blue">
            Award Winners Through The Years
          </h2>
          <p className="mt-4 text-base leading-8 text-mountie-silver">
            Mountain League and program award winners, organized by season with
            photos for each honoree.
          </p>
          <Link
            href="/record-book/award-winners"
            className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:underline"
          >
            View Award Winners →
          </Link>
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
