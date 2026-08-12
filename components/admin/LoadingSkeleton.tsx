import { cn } from "@/lib/utils/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[#B7C0CC]/30",
        className
      )}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 rounded-xl border border-[#B7C0CC]/40 bg-white p-4">
      <LoadingSkeleton className="h-8 w-48" />
      {Array.from({ length: rows }).map((_, i) => (
        <LoadingSkeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-28" />
        ))}
      </div>
      <LoadingSkeleton className="h-64" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4 rounded-xl border border-[#B7C0CC]/40 bg-white p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <LoadingSkeleton className="h-4 w-32" />
          <LoadingSkeleton className="h-10 w-full" />
        </div>
      ))}
      <LoadingSkeleton className="h-10 w-32" />
    </div>
  );
}
