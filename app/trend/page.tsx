import Image from "next/image";
import Link from "next/link";
import { getTrendingNews, latestNews, type LatestNewsItem } from "@/lib/mockLatestNews";
import { cn } from "@/lib/utils";

const RANK_STYLES = [
  "from-pink-400 to-rose-500",
  "from-pink-500 to-rose-600",
  "from-pink-600 to-rose-700",
  "from-neutral-500 to-neutral-600",
  "from-neutral-600 to-neutral-700",
];

const TOPIC_TAGS = [
  { label: "AI", count: 156, size: "lg" },
  { label: "Startups", count: 89, size: "md" },
  { label: "Climate Tech", count: 67, size: "md" },
  { label: "Robotics", count: 54, size: "sm" },
  { label: "Fintech", count: 48, size: "sm" },
  { label: "Space", count: 42, size: "sm" },
  { label: "Crypto", count: 38, size: "xs" },
  { label: "Healthcare", count: 35, size: "xs" },
  { label: "EVs", count: 31, size: "xs" },
  { label: "Gaming", count: 28, size: "xs" },
  { label: "VR/AR", count: 24, size: "xs" },
  { label: "Quantum", count: 18, size: "xs" },
];

function TrendingRankItem({ article, index }: { article: LatestNewsItem; index: number }) {
  const isTop3 = index < 3;
  
  return (
    <li className="group">
      <Link
        href={`/news/${article.id}`}
        className={cn(
          "relative flex gap-4 rounded-2xl p-4 transition-all duration-300",
          isTop3 
            ? "bg-gradient-to-r from-pink-950/50 to-transparent ring-1 ring-pink-500/20 hover:ring-pink-500/40" 
            : "hover:bg-neutral-900"
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base font-bold tabular-nums text-white shadow-lg sm:h-12 sm:w-12 sm:text-lg",
            RANK_STYLES[Math.min(index, RANK_STYLES.length - 1)]
          )}
        >
          {index + 1}
        </span>

        <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-800 sm:h-20 sm:w-32">
          <Image
            src={article.imageUrl}
            alt=""
            fill
            sizes="(min-width: 640px) 128px, 96px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-pink-300">
              {article.category}
            </span>
            {isTop3 && (
              <span className="flex items-center gap-1 text-[0.6rem] font-medium text-pink-400">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
                </svg>
                Hot
              </span>
            )}
          </div>
          
          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-pink-300 sm:text-base">
            {article.title}
          </h3>
          
          <p className="mt-1 text-[0.65rem] text-neutral-500 sm:text-xs">
            {article.author} · {article.publishedAt}
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-pink-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </li>
  );
}

function TopicTag({ label, count, size }: { label: string; count: number; size: string }) {
  const sizeClasses = {
    lg: "px-4 py-2 text-sm",
    md: "px-3 py-1.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    xs: "px-2 py-0.5 text-[0.65rem]",
  }[size] || "px-2 py-1 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-neutral-800 font-medium text-neutral-300 ring-1 ring-neutral-700 transition-all hover:bg-pink-950/50 hover:text-pink-300 hover:ring-pink-500/30",
        sizeClasses
      )}
    >
      {label}
      <span className="text-neutral-500">{count}</span>
    </span>
  );
}

function CompactTrendItem({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group">
      <Link href={`/news/${article.id}`} className="flex gap-3 rounded-lg p-2 transition-all hover:bg-pink-500/5">
        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-800">
          <Image
            src={article.imageUrl}
            alt=""
            fill
            sizes="64px"
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-2 text-sm font-medium leading-snug text-neutral-200 transition-colors group-hover:text-pink-300">
            {article.title}
          </h4>
          <p className="mt-0.5 text-[0.6rem] text-neutral-500">
            {article.category.toUpperCase()} · {article.publishedAt}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default async function TrendPage() {
  const trendingItems = getTrendingNews(5);
  const recentTrending = latestNews.filter(item => item.category === "trending").slice(0, 6);

  return (
    <main className="min-h-screen bg-neutral-950 pb-16 pt-[calc(var(--header-height)+0.5rem)]">
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <header className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-pink-400">
              Real-time Rankings
            </p>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Trending Now
          </h1>
          <p className="mt-2 font-mono text-xs text-neutral-500">
            The most-read stories and hottest topics across AI, tech, and innovation.
          </p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main Column: Trending Rankings */}
          <div className="lg:col-span-2">
            {/* Section 1: Trending Now - Large Ranking List */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                Top Stories This Week
              </h2>
              <ol className="space-y-2">
                {trendingItems.map((item, index) => (
                  <TrendingRankItem key={item.id} article={item} index={index} />
                ))}
              </ol>
            </section>

            {/* Section 3: Latest Trending Articles */}
            {recentTrending.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  <span className="h-px flex-1 bg-neutral-800" />
                  Latest Trending
                  <span className="h-px flex-1 bg-neutral-800" />
                </h2>
                <div className="grid gap-1 sm:grid-cols-2">
                  {recentTrending.map((article) => (
                    <CompactTrendItem key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Section 2: Hot Topics - Tag Cloud */}
            <section className="rounded-2xl bg-neutral-900 p-5 ring-1 ring-neutral-800">
              <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Hot Topics
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {TOPIC_TAGS.map((tag) => (
                  <TopicTag key={tag.label} {...tag} />
                ))}
              </div>
            </section>

            {/* Stats Card */}
            <section className="rounded-2xl bg-gradient-to-br from-pink-950/50 to-neutral-900 p-5 ring-1 ring-pink-500/20">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">
                This Week&apos;s Stats
              </h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Total Views</span>
                  <span className="text-lg font-bold text-white">2.4M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Articles Published</span>
                  <span className="text-lg font-bold text-white">847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Avg. Read Time</span>
                  <span className="text-lg font-bold text-white">4.2m</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
