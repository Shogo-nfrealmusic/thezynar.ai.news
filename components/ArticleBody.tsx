import { formatArticleBody } from "@/lib/formatArticleBody";

interface ArticleBodyProps {
  content?: string;
  fallback?: string;
  className?: string;
}

/**
 * 本文を整形して段落ごとに表示（DB が旧形式でも format で読みやすくする）
 */
export function ArticleBody({ content, fallback, className }: ArticleBodyProps) {
  const text = formatArticleBody((content || fallback || "").trim());
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div
      className={
        className ??
        "mx-auto max-w-[40rem] space-y-6 text-[17px] leading-[1.85] tracking-[0.01em] text-pretty text-neutral-800 dark:text-neutral-200"
      }
    >
      {paragraphs.map((para, i) => (
        <p key={i} className="hyphens-auto">
          {para}
        </p>
      ))}
    </div>
  );
}
