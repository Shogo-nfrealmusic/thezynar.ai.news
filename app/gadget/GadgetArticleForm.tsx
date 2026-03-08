"use client";

import Link from "next/link";
import type { GadgetArticle } from "@/lib/gadget";
import { createArticle, updateArticle } from "./actions";

interface GadgetArticleFormProps {
  mode: "new" | "edit";
  article?: GadgetArticle | null;
}

export function GadgetArticleForm({ mode, article }: GadgetArticleFormProps) {
  const action = mode === "new" ? createArticle : (formData: FormData) => updateArticle(article!.id, formData);

  return (
    <form action={action} className="mx-auto max-w-2xl space-y-6">
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Thumbnail URL
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          defaultValue={article?.thumbnail}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={article?.title}
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Summary (for list view)
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={2}
          defaultValue={article?.summary}
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          rows={10}
          defaultValue={article?.body}
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Link (e.g. affiliate)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          defaultValue={article?.link}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          {mode === "new" ? "Publish" : "Update"}
        </button>
        <Link
          href="/gadget"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
