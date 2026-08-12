"use client";

type RichTextEditorProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
};

export function RichTextEditor({
  label = "Content",
  value,
  onChange,
  rows = 8,
  hint = "Supports controlled HTML. Content is sanitized before rendering on the public site.",
}: RichTextEditorProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#04101F]">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-lg border border-[#B7C0CC]/50 bg-white px-3 py-2 font-mono text-sm text-[#04101F] focus:border-[#5BB9FF] focus:outline-none focus:ring-2 focus:ring-[#5BB9FF]/20"
        placeholder="<p>Enter HTML content...</p>"
      />
      <p className="text-xs text-[#B7C0CC]">{hint}</p>
    </div>
  );
}
