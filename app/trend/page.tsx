import Image from "next/image";
import Link from "next/link";
import { getTrendingNews } from "@/lib/mockLatestNews";
import { cn } from "@/lib/utils";

const RANK_STYLES = [
  "from-emerald-400 to-emerald-600 text-white",
  "from-emerald-500/90 to-emerald-600 text-white",
  "from-emerald-600/80 to-emerald-700 text-white",
  "from-neutral-500 to-neutral-600 text-white",
  "from-neutral-500 to-neutral-600 text-white",
  "from-neutral-600 to-neutral-700 text-white",
  "from-neutral-600 to-neutral-700 text-white",
  "from-neutral-600 to-neutral-700 text-white",
  "from-neutral-600 to-neutral-700 text-white",
  "from-neutral-600 to-neutral-700 text-white",
];

export default async function TrendPage() {
  const items = getTrendingNews(10);

  return (
    <main className="min-h-screen bg-neutral-50 pb-24 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-3xl px-4">
        <header className="border-b border-neutral-200 pb-8 dark:border-neutral-800">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
            By access
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Most Read
          </h1>
          <p className="mt-3 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Top 10 stories across all news, ranked by traffic this week.
          </p>
        </header>

        <ol className="mt-10 space-y-2">
          {items.map((item, index) => (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className={cn(
                  "group flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-emerald-500/70 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-emerald-500/50"
                )}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold tabular-nums shadow-md",
                    RANK_STYLES[index]
                  )}
                >
                  {index + 1}
                </span>
                <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 sm:h-24 sm:w-36">
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 144px, 112px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {item.category}
                  </span>
                  <h2 className="mt-1 font-semibold leading-snug transition group-hover:text-emerald-700 dark:group-hover:text-emerald-300 sm:text-lg">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {item.summary}
                  </p>
                  <p className="mt-2 text-[0.7rem] text-neutral-500 dark:text-neutral-500">
                    {item.author} · {item.publishedAt}
                  </p>
                </div>
                <span className="flex flex-shrink-0 items-center text-neutral-400 transition group-hover:text-emerald-500 dark:text-neutral-500" aria-hidden>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
