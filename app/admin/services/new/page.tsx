import { ServiceForm } from "@/components/admin/forms/ServiceForm";

export default function AdminNewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">New Service</h1>
        <p className="mt-1 text-[#343A40]">Create a new program with card and detail page content.</p>
      </div>
      <ServiceForm mode="create" />
    </div>
  );
}
