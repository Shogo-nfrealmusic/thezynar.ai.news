import Link from "next/link";
import { notFound } from "next/navigation";
import { getGadgetArticleById } from "@/lib/gadget";
import { GadgetArticleForm } from "../../GadgetArticleForm";

export default async function GadgetEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getGadgetArticleById(id);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-2xl px-4">
        <Link
          href="/gadget"
          className="mb-6 inline-block text-sm text-neutral-600 hover:underline dark:text-neutral-400"
        >
          ← Back to list
        </Link>
        <h1 className="text-xl font-bold">Edit article</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {article.title || "(Untitled)"}
        </p>
        <div className="mt-8">
          <GadgetArticleForm mode="edit" article={article} />
        </div>
      </div>
    </main>
  );
}
