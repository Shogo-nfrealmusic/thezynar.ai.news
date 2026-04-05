import Link from "next/link";
import { getLatestArticles, timeAgo } from "@/lib/articles";
import { ArticleThumbnail } from "@/components/ArticleThumbnail";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

export const revalidate = 300; // 5分（当日フィードのため短め）

export default async function LatestPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(String(params?.page ?? "1"), 10) || 1);

  const { articles, total } = await getLatestArticles(currentPage, ITEMS_PER_PAGE);
  const newsTz = process.env.NEWS_DAY_TIMEZONE ?? "Asia/Tokyo";

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const page = Math.max(1, Math.min(currentPage, totalPages));

  return (
    <main className="min-h-screen bg-neutral-950 pb-16 pt-[calc(var(--header-height)+0.5rem)]">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <header className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
              Live Feed
            </p>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Latest News
          </h1>
          <p className="mt-2 font-mono text-xs text-neutral-500">
            Today only ({newsTz}). Older fetched items are removed on the next fetch.
          </p>
        </header>

        {/* News Feed */}
        <div className="mt-6 divide-y divide-white/5">
          {articles.length === 0 ? (
            <p className="py-12 text-center font-mono text-sm text-neutral-600">
              No articles yet.{" "}
              <a href="/api/fetch-news" className="text-emerald-400 underline">
                Fetch news
              </a>{" "}
              to populate.
            </p>
          ) : (
            articles.map((item, idx) => (
              <article
                key={item.id}
                className={cn(
                  "group relative py-5 transition-all duration-300",
                  "hover:bg-emerald-500/5",
                  idx === 0 && "pt-0"
                )}
              >
                <Link href={`/news/${item.id}`} className="flex gap-4 sm:gap-5">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-neutral-800 transition-all group-hover:border-emerald-500/30 sm:h-24 sm:w-36">
                    <ArticleThumbnail
                      src={item.thumbnail}
                      alt={item.title}
                      fallback={`https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=60`}
                      fill
                      sizes="(min-width: 640px) 144px, 112px"
                      className="object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[0.55rem] font-mono uppercase tracking-wider text-emerald-400">
                        {item.category}
                      </span>
                      <span className="text-[0.6rem] font-mono text-neutral-600">
                        {timeAgo(item.created_at)}
                      </span>
                    </div>

                    <h2 className="mt-1.5 text-sm font-semibold leading-snug text-neutral-200 transition-colors group-hover:text-emerald-300 sm:text-base">
                      {item.title}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-xs text-neutral-500 sm:text-sm">
                      {item.summary}
                    </p>

                    <p className="mt-2 text-[0.6rem] font-mono text-neutral-600">
                      {item.author ? `By ${item.author} · ` : ""}
                      {item.source}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="hidden items-center text-neutral-700 transition-all group-hover:translate-x-1 group-hover:text-emerald-400 sm:flex">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-3 border-t border-white/10 pt-6" aria-label="Pagination">
            {page > 1 ? (
              <Link
                href={page === 2 ? "/latest" : `/latest?page=${page - 1}`}
                className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-neutral-900/60 px-4 py-2 font-mono text-xs text-neutral-400 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:text-emerald-300"
              >
                <span aria-hidden>←</span> Prev
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded border border-white/5 bg-neutral-900/40 px-4 py-2 font-mono text-xs text-neutral-700">
                <span aria-hidden>←</span> Prev
              </span>
            )}

            <span className="font-mono text-xs text-neutral-600">
              {page} / {totalPages}
            </span>

            {page < totalPages ? (
              <Link
                href={`/latest?page=${page + 1}`}
                className="inline-flex items-center gap-1.5 rounded border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 font-mono text-xs text-emerald-300 backdrop-blur-sm transition-all hover:bg-emerald-500/20"
              >
                Next <span aria-hidden>→</span>
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded border border-white/5 bg-neutral-900/40 px-4 py-2 font-mono text-xs text-neutral-700">
                Next <span aria-hidden>→</span>
              </span>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
