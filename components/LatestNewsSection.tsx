import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { latestNews } from "@/lib/mockLatestNews";
import { cn } from "@/lib/utils";
import { MostPopularSidebar } from "@/components/MostPopularSidebar";

const ITEMS_PER_PAGE = 10;

interface LatestNewsSectionProps {
  activeCategory?: Category;
  limit?: number;
  showSeeMore?: boolean;
  showPagination?: boolean;
  currentPage?: number;
  basePath?: string;
  itemsPerPage?: number;
  className?: string;
}

export function LatestNewsSection({
  activeCategory = "latest",
  limit = 10,
  showSeeMore = true,
  showPagination = false,
  currentPage = 1,
  basePath = "/latest",
  itemsPerPage = ITEMS_PER_PAGE,
  className,
}: LatestNewsSectionProps) {
  const allFiltered =
    activeCategory === "latest"
      ? latestNews
      : latestNews.filter((item) => item.category === activeCategory);

  const totalItems = allFiltered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const page = Math.max(1, Math.min(currentPage, totalPages));

  const items = showPagination
    ? allFiltered.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : allFiltered.slice(0, limit);

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
                    href={`/news/${item.id}`}
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

            {/* Pagination: Prev / Next（tech / AI / latest で常に表示） */}
            {showPagination && (
              <nav
                className="mt-8 flex items-center justify-center gap-3"
                aria-label="Pagination"
              >
                {page > 1 ? (
                  <Link
                    href={page === 2 ? basePath : `${basePath}?page=${page - 1}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    <span aria-hidden>←</span> Prev
                  </Link>
                ) : (
                  <span
                    className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500"
                    aria-disabled
                  >
                    <span aria-hidden>←</span> Prev
                  </span>
                )}
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={`${basePath}?page=${page + 1}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/70 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-50 dark:border-emerald-400/70 dark:bg-neutral-800 dark:text-emerald-200 dark:hover:bg-emerald-900/30"
                  >
                    Next <span aria-hidden>→</span>
                  </Link>
                ) : (
                  <span
                    className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500"
                    aria-disabled
                  >
                    Next <span aria-hidden>→</span>
                  </span>
                )}
              </nav>
            )}
          </div>

          {/* Weekly ranking sidebar（スクロール追従） */}
          <MostPopularSidebar theme="emerald" className="lg:w-4/12" />
        </div>
      </div>
    </section>
  );
}

