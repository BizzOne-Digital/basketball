import { PageHero } from "@/components/public/PageHero";

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
        hideBackground
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">{children}</div>
      </section>
    </>
  );
}
