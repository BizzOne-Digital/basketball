import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="break-words font-display text-3xl uppercase tracking-[0.08em] text-mountie-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        description.includes("<") ? (
          <RichTextRenderer
            html={description}
            className="text-base leading-7 text-mountie-silver [&_p]:text-mountie-silver [&_p]:leading-7"
          />
        ) : (
          <p className="text-base leading-7 text-mountie-silver">{description}</p>
        )
      ) : null}
      <div
        className={cn(
          "court-line w-24",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}
