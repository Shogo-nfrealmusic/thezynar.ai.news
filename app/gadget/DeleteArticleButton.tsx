"use client";

import { useTransition } from "react";
import { deleteArticle } from "./actions";

interface DeleteArticleButtonProps {
  articleId: string;
}

export function DeleteArticleButton({ articleId }: DeleteArticleButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        if (!confirm("Delete this article?")) return;
        startTransition(() => deleteArticle(articleId));
      }}
      disabled={isPending}
      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-900/50 dark:bg-neutral-900 dark:text-red-400 dark:hover:bg-red-950/30 disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
