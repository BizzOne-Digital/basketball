"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { FAQDocument } from "@/types";

interface FAQAccordionProps {
  faqs: FAQDocument[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(
    faqs[0]?.slug ?? null,
  );

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const open = openSlug === faq.slug;

        return (
          <div
            key={faq.slug}
            className="overflow-hidden rounded-2xl border border-white/10 bg-gunmetal/20"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenSlug(open ? null : faq.slug)}
            >
              <span className="font-display text-lg uppercase tracking-[0.06em] text-mountie-white">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "shrink-0 text-ice-blue transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>
            {open ? (
              <div className="border-t border-white/10 px-6 py-5 text-sm leading-7 text-mountie-silver">
                {faq.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
