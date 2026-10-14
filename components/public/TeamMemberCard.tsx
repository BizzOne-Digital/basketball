import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { resolveImageAlt, resolveTeamMemberImage } from "@/lib/images";
import type { TeamMemberDocument } from "@/types";

interface TeamMemberCardProps {
  member: TeamMemberDocument;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const src = resolveTeamMemberImage(member);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/30">
      <div className="relative aspect-[3/4]">
        <Image
          src={src}
          alt={resolveImageAlt(member.photo, member.name)}
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
      <div className="space-y-3 p-5 text-sm text-mountie-silver">
        {member.bio ? <p className="leading-7">{member.bio}</p> : null}
        <div className="flex flex-wrap gap-4">
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-2 hover:text-ice-blue"
            >
              <Mail size={14} />
              {member.email}
            </a>
          ) : null}
          {member.phone ? (
            <a
              href={`tel:${member.phone}`}
              className="inline-flex items-center gap-2 hover:text-ice-blue"
            >
              <Phone size={14} />
              {member.phone}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
