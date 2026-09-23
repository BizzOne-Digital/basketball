"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteNewsPost } from "@/lib/actions/admin/news";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";

type NewsRow = {
  _id: string;
  title: string;
  slug: string;
  authorName?: string;
  status: string;
  publishedAt?: string;
};

export function NewsListClient({ posts }: { posts: NewsRow[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteNewsPost(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Post deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">News / Blog</h1>
          <p className="mt-1 text-[#343A40]">Manage articles and announcements.</p>
        </div>
        <Link
          href="/admin/news/new"
          className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white"
        >
          New Post
        </Link>
      </div>

      <DataTable
        data={posts}
        columns={[
          { key: "title", header: "Title" },
          { key: "authorName", header: "Author" },
          { key: "status", header: "Status", render: (r) => <span className="capitalize">{r.status}</span> },
          {
            key: "publishedAt",
            header: "Published",
            render: (r) =>
              r.publishedAt ? new Date(r.publishedAt).toLocaleDateString() : "—",
          },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <DataTableActions
                editHref={`/admin/news/${row._id}`}
                onDelete={() => setDeleteId(row._id)}
              />
            ),
          },
        ]}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Post"
        description="This news post will be permanently removed."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
