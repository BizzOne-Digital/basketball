import Link from "next/link";
import { SectionHeading } from "@/components/public/SectionHeading";
import {
  ALUMNI_SIGNUP_FORM_PATH,
  ALUMNI_SIGNUP_HOME_CONTENT,
} from "@/lib/content/alumni-signup";

function AlumniFormLink({ className }: { className?: string }) {
  return (
    <Link
      href={ALUMNI_SIGNUP_FORM_PATH}
      className={
        className ??
        "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ice-blue hover:underline"
      }
    >
      <span aria-hidden>👉</span>
      {ALUMNI_SIGNUP_HOME_CONTENT.formLinkLabel}
    </Link>
  );
}

export function AlumniSignupHomeSection() {
  const content = ALUMNI_SIGNUP_HOME_CONTENT;

  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-mountie-blue/15 to-transparent py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description="Sign up to stay connected with P-O Varsity Boys Basketball."
        />

        <div className="mt-8 space-y-6 rounded-2xl border border-ice-blue/25 bg-gunmetal/20 p-6 sm:p-8">
          <AlumniFormLink />

          <p className="text-lg font-semibold leading-8 text-mountie-white">
            {content.introLead}
          </p>

          <p className="text-base leading-8 text-mountie-silver">
            {content.introBody}
          </p>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mountie-white">
              {content.helpsHeading}
            </p>
            <ul className="mt-4 list-none space-y-2 text-base leading-8 text-mountie-silver">
              {content.helpsItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-ice-blue" aria-hidden>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-base leading-8 text-mountie-silver">
            {content.formIntro}
          </p>

          <AlumniFormLink
            className="inline-flex items-center gap-2 rounded-full bg-ice-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-midnight transition-opacity hover:opacity-90"
          />

          <p className="border-t border-white/10 pt-6 text-base leading-8 text-mountie-silver">
            {content.closing}{" "}
            <span aria-hidden>🏀💙</span>
          </p>
        </div>
      </div>
    </section>
  );
}
