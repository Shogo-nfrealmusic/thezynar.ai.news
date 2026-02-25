"use client";

import { useState } from "react";
import { HeroSpline } from "@/components/HeroSpline";
import type { Category } from "@/lib/types";
import { LatestNewsSection } from "@/components/LatestNewsSection";

// Spline の Integrated Embed → Viewer に表示される .splinecode の URL（未指定時は HeroSpline のデフォルトを使用）
const SPLINE_SCENE_URL =
  "https://prod.spline.design/dTMAoDRVroDzvhts/scene.splinecode";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("latest");

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
    </main>
  );
}