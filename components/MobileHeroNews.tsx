"use client";

import Image from "next/image";
import Link from "next/link";

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
    <section className="relative flex min-h-0 flex-col bg-[#0a0a0a] text-white" aria-label="Top AI News">
      {/* Hero image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 sm:aspect-[21/10]">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        {/* Overlaid content on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <span className="mb-2 inline-block rounded-sm bg-green-500 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-black">
            {category}
          </span>
          <h1 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300 sm:text-base">
            {description}
          </p>
          <Link
            href="/news/1"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded bg-green-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-green-400"
          >
            Read Article
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
