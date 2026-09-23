import { NewsForm } from "@/components/admin/forms/NewsForm";

export default function AdminNewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">New Post</h1>
        <p className="mt-1 text-[#343A40]">Create a news or blog article.</p>
      </div>
      <NewsForm mode="create" />
    </div>
  );
}
