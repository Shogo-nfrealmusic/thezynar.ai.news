"use client";

import Link from "next/link";
import { latestNews, type LatestNewsItem } from "@/lib/mockLatestNews";
import { cn } from "@/lib/utils";

type ColorTheme = "blue" | "purple" | "orange" | "pink" | "emerald";

const themeStyles: Record<
  ColorTheme,
  {
    border: string;
    shadow: string;
    label: string;
    number: string;
    numberBg: string;
    titleHover: string;
  }
> = {
  blue: {
    border: "border-blue-500/20",
    shadow: "shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    label: "text-blue-400",
    number: "text-blue-400",
    numberBg: "bg-blue-500/20",
    titleHover: "group-hover/rank:text-blue-300",
  },
  purple: {
    border: "border-purple-500/20",
    shadow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]",
    label: "text-purple-400",
    number: "text-purple-400",
    numberBg: "bg-purple-500/20",
    titleHover: "group-hover/rank:text-purple-300",
  },
  orange: {
    border: "border-orange-500/20",
    shadow: "shadow-[0_0_40px_rgba(251,146,60,0.15)]",
    label: "text-orange-400",
    number: "text-orange-400",
    numberBg: "bg-orange-500/20",
    titleHover: "group-hover/rank:text-orange-300",
  },
  pink: {
    border: "border-pink-500/20",
    shadow: "shadow-[0_0_40px_rgba(236,72,153,0.15)]",
    label: "text-pink-400",
    number: "text-pink-400",
    numberBg: "bg-pink-500/20",
    titleHover: "group-hover/rank:text-pink-300",
  },
  emerald: {
    border: "border-emerald-500/20",
    shadow: "shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    label: "text-emerald-400",
    number: "text-emerald-400",
    numberBg: "bg-emerald-500/20",
    titleHover: "group-hover/rank:text-emerald-300",
  },
};

interface MostPopularSidebarProps {
  articles?: LatestNewsItem[];
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
  const items = articles ?? latestNews.slice(0, 5);
  const displayItems = items.slice(0, 5);
  const styles = themeStyles[theme];

  return (
    <aside
      className={cn(
        sticky && "lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:self-start",
        className
      )}
    >
      <div
        className={cn(
          "rounded-2xl border bg-neutral-900/80 p-4 backdrop-blur-xl sm:rounded-3xl sm:p-5 lg:p-6",
          styles.border,
          styles.shadow
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between lg:block">
          <div>
            <p
              className={cn(
                "text-[0.65rem] font-semibold uppercase tracking-widest sm:text-xs",
                styles.label
              )}
            >
              Trending
            </p>
            <h3 className="mt-1 text-base font-extrabold tracking-tight text-white sm:text-lg lg:mt-2 lg:text-xl">
              Most Popular
            </h3>
          </div>
          <p className="hidden text-[0.65rem] text-neutral-400 sm:text-xs lg:mt-2 lg:block lg:text-sm">
            The stories readers couldn&apos;t stop clicking over the past seven
            days.
          </p>
        </div>

        {/* Mobile: Horizontal scroll cards */}
        <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-2 lg:hidden">
          <ol className="flex gap-3">
            {displayItems.map((item, index) => (
              <li key={item.id} className="w-[200px] flex-shrink-0 sm:w-[240px]">
                <Link
                  href={`/news/${item.id}`}
                  className="group/rank block rounded-xl border border-white/5 bg-neutral-800/50 p-3 transition-all hover:border-white/10 hover:bg-neutral-800"
                >
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold tabular-nums",
                      styles.numberBg,
                      styles.number
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "mt-2 line-clamp-2 text-[0.75rem] font-semibold leading-snug text-neutral-200 transition-colors group-hover/rank:text-white sm:text-[0.8rem]",
                      styles.titleHover
                    )}
                  >
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.6rem] text-neutral-500">
                    {item.category.toUpperCase()} · {item.publishedAt}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: Vertical list */}
        <ol className="mt-5 hidden space-y-4 text-sm lg:block">
          {displayItems.map((item, index) => (
            <li key={item.id} className="flex gap-3">
              <span
                className={cn(
                  "mt-0.5 text-lg font-bold tabular-nums",
                  styles.number
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <Link
                href={`/news/${item.id}`}
                className="group/rank min-w-0 flex-1"
              >
                <p
                  className={cn(
                    "text-[0.8rem] font-semibold leading-snug text-neutral-200 transition-colors group-hover/rank:text-white",
                    styles.titleHover
                  )}
                >
                  {item.title}
                </p>
                <p className="mt-1.5 text-[0.7rem] text-neutral-500">
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
