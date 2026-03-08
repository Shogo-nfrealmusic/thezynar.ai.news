import Link from "next/link";
import { notFound } from "next/navigation";
import { getGadgetArticleById } from "@/lib/gadget";

export default async function GadgetArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getGadgetArticleById(id);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-3xl px-4">
        <Link
          href="/gadget"
          className="mb-6 inline-block text-sm text-neutral-600 hover:underline dark:text-neutral-400"
        >
          ← Back to Gadget
        </Link>

        <article>
          {article.thumbnail && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.thumbnail}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="mt-6 text-2xl font-bold dark:text-white">
            {article.title}
          </h1>
          <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
            <p className="text-neutral-600 dark:text-neutral-300">
              {article.summary}
            </p>
            <div className="mt-6 whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
              {article.body}
            </div>
          </div>
          {article.link && (
            <p className="mt-8">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Go to link →
              </a>
            </p>
          )}
        </article>
      </div>
    </main>
  );
}
