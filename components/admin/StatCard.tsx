import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  trend?: string;
  className?: string;
};

export function StatCard({ label, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#B7C0CC]/40 bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#B7C0CC]">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#04101F]">{value}</p>
          {trend && <p className="mt-1 text-xs text-[#5BB9FF]">{trend}</p>}
        </div>
        {Icon && (
          <div className="rounded-lg bg-[#0B2F63]/10 p-3">
            <Icon className="h-6 w-6 text-[#0B2F63]" />
          </div>
        )}
      </div>
    </div>
  );
}
