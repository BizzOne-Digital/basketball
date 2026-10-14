import { sanitizeRichText } from "@/lib/sanitize";
import { cn } from "@/lib/utils/cn";

interface RichTextRendererProps {
  html?: string;
  className?: string;
}

export function RichTextRenderer({ html, className }: RichTextRendererProps) {
  if (!html) {
    return null;
  }

  return (
    <div
      className={cn(
        "prose prose-invert max-w-full overflow-x-auto prose-headings:font-display prose-headings:uppercase prose-headings:tracking-[0.08em] prose-a:text-ice-blue prose-strong:text-mountie-white prose-img:max-w-full",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  );
}
