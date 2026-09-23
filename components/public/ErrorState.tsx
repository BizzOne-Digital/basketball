import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again or return home.",
}: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-400/20 bg-red-950/20 px-8 py-16 text-center">
      <h3 className="font-display text-3xl uppercase tracking-[0.08em] text-mountie-white">
        {title}
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-mountie-silver">
        {description}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.16em] text-ice-blue"
      >
        Back Home
      </Link>
    </div>
  );
}
