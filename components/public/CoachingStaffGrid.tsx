import Image from "next/image";
import { COACHING_STAFF } from "@/lib/content/mountie-program";
import { getGalleryImageByIndex, resolveImageAlt } from "@/lib/images";

export function CoachingStaffGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {COACHING_STAFF.map((member, index) => (
        <article
          key={member.name}
          className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/30"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={getGalleryImageByIndex(index)}
              alt={resolveImageAlt(undefined, member.name)}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-ice-blue">
                {member.role}
              </p>
              <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-mountie-white">
                {member.name}
              </h3>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
