import type { Metadata } from "next";
import { ProgramPageShell } from "@/components/public/ProgramPageShell";
import { AlumniSignupForm } from "@/components/public/AlumniSignupForm";
import { ALUMNI_SIGNUP_HOME_CONTENT } from "@/lib/content/alumni-signup";

export const metadata: Metadata = {
  title: "Alumni Sign-Up",
  description:
    "Join the P-O Varsity Boys Basketball alumni network and stay connected with the Mounties.",
};

export default function AlumniSignUpPage() {
  const content = ALUMNI_SIGNUP_HOME_CONTENT;

  return (
    <ProgramPageShell
      title="Alumni Form"
      description="Official sign-up for P-O Varsity Boys Basketball alumni."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Alumni", href: "/alumni" },
        { label: "Sign-Up" },
      ]}
    >
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4 text-base leading-8 text-mountie-silver">
          <p className="text-lg font-semibold text-mountie-white">
            {content.introLead}
          </p>
          <p>{content.introBody}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gunmetal/20 p-6 sm:p-8">
          <AlumniSignupForm />
        </div>

        <p className="text-center text-sm leading-7 text-mountie-silver">
          {content.closing} <span aria-hidden>🏀💙</span>
        </p>
      </div>
    </ProgramPageShell>
  );
}
