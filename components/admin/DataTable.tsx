"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T extends { _id?: string; id?: string }> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
};

export function DataTable<T extends { _id?: string; id?: string }>({
  columns,
  data,
  emptyMessage = "No records found.",
  getRowId = (row) => row._id ?? row.id ?? "",
  onRowClick,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-[#B7C0CC]/40 bg-white p-12 text-center text-[#343A40]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#B7C0CC]/40 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#B7C0CC]/30 bg-[#F7F9FC]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 font-semibold text-[#04101F]",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const id = getRowId(row);
              return (
                <tr
                  key={id}
                  className={cn(
                    "border-b border-[#B7C0CC]/20 last:border-0",
                    onRowClick && "cursor-pointer hover:bg-[#5BB9FF]/5"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn("px-4 py-3 text-[#343A40]", col.className)}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DataTableActions({
  editHref,
  onDelete,
}: {
  editHref?: string;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {editHref && (
        <Link
          href={editHref}
          className="rounded-md bg-[#0B2F63] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#04101F]"
        >
          Edit
        </Link>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      )}
    </div>
  );
}
