import { ArticleBody } from "@/components/ArticleBody";
import { ArticleThumbnail } from "@/components/ArticleThumbnail";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShareBar } from "@/components/ArticleShareBar";
import { MostPopularSidebar } from "@/components/MostPopularSidebar";
import { getArticleById, getLatestArticles, timeAgo } from "@/lib/articles";

export const revalidate = 300;

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { article } = await getArticleById(id);
  if (!article) notFound();

  const { articles: related } = await getLatestArticles(1, 6);
  const sidebar = related.filter((a) => a.id !== article.id).slice(0, 5);

  // MostPopularSidebar が期待する shape に変換
  const sidebarItems = sidebar.map((a, i) => ({
    id: i + 1,
    title: a.title,
    category: a.category,
    summary: a.summary,
    author: a.author,
    publishedAt: timeAgo(a.created_at),
    imageUrl: a.thumbnail,
    href: `/news/${a.id}`,
  }));

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Hero: thumbnail + title block */}
        <header className="grid grid-cols-1 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 lg:grid-cols-[1fr,minmax(320px,40%)]">
          <div className="relative aspect-[16/10] min-h-[240px] lg:aspect-auto lg:min-h-[360px]">
            <ArticleThumbnail
              src={article.thumbnail}
              alt=""
              fallback="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=60"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center bg-emerald-600 px-6 py-8 dark:bg-emerald-700">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
              {article.category}
            </span>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-emerald-50">
              {article.author ? `${article.author} · ` : ""}
              {article.source} · {timeAgo(article.created_at)}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs text-emerald-100">Share</span>
              <button
                type="button"
                className="rounded p-1.5 text-white/80 transition hover:bg-white/20 hover:text-white"
                aria-label="Share on X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                type="button"
                className="rounded p-1.5 text-white/80 transition hover:bg-white/20 hover:text-white"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <article className="min-w-0 flex-1 lg:max-w-[65%]">
            <ArticleBody content={article.body} fallback={article.summary} />

            <ArticleShareBar title={article.title} className="mt-10" />

            <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Topics
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href={`/${article.category}`}
                  className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 transition hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-800/50"
                >
                  {article.category.toUpperCase()}
                </Link>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {article.source}
                </span>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <MostPopularSidebar
            articles={sidebarItems}
            theme="emerald"
            className="lg:w-[35%] lg:min-w-[280px] lg:pl-8"
          />
        </div>
      </div>
    </main>
  );
}
