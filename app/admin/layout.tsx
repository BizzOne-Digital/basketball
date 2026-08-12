import { Toaster } from "sonner";
import { getSession } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    return (
      <>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </>
    );
  }

  return (
    <>
      <AdminShell userEmail={session.user.email}>{children}</AdminShell>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
