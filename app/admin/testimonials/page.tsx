import { getTestimonials } from "@/lib/actions/admin/testimonials";
import { TestimonialsManager } from "@/components/admin/forms/TestimonialsManager";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <TestimonialsManager
        testimonials={testimonials.map((t) => ({
          _id: t._id.toString(),
          slug: t.slug,
          authorName: t.authorName,
          authorRole: t.authorRole,
          quote: t.quote,
          authorPhoto: t.authorPhoto,
          status: t.status,
          featured: t.featured,
        }))}
      />
    </div>
  );
}
