"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // スクロール時にヘッダーを隠す/表示する
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // メニューが開いている時は背面スクロールを無効化
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* フローティングヘッダー */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[5000] px-4 pt-4 md:px-8 md:pt-6 transition-transform duration-300",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <header
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/95 px-4 py-3 shadow-lg shadow-neutral-200/50 backdrop-blur supports-[backdrop-filter]:bg-white/90 dark:bg-neutral-900/95 dark:shadow-neutral-950/50 dark:supports-[backdrop-filter]:bg-neutral-900/90 md:px-6 md:py-4",
            className
          )}
        >
          {/* Logo: 左端 */}
          <Link
            href="/"
            className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
            aria-label="Home"
          >
            <Image
              src="/logo.png"
              alt="thezynar.ai"
              width={360}
              height={96}
              className="h-10 w-auto sm:h-12 invert dark:invert-0"
              priority
            />
          </Link>

          {/* Desktop: ナビアイテム中央 */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-2">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white lg:px-4"
              >
                <span>{navItem.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop: 右端ボタン */}
          <div className="hidden md:block">
            <button
              type="button"
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              Login
            </button>
          </div>

          {/* Mobile: ハンバーガーボタン（アニメーション付き） */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="relative flex h-10 w-10 items-center justify-center text-neutral-700 md:hidden dark:text-neutral-200"
            aria-expanded={mobileOpen}
            aria-label="メニュー"
          >
            <div className="flex h-5 w-6 flex-col items-center justify-center">
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
                  mobileOpen ? "rotate-45" : "-translate-y-2"
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
                  mobileOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
                  mobileOpen ? "-rotate-45" : "translate-y-2"
                )}
              />
            </div>
          </button>
        </header>
      </div>

      {/* Mobile: フルスクリーンメニュー（スライドアニメーション） */}
      <div
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col md:hidden transition-transform duration-500 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ backgroundColor: "#0a0a0a" }}
        aria-hidden={!mobileOpen}
      >
        {/* メニュー内ヘッダー */}
        <div className="flex items-center justify-between px-4 pt-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex shrink-0 items-center"
            aria-label="Home"
            tabIndex={mobileOpen ? 0 : -1}
          >
            <Image
              src="/logo.png"
              alt="thezynar.ai"
              width={360}
              height={96}
              className="h-10 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-white"
            aria-label="閉じる"
            tabIndex={mobileOpen ? 0 : -1}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* メニューアイテム */}
        <nav className="flex flex-1 flex-col justify-center px-8">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-4 border-b border-neutral-800 py-5 text-2xl font-medium text-white transition-all hover:text-neutral-400",
                mobileOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              )}
              style={{
                transitionDelay: mobileOpen ? `${150 + idx * 50}ms` : "0ms",
              }}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {navItem.icon}
              <span>{navItem.name}</span>
            </Link>
          ))}
        </nav>

        {/* 下部ボタン */}
        <div className="px-8 pb-12">
          <button
            type="button"
            className={cn(
              "w-full rounded-full bg-white py-4 text-center text-lg font-medium text-neutral-900 transition-all duration-300",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: mobileOpen ? "400ms" : "0ms" }}
            tabIndex={mobileOpen ? 0 : -1}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
