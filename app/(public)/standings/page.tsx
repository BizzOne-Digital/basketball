import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { getContent } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "P-O Select League Standings",
  description: "Weekly standings for the P-O Select Elementary Winter League.",
};

export default async function StandingsPage() {
  const content = await getContent("select-standings");
  return (
    <ProgramPageShell
      title={content.title}
      description={`Updated ${content.updated}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Select League Standings" },
      ]}
    >
      <div className="rounded-xl border border-white/10 bg-mountie-blue/10 p-6">
        <p className="text-sm leading-7 text-mountie-silver">{content.intro}</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {content.divisions.map((d) => (
          <section
            key={d.id}
            className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.06em] text-mountie-white">
              {d.title}
            </h2>
            <p className="mt-1 text-sm text-ice-blue">{d.asOf}</p>
            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 font-display uppercase tracking-[0.12em] text-ice-blue">
                  <th className="py-2">Team</th>
                  <th className="py-2 text-right">W-L</th>
                </tr>
              </thead>
              <tbody>
                {d.rows.map((r) => (
                  <tr
                    key={r.team}
                    className={`border-b border-white/5 ${r.highlight ? "font-semibold text-mountie-white" : "text-mountie-silver"}`}
                  >
                    <td className="py-2">{r.team}</td>
                    <td className="py-2 text-right">
                      {r.wins}-{r.losses}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {d.note ? (
              <p className="mt-4 text-sm leading-6 text-mountie-silver">{d.note}</p>
            ) : null}
            {d.image ? (
              <Image
                src={d.image.path}
                alt={d.image.alt}
                width={1122}
                height={1402}
                className="mt-6 h-auto w-full rounded-xl"
              />
            ) : null}
          </section>
        ))}
      </div>
    </ProgramPageShell>
  );
}
