import Link from "next/link";
import { getCustomizedContentKeys } from "@/lib/actions/admin/content";
import { CONTENT_BLOCKS } from "@/lib/content/registry";

export default async function AdminContentPage() {
  const customized = new Set(await getCustomizedContentKeys().catch(() => []));
  const groups = Array.from(new Set(CONTENT_BLOCKS.map((block) => block.group)));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">Site Content</h1>
        <p className="text-sm text-[#343A40]">
          Edit the text, schedules, coaches, records and images shown across the public site.
          Pick a block below, change it and press Save. Changes go live immediately.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group} className="space-y-3">
          <h2 className="text-lg font-semibold text-[#04101F]">{group}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONTENT_BLOCKS.filter((block) => block.group === group).map((block) => (
              <Link
                key={block.key}
                href={`/admin/content/${block.key}`}
                className="rounded-xl border border-[#B7C0CC]/40 bg-white p-4 transition hover:border-[#5BB9FF] hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-[#04101F]">{block.label}</p>
                  {customized.has(block.key) ? (
                    <span className="rounded-full bg-[#5BB9FF]/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#0B2F63]">
                      Edited
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-[#343A40]">{block.description}</p>
                <p className="mt-2 text-xs text-[#0B2F63]">{block.publicPath}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
