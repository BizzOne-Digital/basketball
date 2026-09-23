import { getContactSubmissions } from "@/lib/actions/admin/contact-submissions";
import { ContactSubmissionsManager } from "@/components/admin/forms/ContactSubmissionsManager";

export default async function AdminContactSubmissionsPage() {
  const submissions = await getContactSubmissions();

  return (
    <div className="space-y-6">
      <ContactSubmissionsManager
        submissions={submissions.map((s) => {
          const doc = s as typeof s & { createdAt?: Date };
          return {
            _id: s._id.toString(),
            name: s.name,
            email: s.email,
            phone: s.phone,
            programInterest: s.programInterest,
            message: s.message,
            read: s.read,
            createdAt: doc.createdAt?.toISOString?.(),
          };
        })}
      />
    </div>
  );
}
