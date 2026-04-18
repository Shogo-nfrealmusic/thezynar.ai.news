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

const categoryColors: Record<string, string> = {
  ai: "bg-green-500 text-black",
  tech: "bg-blue-500 text-white",
  gadget: "bg-purple-500 text-white",
  trend: "bg-yellow-400 text-black",
  latest: "bg-green-500 text-black",
};

function CategoryBadge({ category }: { category: string }) {
  const color = categoryColors[category.toLowerCase()] ?? "bg-neutral-700 text-white";
  return (
    <span className={cn("inline-block px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-sm", color)}>
      {category}
    </span>
  );
}

function ArticleListItem({ item }: { item: (typeof latestNews)[0] }) {
  return (
    <li className="group border-b border-neutral-800/60 last:border-0">
      <Link href={`/news/${item.id}`} className="flex gap-3 py-3 transition-colors hover:bg-neutral-900/40 px-2 -mx-2 rounded">
        <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-800">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <CategoryBadge category={item.category} />
            <span className="text-[0.65rem] text-neutral-500">{item.publishedAt}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-100 transition-colors group-hover:text-green-400">
            {item.title}
          </h3>
          <p className="mt-0.5 text-[0.7rem] text-neutral-500">{item.author}</p>
        </div>
      </Link>
    </li>
  );
}

function ArticleFeatureItem({ item }: { item: (typeof latestNews)[0] }) {
  return (
    <article className="group">
      <Link href={`/news/${item.id}`} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-800">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <CategoryBadge category={item.category} />
          </div>
        </div>
        <div className="mt-2.5">
          <h3 className="text-base font-bold leading-snug text-white transition-colors group-hover:text-green-400 sm:text-lg">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-neutral-400 sm:text-sm">{item.summary}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-[0.65rem] text-neutral-500">{item.author}</span>
            <span className="text-neutral-700">·</span>
            <span className="text-[0.65rem] text-neutral-500">{item.publishedAt}</span>
          </div>
        </div>
      </Link>
    </article>
  );
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

  const featureItem = items[0];
  const listItems = items.slice(1);

  return (
    <section
      className={cn(
        "border-t border-neutral-800 bg-[#0a0a0a] px-4 py-8",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-6 flex items-end justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="block h-5 w-1 rounded-full bg-green-500" />
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-green-500">
                Latest
              </p>
              <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                {headingLabel}
              </h2>
            </div>
          </div>
          {showSeeMore && (
            <Link
              href="/latest"
              className="text-[0.75rem] font-semibold uppercase tracking-wide text-green-500 transition-colors hover:text-green-400"
            >
              See all →
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="lg:w-8/12">
            {/* Feature article */}
            {featureItem && (
              <div className="mb-6">
                <ArticleFeatureItem item={featureItem} />
              </div>
            )}

            {/* Article list */}
            <ul className="divide-y-0">
              {listItems.map((item) => (
                <ArticleListItem key={item.id} item={item} />
              ))}
            </ul>

            {/* Pagination */}
            {showPagination && (
              <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
                {page > 1 ? (
                  <Link
                    href={page === 2 ? basePath : `${basePath}?page=${page - 1}`}
                    className="inline-flex items-center gap-1.5 rounded border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-300 transition hover:border-green-500 hover:text-white"
                  >
                    ← Prev
                  </Link>
                ) : (
                  <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-600" aria-disabled>
                    ← Prev
                  </span>
                )}
                <span className="text-sm text-neutral-500">
                  {page} / {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={`${basePath}?page=${page + 1}`}
                    className="inline-flex items-center gap-1.5 rounded border border-green-500 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-500 hover:text-black"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-600" aria-disabled>
                    Next →
                  </span>
                )}
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <MostPopularSidebar theme="emerald" className="lg:w-4/12" />
        </div>
      </div>
    </section>
  );
}
