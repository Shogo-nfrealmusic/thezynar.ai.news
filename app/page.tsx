"use client";

import { useState, useEffect } from "react";
import { HeroSpline } from "@/components/HeroSpline";
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
      <section
        className="relative flex h-[100dvh] min-h-[100dvh] w-full max-w-[100vw] items-center justify-center overflow-hidden sm:h-screen sm:min-h-screen"
        style={{ minHeight: "100vh" }}
      >
        <HeroSpline
          scene={SPLINE_SCENE_URL}
          onCategorySelect={setActiveCategory}
          className="absolute inset-0 h-full w-full min-h-0 min-w-0"
        />
      </section>

      {/* Latest News Section */}
      <LatestNewsSection activeCategory={activeCategory} />

      {/* Email Modal - auto shows after delay */}
      <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} />
    </main>
  );
}
