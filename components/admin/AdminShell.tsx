"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

type AdminShellProps = {
  children: React.ReactNode;
  userEmail?: string | null;
};

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        userEmail={userEmail}
      />
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col transition-all duration-300",
          collapsed ? "md:ml-[72px]" : "md:ml-64"
        )}
      >
        <AdminHeader
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((c) => !c)}
          userEmail={userEmail}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
