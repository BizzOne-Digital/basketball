import { AnnouncementBar } from "@/components/public/AnnouncementBar";
import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";
import { PageTransitionWrapper } from "@/components/motion/PageTransitionWrapper";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import type { SiteSettingsDocument } from "@/types";

interface PublicLayoutProps {
  settings: SiteSettingsDocument;
  children: React.ReactNode;
}

export function PublicLayout({ settings, children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-full w-full min-w-0 flex-col overflow-x-clip">
      <SmoothScrollProvider>
        <ScrollProgress />
        <AnnouncementBar announcement={settings.announcementBar} />
        <Header settings={settings} />
        <PageTransitionWrapper>
          <main className="grain-overlay w-full min-w-0 flex-1 overflow-x-clip bg-midnight text-mountie-white">
            {children}
          </main>
        </PageTransitionWrapper>
        <Footer settings={settings} />
      </SmoothScrollProvider>
    </div>
  );
}
