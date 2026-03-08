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

function TechTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-blue-400",
        className
      )}
    >
      tech
    </span>
  );
}

function FeatureArticle({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900 md:h-[280px]">
      <Link
        href={`/news/${article.id}`}
        className="flex h-full flex-col md:flex-row"
      >
        <div className="relative aspect-[16/9] w-full md:aspect-auto md:h-full md:w-1/2">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-black/10" />
        </div>

        <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <TechTag />
            <span className="text-[0.65rem] text-neutral-500 dark:text-neutral-400 sm:text-xs">
              {article.publishedAt}
            </span>
          </div>

          <h2 className="mt-2 text-lg font-bold leading-tight text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:mt-3 sm:text-xl md:mt-4 md:text-2xl lg:text-3xl">
            {article.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400 sm:mt-3 md:text-base">
            {article.summary}
          </p>

          <div className="mt-3 flex items-center gap-4 sm:mt-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-all group-hover:bg-blue-500 group-hover:text-white dark:text-blue-400 dark:group-hover:text-white sm:px-4 sm:py-2 sm:text-sm">
              Read more
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function GridCard({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900 sm:rounded-xl">
      <Link href={`/news/${article.id}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:h-44 sm:aspect-auto">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
            <TechTag className="text-[0.6rem] sm:text-[0.68rem]" />
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 text-[0.65rem] text-neutral-500 dark:text-neutral-400 sm:text-xs">
            <span>{article.publishedAt}</span>
          </div>

          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:mt-2 sm:text-base">
            {article.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400 sm:mt-2 sm:text-sm">
            {article.summary}
          </p>
        </div>
      </Link>
    </article>
  );
}

function CompactListItem({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group flex gap-3 rounded-lg border border-transparent p-1.5 transition-all hover:border-neutral-200 hover:bg-neutral-50 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/50 sm:gap-4 sm:p-2">
      <Link
        href={`/news/${article.id}`}
        className="flex w-full gap-3 sm:gap-4"
      >
        <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-700 sm:h-16 sm:w-24 sm:rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <TechTag className="text-[0.55rem] px-1 py-0 sm:text-[0.6rem] sm:px-1.5" />
            <span className="text-[0.6rem] text-neutral-500 dark:text-neutral-400 sm:text-[0.65rem]">
              {article.publishedAt}
            </span>
          </div>
          <h4 className="mt-0.5 line-clamp-2 text-xs font-medium leading-snug text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:mt-1 sm:text-sm">
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
        "border-t border-neutral-200/70 bg-neutral-50/90 px-4 py-6 dark:border-neutral-800 dark:bg-neutral-950/90 sm:py-8 md:py-12",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-500 sm:text-xs">
            Technology
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
            Tech News
          </h1>
          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 sm:mt-3 sm:text-sm">
            The latest in chips, software, startups, and digital innovation —
            your daily dose of tech coverage.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8 lg:flex-row">
          <div className="flex-1 space-y-6 sm:space-y-8 lg:w-8/12 lg:space-y-10">
            {featureArticle && (
              <div>
                <h2 className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 sm:mb-4 sm:text-xs">
                  <span className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                  Featured
                  <span className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                </h2>
                <FeatureArticle article={featureArticle} />
              </div>
            )}

            {gridArticles.length > 0 && (
              <div>
                <h2 className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 sm:mb-4 sm:text-xs">
                  <span className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                  Latest Stories
                  <span className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  {gridArticles.map((article) => (
                    <GridCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}

            {compactArticles.length > 0 && (
              <div>
                <h2 className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 sm:mb-4 sm:text-xs">
                  <span className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                  More in Tech
                  <span className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                </h2>
                <div className="space-y-0.5 sm:space-y-1">
                  {compactArticles.map((article) => (
                    <CompactListItem key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}

            <nav
              className="mt-6 flex items-center justify-center gap-2 sm:mt-8 sm:gap-3"
              aria-label="Pagination"
            >
              {page > 1 ? (
                <Link
                  href={page === 2 ? basePath : `${basePath}?page=${page - 1}`}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <span aria-hidden>←</span> Prev
                </Link>
              ) : (
                <span
                  className="inline-flex cursor-not-allowed items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
                  aria-disabled
                >
                  <span aria-hidden>←</span> Prev
                </span>
              )}
              <span className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  href={`${basePath}?page=${page + 1}`}
                  className="inline-flex items-center gap-1 rounded-full border border-blue-500/70 bg-white px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm transition hover:bg-blue-50 dark:border-blue-400/70 dark:bg-neutral-800 dark:text-blue-200 dark:hover:bg-blue-900/30 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Next <span aria-hidden>→</span>
                </Link>
              ) : (
                <span
                  className="inline-flex cursor-not-allowed items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
                  aria-disabled
                >
                  Next <span aria-hidden>→</span>
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
