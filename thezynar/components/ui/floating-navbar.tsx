"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[5000] flex items-center justify-between border-b border-neutral-200 bg-white/95 px-4 py-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-neutral-800 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/80",
        className
      )}
    >
      {/* Logo: 常に左端・クリックで Home */}
      <Link
        href="/"
        className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
        aria-label="Home"
      >
        <Image
          src="/logo.png"
          alt="thezynar.ai"
          width={140}
          height={36}
          className="h-8 w-auto sm:h-9 invert dark:invert-0"
          priority
        />
      </Link>

      {/* Desktop: ナビを中央〜右のライン上に */}
      <nav className="hidden md:flex flex-1 items-center justify-center">
        <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50/80 px-3 py-2.5 dark:border-neutral-700 dark:bg-neutral-900/80">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
              )}
            >
              <span className="block lg:hidden">{navItem.icon}</span>
              <span className="hidden lg:block">{navItem.name}</span>
            </Link>
          ))}
          <div className="h-5 w-px bg-neutral-300 dark:bg-neutral-600" />
          <button
            type="button"
            className="rounded-full bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Mobile: ハンバーガーボタン */}
      <div className="flex md:hidden items-center gap-2">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          aria-expanded={mobileOpen}
          aria-label="メニュー"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile: 開いたメニュー（全リンク + Login） */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[4999] bg-black/40 md:hidden"
            style={{ top: "var(--header-height)" }}
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed left-0 right-0 z-[5001] border-b border-neutral-200 bg-white py-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 md:hidden"
            style={{ top: "var(--header-height)" }}
          >
            <nav className="flex flex-col px-4">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  {navItem.icon}
                  <span>{navItem.name}</span>
                </Link>
              ))}
              <div className="my-2 border-t border-neutral-200 dark:border-neutral-800" />
              <button
                type="button"
                className="rounded-lg bg-neutral-800 px-4 py-3 text-left text-sm font-medium text-white dark:bg-neutral-200 dark:text-neutral-900"
              >
                Login
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
