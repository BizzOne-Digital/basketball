import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/actions/admin/services";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";
import type { PageSection } from "@/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#04101F]">Edit Service</h1>
        <p className="mt-1 text-[#343A40]">{service.title}</p>
      </div>
      <ServiceForm
        mode="edit"
        serviceId={id}
        initial={{
          title: service.title,
          slug: service.slug,
          cardDescription: service.cardDescription,
          cardImage: service.cardImage,
          cardCtaLabel: service.cardCtaLabel,
          status: service.status,
          order: service.order,
          seo: service.seo,
          hero: service.hero as PageSection | undefined,
          intro: service.intro,
          detailSections: (service.detailSections ?? []) as PageSection[],
          benefitsText: (service.benefits ?? [])
            .map((b) => b.title + (b.description ? `|${b.description}` : ""))
            .join("\n"),
          audienceDescription: service.audience?.description ?? "",
          scheduleDescription: service.schedule?.description ?? "",
          whatToBringText: (service.whatToBring ?? []).join("\n"),
        }}
      />
    </div>
  );
}
