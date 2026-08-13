import { PageHero } from "@/components/public/PageHero";
import { PLACEHOLDERS } from "@/lib/images";

interface ProgramPageShellProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  children: React.ReactNode;
}

export function ProgramPageShell({
  title,
  description,
  breadcrumbs,
  children,
}: ProgramPageShellProps) {
  return (
    <>
      <PageHero
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        image={{ path: PLACEHOLDERS.hero, alt: title }}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">{children}</div>
      </section>
    </>
  );
}
