import Link from "next/link";
import Image from "next/image";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { PLACEHOLDERS } from "@/lib/images";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-24">
      <div className="absolute inset-0 opacity-30">
        <Image src={PLACEHOLDERS.court} alt="" fill className="object-cover" aria-hidden />
        <div className="absolute inset-0 bg-midnight/80" />
      </div>
      <div className="relative max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-ice-blue">404</p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] md:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-lg leading-8 text-mountie-silver">
          The page you are looking for may have moved or is no longer available.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/">Back Home</MagneticButton>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.16em] text-mountie-silver hover:text-ice-blue"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
