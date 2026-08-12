import { cn } from "@/lib/utils/cn";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 3 }: LoadingSkeletonProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-white/10 bg-gunmetal/20"
        >
          <div className="aspect-[4/3] bg-white/5" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/5" />
            <div className="h-3 w-5/6 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
