"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Latest",  href: "/latest" },
  { label: "AI",      href: "/ai" },
  { label: "Tech",    href: "/tech" },
  { label: "Gadget",  href: "/gadget" },
  { label: "Trend",   href: "/trend" },
  { label: "News",    href: "/news" },
];

export function SiteHeader({ active }: { active?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#212623] border-b border-[#2c312e] sticky top-0 z-50">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0 text-white font-bold text-[15px] tracking-tight hover:text-white/80 transition-colors">
          TechCrunch
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-3 flex-1 justify-center" aria-label="Primary navigation">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`font-bold text-[13px] tracking-[1px] leading-[22px] transition-colors whitespace-nowrap ${
                active === label
                  ? "text-[#0a8935]"
                  : "text-white hover:text-white/70"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Link
            href="/login"
            className="hidden lg:inline-flex items-center px-4 py-1.5 rounded-full bg-[#0a8935] text-white text-[13px] font-bold tracking-[0.5px] hover:bg-[#0a8935]/90 transition-colors mr-1"
          >
            Sign In
          </Link>
          <button className="p-2.5 text-white hover:bg-white/10 rounded-full transition-colors" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.5" />
              <path d="M11 11L14.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect y="2"    width="16" height="1.5" rx="0.75" fill="white" />
                <rect y="7.25" width="16" height="1.5" rx="0.75" fill="white" />
                <rect y="12.5" width="16" height="1.5" rx="0.75" fill="white" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1a1f1c] border-t border-[#2c312e] px-4 py-4">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-bold text-[15px] tracking-[0.5px] leading-[44px] border-b border-white/10 transition-colors ${
                  active === label ? "text-[#0a8935]" : "text-white hover:text-[#0a8935]"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-[#0a8935] font-bold text-[15px] tracking-[0.5px] leading-[44px] hover:text-[#0a8935]/80 transition-colors"
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
