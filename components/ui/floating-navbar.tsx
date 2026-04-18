"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/UserMenu";

export interface NavUser {
  displayName: string;
  avatarUrl?: string;
  email?: string;
}

export const FloatingNav = ({
  navItems,
  className,
  user,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  user?: NavUser | null;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* トップバーナビ */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[5000] h-[var(--header-height)] border-b border-neutral-800 bg-[#0a0a0a] transition-shadow duration-200",
          scrolled && "shadow-lg shadow-black/50",
          className
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center focus:outline-none"
            aria-label="Home"
          >
            <Image
              src="/logo.png"
              alt="thezynar.ai"
              width={240}
              height={64}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-0.5 lg:gap-1">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[0.8rem] font-semibold uppercase tracking-wide text-neutral-400 transition-colors hover:text-white lg:px-4 lg:text-sm"
              >
                {navItem.name}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserMenu
                displayName={user.displayName}
                avatarUrl={user.avatarUrl}
                email={user.email}
              />
            ) : (
              <Link
                href="/login"
                className="rounded bg-green-500 px-4 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="relative flex h-9 w-9 items-center justify-center text-neutral-300 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="メニュー"
          >
            <div className="flex h-5 w-6 flex-col items-center justify-center">
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-current transition-all duration-300",
                  mobileOpen ? "rotate-45" : "-translate-y-2"
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-current transition-all duration-300",
                  mobileOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-current transition-all duration-300",
                  mobileOpen ? "-rotate-45" : "translate-y-2"
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col md:hidden bg-[#0a0a0a] transition-transform duration-400 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Menu header */}
        <div className="flex h-[var(--header-height)] items-center justify-between border-b border-neutral-800 px-4">
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
              width={240}
              height={64}
              className="h-9 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center text-neutral-300"
            aria-label="閉じる"
            tabIndex={mobileOpen ? 0 : -1}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex flex-1 flex-col px-6 py-4">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 border-b border-neutral-800/60 py-4 text-lg font-semibold uppercase tracking-wide text-white transition-colors hover:text-green-400",
                mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              )}
              style={{ transitionDelay: mobileOpen ? `${100 + idx * 40}ms` : "0ms" }}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {navItem.icon}
              {navItem.name}
            </Link>
          ))}
        </nav>

        {/* Bottom button */}
        <div className="px-6 pb-10">
          {user ? (
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded bg-green-500 py-3.5 text-center text-base font-bold text-black"
              tabIndex={mobileOpen ? 0 : -1}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded bg-green-500 py-3.5 text-center text-base font-bold text-black"
              tabIndex={mobileOpen ? 0 : -1}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
