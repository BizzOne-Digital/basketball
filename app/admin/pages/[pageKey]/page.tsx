import { notFound } from "next/navigation";
import { getPageByKey } from "@/lib/actions/admin/pages";
import { PageEditForm } from "@/components/admin/forms/PageEditForm";
import type { PageSection } from "@/types";

type PageProps = {
  params: Promise<{ pageKey: string }>;
};

export default async function AdminPageEditPage({ params }: PageProps) {
  const { pageKey } = await params;
  const page = await getPageByKey(pageKey);

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#5BB9FF]">
          {pageKey}
        </p>
        <h1 className="text-2xl font-bold text-[#04101F]">Edit Page</h1>
        <p className="mt-1 text-[#343A40]">{page.title}</p>
      </div>
      <PageEditForm
        page={{
          pageKey: page.key,
          title: page.title,
          slug: page.slug,
          status: page.status,
          seo: page.seo ?? {},
          sections: (page.sections ?? []) as PageSection[],
        }}
      />
    </div>
  );
}
