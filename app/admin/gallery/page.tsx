import { getGalleryCategories } from "@/lib/actions/admin/gallery";
import { GalleryCategoriesClient } from "@/components/admin/forms/GalleryCategoriesClient";

export default async function AdminGalleryPage() {
  const categories = await getGalleryCategories();

  const serialized = categories.map((c) => ({
    _id: c._id.toString(),
    name: c.name,
    slug: c.slug,
    description: c.description,
    order: c.order,
  }));

  return (
    <div className="space-y-6">
      <GalleryCategoriesClient categories={serialized} />
    </div>
  );
}
