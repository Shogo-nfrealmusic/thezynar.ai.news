"use client";

import Image from "next/image";
import Link from "next/link";

/** Mock data until news fetching is implemented. 画像は Unsplash から取得。 */
const mockNews = {
  title: "OpenAI Releases New Model GPT-5.4",
  description:
    "The new model dramatically improves reasoning and multimodal capabilities.",
  category: "AI NEWS",
  image:
    "https://images.unsplash.com/photo-1704964969056-0c6d7caf7af8?auto=format&fit=crop&w=1200&q=80",
};

export function MobileHeroNews() {
  const { title, description, category, image } = mockNews;

  return (
    <section
      className="flex min-h-0 flex-col bg-neutral-950 text-white"
      aria-label="Top AI News"
    >
      {/* Hero image with gradient overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 sm:aspect-[21/10]">
        {/* Placeholder gradient when image is not present; image overlays when present */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-neutral-900 to-neutral-950"
          aria-hidden
        />
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-90"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-8 pt-6 sm:px-6 sm:pt-8">
        <span
          className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-violet-400"
          aria-hidden
        >
          {category}
        </span>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          {description}
        </p>
        <Link
          href="/news/1"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          Read Article
          <span aria-hidden>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
