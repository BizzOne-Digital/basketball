"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";
import { deleteService } from "@/lib/actions/admin/services";

type ServiceRow = {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  status: string;
  updatedAt?: string;
  cardImage?: { path?: string };
};

export function ServicesListClient({ services }: { services: ServiceRow[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteService(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Service deleted.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">Services / Programs</h1>
          <p className="mt-1 text-[#343A40]">Manage program cards and detail pages.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm font-semibold text-white hover:bg-[#04101F]"
        >
          Add Service
        </Link>
      </div>

      <DataTable
        data={services}
        columns={[
          {
            key: "image",
            header: "Image",
            render: (row) =>
              row.cardImage?.path ? (
                <div className="relative h-12 w-16 overflow-hidden rounded">
                  <Image src={row.cardImage.path} alt="" fill className="object-cover" sizes="64px" />
                </div>
              ) : (
                "—"
              ),
          },
          { key: "name", header: "Name" },
          { key: "slug", header: "Slug" },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <span className="capitalize">{row.status}</span>
            ),
          },
          {
            key: "updatedAt",
            header: "Updated",
            render: (row) =>
              row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "—",
          },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <DataTableActions
                editHref={`/admin/services/${row._id}`}
                onDelete={() => setDeleteId(row._id)}
              />
            ),
          },
        ]}
        emptyMessage="No services yet. Create your first program."
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Service"
        description="This will permanently delete the service and its detail page content."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
