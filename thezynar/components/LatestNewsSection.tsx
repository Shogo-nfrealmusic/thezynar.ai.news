import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { latestNews } from "@/lib/mockLatestNews";
import { cn } from "@/lib/utils";

interface LatestNewsSectionProps {
  activeCategory?: Category;
  limit?: number;
  showSeeMore?: boolean;
  className?: string;
}

export function LatestNewsSection({
  activeCategory = "latest",
  limit = 10,
  showSeeMore = true,
  className,
}: LatestNewsSectionProps) {
  const items =
    activeCategory === "latest"
      ? latestNews.slice(0, limit)
      : latestNews.filter((item) => item.category === activeCategory).slice(0, limit);

  const headingLabel =
    activeCategory === "latest"
      ? "Latest News"
      : `${activeCategory.toUpperCase()} News`;

  return (
    <section
      className={cn(
        "border-t border-neutral-200/70 bg-neutral-50/90 px-4 py-12 dark:border-neutral-800 dark:bg-neutral-950/90",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section title (full width) */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
            Latest
          </p>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {headingLabel}
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            The freshest stories in AI, tech, gadgets, and trends — updated in
            real-time as the ecosystem moves.
          </p>

          {showSeeMore && (
            <div className="mt-6">
              <Link
                href="/latest"
                className="inline-flex items-center justify-center rounded-full border border-emerald-500/70 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-400/70 dark:bg-neutral-950 dark:text-emerald-200 dark:hover:bg-emerald-950/60"
              >
                See more
              </Link>
            </div>
          )}
        </div>

        {/* Latest list + ranking, under the header */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* Main latest list */}
          <div className="lg:w-8/12">
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  id={`article-${item.id}`}
                  className="group rounded-2xl border border-neutral-200 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500/70 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/95"
                >
                  <Link
                    href="/latest"
                    className="flex gap-4 p-3 sm:p-4"
                    aria-label={item.title}
                  >
                    <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800 sm:h-24 sm:w-32">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 176px, (min-width: 1024px) 160px, (min-width: 640px) 140px, 120px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                        <span className="rounded-sm bg-emerald-100 px-2 py-0.5 text-[0.68rem] text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-100">
                          {item.category}
                        </span>
                        <span className="text-[0.68rem] text-neutral-500 dark:text-neutral-400">
                          {item.publishedAt}
                        </span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-neutral-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300 sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                        {item.summary}
                      </p>
                      <p className="mt-2 text-[0.7rem] text-neutral-500 dark:text-neutral-500">
                        {item.author}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly ranking sidebar */}
          <aside className="lg:w-4/12 lg:self-start">
            <div className="rounded-3xl bg-violet-700 p-5 text-white shadow-lg sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-200">
                This week
              </p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight">
                Most Popular
              </h3>
              <p className="mt-2 text-xs text-violet-100/90 sm:text-sm">
                The stories readers couldn&apos;t stop clicking over the past
                seven days.
              </p>

              <ol className="mt-4 space-y-3 text-sm">
                {latestNews.slice(0, 5).map((item, index) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <Link
                      href={`/latest#article-${item.id}`}
                      className="group/rank flex-1"
                    >
                      <p className="text-[0.8rem] font-semibold leading-snug text-violet-50 group-hover/rank:text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[0.7rem] text-violet-200/90">
                        {item.category.toUpperCase()} · {item.publishedAt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

