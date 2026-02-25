"use client";

import { useState } from "react";
import { HeroSpline } from "@/components/HeroSpline";
import type { Article, Category } from "@/lib/types";

// Spline の Integrated Embed → Viewer に表示される .splinecode の URL（未指定時は HeroSpline のデフォルトを使用）
const SPLINE_SCENE_URL =
  "https://prod.spline.design/dTMAoDRVroDzvhts/scene.splinecode";

function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      className="block rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-neutral-300 hover:shadow dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {article.category}
      </span>
      <h3 className="mt-1 font-semibold text-neutral-900 dark:text-white">
        {article.title}
      </h3>
    </a>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("latest");

  const filteredArticles: Article[] = [];

  return (
    <main className="min-h-screen">
      <section className="relative h-screen w-full overflow-hidden">
        <HeroSpline
          scene={SPLINE_SCENE_URL}
          onCategorySelect={setActiveCategory}
          className="absolute inset-0 h-full w-full"
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">
          {activeCategory} — {filteredArticles.length} articles
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <li key={`${article.category}-${article.title}`}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
        {filteredArticles.length === 0 && (
          <p className="text-neutral-500 dark:text-neutral-400">
            No articles in this category yet.
          </p>
        )}
      </section>
    </main>
  );
}
