import { getFAQs } from "@/lib/actions/admin/faqs";
import { FAQsManager } from "@/components/admin/forms/FAQsManager";

export default async function AdminFAQsPage() {
  const faqs = await getFAQs();

  return (
    <div className="space-y-6">
      <FAQsManager
        faqs={faqs.map((f) => ({
          _id: f._id.toString(),
          slug: f.slug,
          question: f.question,
          answer: f.answer,
          category: f.category,
          status: f.status,
        }))}
      />
    </div>
  );
}
