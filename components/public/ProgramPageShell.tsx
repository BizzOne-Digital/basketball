import { PageHero } from "@/components/public/PageHero";
import { PLACEHOLDERS } from "@/lib/images";
import type { ImageObject } from "@/types";

interface ProgramPageShellProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  image?: ImageObject;
  children: React.ReactNode;
}

export function ProgramPageShell({
  title,
  description,
  breadcrumbs,
  image,
  children,
}: ProgramPageShellProps) {
  return (
    <>
      <PageHero
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        image={image ?? { path: PLACEHOLDERS.hero, alt: title }}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">{children}</div>
      </section>
    </>
  );
}
