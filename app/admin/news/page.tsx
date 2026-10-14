import { getNewsPosts } from "@/lib/actions/admin/news";
import { NewsListClient } from "@/components/admin/forms/NewsListClient";

export default async function AdminNewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="space-y-6">
      <NewsListClient
        posts={posts.map((p) => ({
          _id: p._id.toString(),
          title: p.title,
          slug: p.slug,
          authorName: p.authorName,
          status: p.status,
          publishedAt: p.publishedAt?.toISOString(),
        }))}
      />
    </div>
  );
}
