import { MagneticButton } from "@/components/motion/MagneticButton";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-gunmetal/10 px-8 py-16 text-center">
      <h3 className="font-display text-3xl uppercase tracking-[0.08em] text-mountie-white">
        {title}
      </h3>
      {description ? (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-mountie-silver">
          {description}
        </p>
      ) : null}
      {actionLabel && actionHref ? (
        <div className="mt-8">
          <MagneticButton href={actionHref}>{actionLabel}</MagneticButton>
        </div>
      ) : null}
    </div>
  );
}
