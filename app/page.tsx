"use client";

import { useState, useEffect } from "react";
import { HeroSpline } from "@/components/HeroSpline";
import { MobileHeroNews } from "@/components/MobileHeroNews";
import type { Category } from "@/lib/types";
import { LatestNewsSection } from "@/components/LatestNewsSection";
import { EmailModal } from "@/components/ui/email-modal";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/dTMAoDRVroDzvhts/scene.splinecode";

const MODAL_DELAY_SECONDS = 15;
const MODAL_SHOWN_KEY = "newsletter_modal_shown";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("latest");
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(MODAL_SHOWN_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setEmailModalOpen(true);
      sessionStorage.setItem(MODAL_SHOWN_KEY, "true");
    }, MODAL_DELAY_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Desktop (lg+): 3D hero. Mobile/tablet: static Top AI News hero so touch scroll works. */}
      <section
        className="relative flex w-full max-w-[100vw] items-center justify-center overflow-hidden lg:h-screen lg:min-h-screen"
      >
        <div className="absolute inset-0 hidden lg:block">
          <HeroSpline
            scene={SPLINE_SCENE_URL}
            onCategorySelect={setActiveCategory}
            className="absolute inset-0 h-full w-full min-h-0 min-w-0"
          />
        </div>
        <div className="block w-full lg:hidden">
          <MobileHeroNews />
        </div>
      </section>

      {/* Latest News Section（ナビと被らないよう上部余白） */}
      <LatestNewsSection
        activeCategory={activeCategory}
        className="pt-[calc(var(--header-height)+1rem)]"
      />

      {/* Email Modal - auto shows after delay */}
      <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} />
    </main>
  );
}