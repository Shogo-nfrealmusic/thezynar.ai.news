"use client";

import Link from "next/link";
import { latestNews, type LatestNewsItem } from "@/lib/mockLatestNews";

type SidebarItem = LatestNewsItem & { href?: string };
import { cn } from "@/lib/utils";

type ColorTheme = "blue" | "purple" | "orange" | "pink" | "emerald";

const themeStyles: Record<ColorTheme, { accent: string; number: string; hover: string }> = {
  blue: {
    accent: "text-blue-400",
    number: "text-blue-500",
    hover: "group-hover/rank:text-blue-300",
  },
  purple: {
    accent: "text-purple-400",
    number: "text-purple-500",
    hover: "group-hover/rank:text-purple-300",
  },
  orange: {
    accent: "text-orange-400",
    number: "text-orange-500",
    hover: "group-hover/rank:text-orange-300",
  },
  pink: {
    accent: "text-pink-400",
    number: "text-pink-500",
    hover: "group-hover/rank:text-pink-300",
  },
  emerald: {
    accent: "text-green-400",
    number: "text-green-500",
    hover: "group-hover/rank:text-green-300",
  },
};

interface MostPopularSidebarProps {
  articles?: SidebarItem[];
  theme?: ColorTheme;
  sticky?: boolean;
  className?: string;
}

export function MostPopularSidebar({
  articles,
  theme = "blue",
  sticky = true,
  className,
}: MostPopularSidebarProps) {
  const items: SidebarItem[] = articles ?? (latestNews.slice(0, 5) as SidebarItem[]);
  const displayItems = items.slice(0, 5);
  const styles = themeStyles[theme];

  return (
    <aside
      className={cn(
        sticky && "lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:self-start",
        className
      )}
    >
      <div className="rounded-sm border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
        {/* Header */}
        <div className="mb-4 border-b border-neutral-800 pb-3">
          <p className={cn("text-[0.6rem] font-bold uppercase tracking-[0.25em]", styles.accent)}>
            Trending
          </p>
          <h3 className="mt-0.5 text-base font-extrabold tracking-tight text-white sm:text-lg">
            Most Popular
          </h3>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="-mx-4 overflow-x-auto px-4 pb-2 lg:hidden">
          <ol className="flex gap-3">
            {displayItems.map((item, index) => (
              <li key={item.id} className="w-[200px] flex-shrink-0 sm:w-[240px]">
                <Link
                  href={item.href ?? `/news/${item.id}`}
                  className="group/rank block rounded-sm border border-neutral-800 bg-neutral-900 p-3 transition-colors hover:border-neutral-700"
                >
                  <span className={cn("text-lg font-black tabular-nums", styles.number)}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={cn("mt-1.5 line-clamp-2 text-[0.75rem] font-semibold leading-snug text-neutral-200 transition-colors", styles.hover)}>
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[0.6rem] text-neutral-500">
                    {item.category.toUpperCase()} · {item.publishedAt}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: vertical list */}
        <ol className="hidden space-y-3 lg:block">
          {displayItems.map((item, index) => (
            <li key={item.id} className="group/rank flex gap-3 border-b border-neutral-800/50 pb-3 last:border-0 last:pb-0">
              <span className={cn("mt-0.5 text-xl font-black tabular-nums leading-none", styles.number)}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <Link href={item.href ?? `/news/${item.id}`} className="min-w-0 flex-1">
                <p className={cn("text-[0.8rem] font-semibold leading-snug text-neutral-200 transition-colors", styles.hover)}>
                  {item.title}
                </p>
                <p className="mt-1 text-[0.65rem] text-neutral-500">
                  {item.category.toUpperCase()} · {item.publishedAt}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
