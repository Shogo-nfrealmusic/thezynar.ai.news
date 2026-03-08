import Link from "next/link";
import { GadgetArticleForm } from "../GadgetArticleForm";

export default function GadgetNewPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-2xl px-4">
        <Link
          href="/gadget"
          className="mb-6 inline-block text-sm text-neutral-600 hover:underline dark:text-neutral-400"
        >
          ← Back to list
        </Link>
        <h1 className="text-xl font-bold">New article</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Add thumbnail, title, summary, body, and link (e.g. affiliate)
        </p>
        <div className="mt-8">
          <GadgetArticleForm mode="new" />
        </div>
      </div>
    </main>
  );
}
