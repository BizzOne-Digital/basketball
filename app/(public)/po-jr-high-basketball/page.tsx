import type { Metadata } from "next";
import Image from "next/image";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { JrHighSubNav } from "@/components/public/JrHighSubNav";
import { JR_HIGH_BASKETBALL } from "@/lib/content/jr-high-basketball";

export const metadata: Metadata = {
  title: "PO Jr High Basketball",
  description:
    "Philipsburg-Osceola Mountaineer junior high boys basketball team picture.",
};

export default function PoJrHighBasketballPage() {
  const { title, description, seasonLabel, images } = JR_HIGH_BASKETBALL;

  return (
    <ProgramPageShell
      title={title}
      description={description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: title },
      ]}
    >
      <JrHighSubNav />

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ice-blue">
          {seasonLabel}
        </p>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/20">
          <Image
            src={images.teamPicture}
            alt={`${seasonLabel} PO Jr High Basketball team picture`}
            width={1600}
            height={900}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </ProgramPageShell>
  );
}
