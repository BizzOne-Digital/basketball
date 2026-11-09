import { notFound } from "next/navigation";
import { ContentEditor } from "@/components/admin/forms/ContentEditor";
import { getContentEditorData } from "@/lib/actions/admin/content";
import { CONTENT_BLOCKS } from "@/lib/content/registry";

interface AdminContentEditPageProps {
  params: Promise<{ key: string }>;
}

export default async function AdminContentEditPage({
  params,
}: AdminContentEditPageProps) {
  const { key } = await params;
  const block = CONTENT_BLOCKS.find((item) => item.key === key);
  const editorData = block ? await getContentEditorData(key) : null;

  if (!block || !editorData) {
    notFound();
  }

  return (
    <ContentEditor
      key={block.key}
      contentKey={block.key}
      label={block.label}
      description={block.description}
      publicPath={block.publicPath}
      initialData={editorData.data as never}
      customized={editorData.customized}
    />
  );
}
