import Link from "next/link";
import { getGadgetArticles } from "@/lib/gadget";
import { DeleteArticleButton } from "./DeleteArticleButton";

export default async function GadgetPage() {
  const articles = await getGadgetArticles();

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-6 dark:border-neutral-800">
          <div>
            <h1 className="text-2xl font-bold">Gadget articles</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Create, edit, and delete articles (will be stored in DB when Supabase is connected)
            </p>
          </div>
          <Link
            href="/gadget/new"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            New post
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-neutral-300 py-16 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
            <p>No articles yet.</p>
            <Link
              href="/gadget/new"
              className="mt-4 inline-block text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Create your first article
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {articles.map((article) => (
              <li
                key={article.id}
                className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800">
                  {article.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-xs text-neutral-400">
                      No image
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-neutral-900 dark:text-white">
                    {article.title || "(Untitled)"}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {article.summary || "—"}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                    <span>Updated: {new Date(article.updatedAt).toLocaleDateString("en-US")}</span>
                    {article.link && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        Link
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Link
                    href={`/gadget/${article.id}`}
                    className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    View
                  </Link>
                  <Link
                    href={`/gadget/${article.id}/edit`}
                    className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    Edit
                  </Link>
                  <DeleteArticleButton articleId={article.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
