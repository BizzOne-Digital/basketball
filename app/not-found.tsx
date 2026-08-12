import Link from "next/link";

export default function RootNotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-midnight px-4 text-center text-mountie-white">
      <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">404</p>
      <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em]">
        Page Not Found
      </h1>
      <p className="mt-6 max-w-md text-mountie-silver">
        The page you requested could not be found.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-midnight"
      >
        Back Home
      </Link>
    </section>
  );
}
