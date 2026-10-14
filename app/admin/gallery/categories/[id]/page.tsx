import { notFound } from "next/navigation";
import { getGalleryCategoryById } from "@/lib/actions/admin/gallery";
import { GalleryCategoryEditor } from "@/components/admin/forms/GalleryCategoryEditor";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminGalleryCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const { category, images } = await getGalleryCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <GalleryCategoryEditor
      category={{
        _id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        description: category.description,
      }}
      images={images.map((img) => ({
        _id: img._id.toString(),
        slug: img.slug,
        title: img.title,
        caption: img.caption,
        path: img.image.path,
        alt: img.image.alt,
        order: img.order,
        featured: img.featured,
      }))}
    />
  );
}
