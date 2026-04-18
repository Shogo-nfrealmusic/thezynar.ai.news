import Link from "next/link";
import Image from "next/image";
import { latestNews, type LatestNewsItem } from "@/lib/mockLatestNews";
import { cn } from "@/lib/utils";
import { MostPopularSidebar } from "@/components/MostPopularSidebar";

const ITEMS_PER_PAGE = 12;

interface TechNewsSectionProps {
  currentPage?: number;
  basePath?: string;
  itemsPerPage?: number;
  className?: string;
}

function TechBadge() {
  return (
    <span className="inline-block rounded-sm bg-blue-500 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
      tech
    </span>
  );
}

function FeatureArticle({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group">
      <Link href={`/news/${article.id}`} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-800 md:aspect-[21/9]">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <TechBadge />
            <h2 className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">
              {article.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-xs text-neutral-300 sm:text-sm">
              {article.summary}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[0.65rem] text-neutral-500">{article.author}</span>
          <span className="text-neutral-700">·</span>
          <span className="text-[0.65rem] text-neutral-500">{article.publishedAt}</span>
        </div>
      </Link>
    </article>
  );
}

function GridCard({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group">
      <Link href={`/news/${article.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-neutral-800">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 640px) 30vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2">
            <TechBadge />
          </div>
        </div>
        <div className="mt-2">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-100 transition-colors group-hover:text-blue-400">
            {article.title}
          </h3>
          <span className="mt-1 block text-[0.65rem] text-neutral-500">{article.publishedAt}</span>
        </div>
      </Link>
    </article>
  );
}

function CompactListItem({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group border-b border-neutral-800/60 last:border-0">
      <Link href={`/news/${article.id}`} className="flex gap-3 py-3">
        <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-800">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <TechBadge />
            <span className="text-[0.6rem] text-neutral-500">{article.publishedAt}</span>
          </div>
          <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-neutral-200 transition-colors group-hover:text-blue-400">
            {article.title}
          </h4>
        </div>
      </Link>
    </article>
  );
}

export function TechNewsSection({
  currentPage = 1,
  basePath = "/tech",
  itemsPerPage = ITEMS_PER_PAGE,
  className,
}: TechNewsSectionProps) {
  const techNews = latestNews.filter((item) => item.category === "tech");
  const totalItems = techNews.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const page = Math.max(1, Math.min(currentPage, totalPages));

  const paginatedItems = techNews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const featureArticle = paginatedItems[0];
  const gridArticles = paginatedItems.slice(1, 5);
  const compactArticles = paginatedItems.slice(5);

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
            <span className="block h-5 w-1 rounded-full bg-blue-500" />
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-blue-500">
                Technology
              </p>
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Tech News
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-8 lg:w-8/12">
            {/* Featured */}
            {featureArticle && (
              <div>
                <h2 className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  — Featured
                </h2>
                <FeatureArticle article={featureArticle} />
              </div>
            )}

            {/* Grid */}
            {gridArticles.length > 0 && (
              <div>
                <h2 className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  — Latest Stories
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {gridArticles.map((article) => (
                    <GridCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}

            {/* Compact list */}
            {compactArticles.length > 0 && (
              <div>
                <h2 className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  — More in Tech
                </h2>
                <ul>
                  {compactArticles.map((article) => (
                    <CompactListItem key={article.id} article={article} />
                  ))}
                </ul>
              </div>
            )}

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-3" aria-label="Pagination">
              {page > 1 ? (
                <Link
                  href={page === 2 ? basePath : `${basePath}?page=${page - 1}`}
                  className="inline-flex items-center gap-1 rounded border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-300 transition hover:border-blue-500 hover:text-white"
                >
                  ← Prev
                </Link>
              ) : (
                <span
                  className="inline-flex cursor-not-allowed items-center gap-1 rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-600"
                  aria-disabled
                >
                  ← Prev
                </span>
              )}
              <span className="text-sm text-neutral-500">
                {page} / {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  href={`${basePath}?page=${page + 1}`}
                  className="inline-flex items-center gap-1 rounded border border-blue-500 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white"
                >
                  Next →
                </Link>
              ) : (
                <span
                  className="inline-flex cursor-not-allowed items-center gap-1 rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-600"
                  aria-disabled
                >
                  Next →
                </span>
              )}
            </nav>
          </div>

          <MostPopularSidebar articles={techNews} theme="blue" className="lg:w-4/12" />
        </div>
      </div>
    </section>
  );
}
