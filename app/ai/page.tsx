import Link from "next/link";
import Image from "next/image";
import { latestNews, type LatestNewsItem } from "@/lib/mockLatestNews";

const ITEMS_PER_PAGE = 10;

function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_50%)]" />
    </div>
  );
}

function FeaturedModelCard({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent" />
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      
      <Link href={`/news/${article.id}`} className="relative flex flex-col md:flex-row">
        <div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:h-[320px] md:w-2/5">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:hidden" />
        </div>

        <div className="relative flex flex-1 flex-col justify-center p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-wider text-purple-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
              New Release
            </span>
            <span className="text-[0.65rem] font-mono text-neutral-500">
              {article.publishedAt}
            </span>
          </div>
          
          <h2 className="mt-4 text-xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-purple-300 sm:text-2xl lg:text-3xl">
            {article.title}
          </h2>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-400">
            {article.summary}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded border border-purple-500/50 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-300 transition-all group-hover:border-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-200">
              View Model
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="text-xs text-neutral-500">
              by {article.author}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function ModelReleaseCard({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/5 bg-neutral-900/60 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <Link href={`/news/${article.id}`} className="relative block p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-neutral-800">
            <Image
              src={article.imageUrl}
              alt=""
              fill
              sizes="64px"
              className="object-cover opacity-70 transition-all group-hover:opacity-100"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[0.55rem] font-mono uppercase tracking-wider text-purple-400">
                AI
              </span>
              <span className="text-[0.6rem] font-mono text-neutral-600">
                {article.publishedAt}
              </span>
            </div>

            <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-neutral-200 transition-colors group-hover:text-purple-300">
              {article.title}
            </h3>

            <p className="mt-1.5 line-clamp-2 text-xs text-neutral-500">
              {article.summary}
            </p>

            <p className="mt-2 text-[0.6rem] font-mono text-neutral-600">
              {article.author}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

function SignalItem({ article, index }: { article: LatestNewsItem; index: number }) {
  return (
    <article className="group border-b border-white/5 last:border-0">
      <Link href={`/news/${article.id}`} className="flex items-center gap-4 py-3 transition-all hover:bg-purple-500/5">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-purple-500/30 bg-purple-500/10 font-mono text-xs font-bold text-purple-400">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-1 text-sm font-medium text-neutral-300 transition-colors group-hover:text-purple-300">
            {article.title}
          </h4>
        </div>

        <span className="flex-shrink-0 text-[0.6rem] font-mono text-neutral-600">
          {article.publishedAt}
        </span>

        <svg className="h-4 w-4 flex-shrink-0 text-neutral-700 transition-all group-hover:translate-x-1 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}

export default async function AiPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(String(params?.page ?? "1"), 10) || 1);

  const aiNews = latestNews.filter((item) => item.category === "ai");
  const totalItems = aiNews.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const page = Math.max(1, Math.min(currentPage, totalPages));
  const items = aiNews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const featuredModel = items[0];
  const modelReleases = items.slice(1, 5);
  const signals = items.slice(5);

  return (
    <main className="relative min-h-screen bg-neutral-950 pb-16 pt-[calc(var(--header-height)+0.5rem)]">
      <GridBackground />
      
      <div className="relative z-10 mx-auto max-w-5xl px-4">
        {/* Header */}
        <header className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400">
              Research Lab
            </p>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AI Research & Models
          </h1>
          <p className="mt-2 font-mono text-xs text-neutral-500">
            Tracking breakthroughs, model releases, and research developments in artificial intelligence.
          </p>
        </header>

        {/* Section 1: Featured Model */}
        {featuredModel && (
          <section className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-purple-400">
                Featured Model
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent" />
            </div>
            <FeaturedModelCard article={featuredModel} />
          </section>
        )}

        {/* Section 2: Model Releases */}
        {modelReleases.length > 0 && (
          <section className="mt-10">
            <div className="mb-5 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
                Model Releases
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {modelReleases.map((article) => (
                <ModelReleaseCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Section 3: AI Signals */}
        {signals.length > 0 && (
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
                AI Signals
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="rounded-xl border border-white/5 bg-neutral-900/40 px-4 backdrop-blur-sm">
              {signals.map((article, idx) => (
                <SignalItem key={article.id} article={article} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Pagination */}
        <nav className="mt-10 flex items-center justify-center gap-3 border-t border-white/10 pt-6" aria-label="Pagination">
          {page > 1 ? (
            <Link
              href={page === 2 ? "/ai" : `/ai?page=${page - 1}`}
              className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-neutral-900/60 px-4 py-2 font-mono text-xs text-neutral-400 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:text-purple-300"
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
              href={`/ai?page=${page + 1}`}
              className="inline-flex items-center gap-1.5 rounded border border-purple-500/50 bg-purple-500/10 px-4 py-2 font-mono text-xs text-purple-300 backdrop-blur-sm transition-all hover:bg-purple-500/20"
            >
              Next <span aria-hidden>→</span>
            </Link>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded border border-white/5 bg-neutral-900/40 px-4 py-2 font-mono text-xs text-neutral-700">
              Next <span aria-hidden>→</span>
            </span>
          )}
        </nav>
      </div>
    </main>
  );
}
