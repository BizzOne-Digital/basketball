import { getServices } from "@/lib/actions/admin/services";
import { ServicesListClient } from "@/components/admin/forms/ServicesListClient";

export default async function AdminServicesPage() {
  const services = await getServices();

  const serialized = services.map((s) => {
    const doc = s as typeof s & { updatedAt?: Date };
    return {
      _id: s._id.toString(),
      name: s.title,
      slug: s.slug,
      shortDescription: s.cardDescription,
      status: s.status,
      updatedAt: doc.updatedAt?.toISOString?.(),
      cardImage: s.cardImage,
    };
  });

  return (
    <div className="space-y-6">
      <ServicesListClient services={serialized} />
    </div>
  );
}
