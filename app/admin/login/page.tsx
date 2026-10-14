import { Suspense } from "react";
import { LoginForm } from "@/components/admin/forms/LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
