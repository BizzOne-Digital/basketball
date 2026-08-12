import { notFound } from "next/navigation";
import { getNewsPostById } from "@/lib/actions/admin/news";
import { NewsForm } from "@/components/admin/forms/NewsForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditNewsPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getNewsPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">Edit Post</h1>
        <p className="mt-1 text-[#343A40]">{post.title}</p>
      </div>
      <NewsForm
        mode="edit"
        postId={id}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          coverImage: post.coverImage,
          authorName: post.authorName,
          tags: post.tags,
          content: post.content,
          seoTitle: post.seo?.title,
          seoDescription: post.seo?.description,
          status: post.status,
          publishedAt: post.publishedAt?.toISOString(),
        }}
      />
    </div>
  );
}
