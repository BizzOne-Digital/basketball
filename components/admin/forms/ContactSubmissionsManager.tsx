"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  deleteContactSubmission,
  markContactSubmissionRead,
} from "@/lib/actions/admin/contact-submissions";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, DataTableActions } from "@/components/admin/DataTable";

type SubmissionRow = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  programInterest?: string;
  message?: string;
  read?: boolean;
  createdAt?: string;
};

export function ContactSubmissionsManager({
  submissions,
}: {
  submissions: SubmissionRow[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<SubmissionRow | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const toggleRead = async (id: string, read: boolean) => {
    const result = await markContactSubmissionRead(id, read);
    if (result.success) {
      toast.success(read ? "Marked as read." : "Marked as unread.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteContactSubmission(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success("Submission deleted.");
      setSelected(null);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">Contact Submissions</h1>
        <p className="mt-1 text-[#343A40]">Review and manage contact form messages.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DataTable
          data={submissions}
          columns={[
            { key: "name", header: "Name" },
            { key: "email", header: "Email" },
            { key: "programInterest", header: "Program" },
            {
              key: "read",
              header: "Status",
              render: (r) => (
                <span className={r.read ? "text-[#B7C0CC]" : "font-semibold text-[#5BB9FF]"}>
                  {r.read ? "Read" : "Unread"}
                </span>
              ),
            },
            {
              key: "createdAt",
              header: "Date",
              render: (r) =>
                r.createdAt ? new Date(r.createdAt).toLocaleString() : "—",
            },
          ]}
          onRowClick={setSelected}
        />

        <div className="rounded-xl border border-[#B7C0CC]/40 bg-white p-6 shadow-sm">
          {selected ? (
            <>
              <h2 className="text-lg font-semibold text-[#04101F]">{selected.name}</h2>
              <p className="mt-1 text-sm text-[#343A40]">{selected.email}</p>
              {selected.phone && <p className="text-sm text-[#343A40]">{selected.phone}</p>}
              {selected.programInterest && (
                <p className="mt-3 text-sm">
                  <span className="font-medium">Program:</span> {selected.programInterest}
                </p>
              )}
              <p className="mt-4 whitespace-pre-wrap text-sm text-[#343A40]">
                {selected.message}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void toggleRead(selected._id, !selected.read)}
                  className="rounded-lg bg-[#0B2F63] px-4 py-2 text-sm text-white"
                >
                  Mark as {selected.read ? "Unread" : "Read"}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(selected._id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-[#B7C0CC]">Select a submission to view details.</p>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Submission"
        description="This contact submission will be permanently removed."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
