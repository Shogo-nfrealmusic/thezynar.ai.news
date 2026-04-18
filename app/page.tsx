"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Image assets ────────────────────────────────────────────────
const IMG_CURSOR_CEO    = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80";
const IMG_OPENAI_LOGO   = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80";
const IMG_GETTY_ALTMAN  = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80";
const IMG_ALTMAN_WORLD  = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80";
const IMG_OPENAI_PHONE  = "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1200&q=80";
const IMG_CURSOR_CEO2   = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80";
const IMG_STARTUP_GETTY = "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80";
const IMG_SUPREME_COURT = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80";
const IMG_WINDOWS_GLITCH= "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80";
const IMG_SEQUOIA       = "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80";
const IMG_DARIO         = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=80";
const IMG_STRICTLYVC    = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80";
const IMG_VERCEL        = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80";
const IMG_JENSEN        = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80";
const IMG_VENTURE_SMALL = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80";
const IMG_PILLAR        = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80";
const IMG_UBER          = "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=400&q=80";
const IMG_DOUG_FIELD    = "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80";

const NAV_ITEMS = [
  { label: "Latest",  href: "/latest" },
  { label: "AI",      href: "/ai" },
  { label: "Tech",    href: "/tech" },
  { label: "Gadget",  href: "/gadget" },
  { label: "Trend",   href: "/trend" },
  { label: "News",    href: "/news" },
];

// ── Shared primitives ──────────────────────────────────────────

function CategoryLabel({ label, light = false, yellow = false }: { label: string; light?: boolean; yellow?: boolean }) {
  return (
    <div className={`border-t pt-[5px] ${light ? "border-white/20" : yellow ? "border-[rgba(84,90,87,0.4)]" : "border-[#d2dcd7]"}`}>
      <span className={`text-[11px] font-normal tracking-[0.5px] uppercase leading-[16.9px] ${light ? "text-white" : yellow ? "text-[#212623]" : "text-[#0a8935]"}`}>
        {label}
      </span>
    </div>
  );
}

function AuthorTime({ author, time, light = false, yellow = false }: { author: string; time: string; light?: boolean; yellow?: boolean }) {
  const cls = light ? "text-[#b5c0bc]" : yellow ? "text-[#212623]" : "text-[#6c7571]";
  return (
    <div className="flex flex-wrap gap-x-1">
      <span className={`text-[13px] leading-[22px] ${cls}`}>{author}</span>
      <span className={`text-[13px] leading-[22px] ${cls}`}>{time}</span>
    </div>
  );
}

// Full-bleed image card with gradient overlay (dark)
function OverlayCard({ img, category, title, author, time, titleSize = "lg", badge = false }: {
  img: string; category: string; title: string; author: string; time: string;
  titleSize?: "sm" | "md" | "lg"; badge?: boolean;
}) {
  const titleCls =
    titleSize === "lg" ? "text-[24px] sm:text-[32px] lg:text-[44px]" :
    titleSize === "md" ? "text-[20px] sm:text-[26px] lg:text-[34px]" :
    "text-[16px] sm:text-[20px]";
  return (
    <div className="relative overflow-hidden w-full h-full min-h-[300px]">
      <Image src={img} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 gap-3">
        {badge ? (
          <div className="border-t border-white/20 pt-[5px] flex items-center gap-2">
            <div className="bg-white flex items-center justify-center shrink-0 w-5 h-5">
              <span className="text-[#0a8935] text-[9px] font-bold leading-none">✦</span>
            </div>
            <span className="text-white text-[11px] tracking-[0.5px] uppercase font-normal">{category}</span>
          </div>
        ) : (
          <CategoryLabel label={category} light />
        )}
        <h3 className={`text-white font-bold leading-[1.25] tracking-[-0.5px] ${titleCls}`}>{title}</h3>
        <AuthorTime author={author} time={time} light />
      </div>
    </div>
  );
}

// White-bg card: image on top + text below
function ImageCard({ img, category, title, author, time }: {
  img: string; category: string; title: string; author: string; time: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#d2dcd7] pb-4">
      <div className="relative overflow-hidden h-[200px] sm:h-[240px] lg:h-[280px]">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2">
        <CategoryLabel label={category} />
        <h3 className="font-bold text-[#212623] text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.3] tracking-[-0.5px]">{title}</h3>
        <div className="pt-1"><AuthorTime author={author} time={time} /></div>
      </div>
    </div>
  );
}

// Text-only small article card
function TextCard({ category, title, author, time, isPodcast = false }: {
  category: string; title: string; author: string; time: string; isPodcast?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[#d2dcd7] pb-4">
      <CategoryLabel label={category} />
      <div className="flex items-start gap-2">
        {isPodcast && (
          <div className="bg-[#0a8935] flex items-center justify-center shrink-0 mt-[2px] w-5 h-5">
            <span className="text-white text-[9px]">▶</span>
          </div>
        )}
        <h4 className="font-bold text-[#212623] text-[14px] leading-[1.45] tracking-[-0.2px]">{title}</h4>
      </div>
      <AuthorTime author={author} time={time} />
    </div>
  );
}

// Section container — consistent padding across all breakpoints
function PageSection({ children, bg = "white", className = "", id }: {
  children: React.ReactNode; bg?: string; className?: string; id?: string;
}) {
  return (
    <section id={id} style={{ backgroundColor: bg }} className={`py-8 sm:py-10 ${className}`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
        {children}
      </div>
    </section>
  );
}

// Section heading: large topic name + "See More"
function SectionHead({ label, color = "#0a8935" }: { label: string; color?: string }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 flex-wrap mb-6">
      <h2 className="font-bold text-[44px] sm:text-[56px] lg:text-[70px] leading-[1.15] tracking-[-0.5px]" style={{ color }}>
        {label}
      </h2>
      <a href="#" className="flex items-center gap-1 border border-[#0a8935] rounded-full px-4 py-3 text-[#012800] text-[13px] hover:bg-[#0a8935]/5 transition-colors shrink-0">
        See More
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </a>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function Home() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ── Announcement Banner ── */}
      {bannerOpen && (
        <div className="relative bg-[#5631ea] px-10 py-3 flex items-center justify-center">
          <p className="text-white text-center text-[12px] sm:text-[13px] font-bold tracking-[0.5px] leading-[22px]">
            The first StrictlyVC of 2026 hits SF on April 30. Tickets are going fast.{" "}
            <span className="underline cursor-pointer">Register now.</span>
          </p>
          <button
            onClick={() => setBannerOpen(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      )}

      {/* ── Header ── */}
      <header className="bg-[#212623] border-b border-[#2c312e] sticky top-0 z-50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="shrink-0 text-white font-bold text-[15px] tracking-tight">
            TechCrunch
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-3 flex-1 justify-center" aria-label="Primary navigation">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link key={label} href={href} className="text-white font-bold text-[13px] tracking-[1px] leading-[22px] hover:text-white/70 transition-colors whitespace-nowrap">
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Sign In */}
            <Link
              href="/login"
              className="hidden lg:inline-flex items-center px-4 py-1.5 rounded-full bg-[#0a8935] text-white text-[13px] font-bold tracking-[0.5px] hover:bg-[#0a8935]/90 transition-colors mr-1"
            >
              Sign In
            </Link>
            {/* Search */}
            <button className="p-2.5 text-white hover:bg-white/10 rounded-full transition-colors" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.5" />
                <path d="M11 11L14.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Mobile hamburger — only visible below lg */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
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

            {/* Desktop hamburger */}
            <button className="hidden lg:flex p-2.5 text-white hover:bg-white/10 rounded-full transition-colors" aria-label="More">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect y="2"    width="16" height="1.5" rx="0.75" fill="white" />
                <rect y="7.25" width="16" height="1.5" rx="0.75" fill="white" />
                <rect y="12.5" width="16" height="1.5" rx="0.75" fill="white" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1a1f1c] border-t border-[#2c312e] px-4 py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white font-bold text-[15px] tracking-[0.5px] leading-[44px] border-b border-white/10 hover:text-[#0a8935] transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-[#0a8935] font-bold text-[15px] tracking-[0.5px] leading-[44px] hover:text-[#0a8935]/80 transition-colors"
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ── Hero (Green) ── */}
        <section className="bg-[#0a8935] py-6 sm:py-8">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 flex flex-col gap-6 sm:gap-8">

            {/* Logo */}
            <div className="flex justify-center">
              <span className="text-[#0a8935] font-bold text-[32px] sm:text-[40px] lg:text-[53px] tracking-tight leading-none">TechCrunch</span>
            </div>

            {/*
              Mobile:  stack all 3 articles vertically
              md:      2 cols (featured left, 2 stacked right), headlines hidden
              lg:      3 cols (featured + 2 stacked + headlines)
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-4 sm:gap-6">

              {/* Col 1: Main featured */}
              <div className="h-[320px] sm:h-[400px] lg:h-[560px]">
                <OverlayCard
                  img={IMG_CURSOR_CEO} category="AI" titleSize="lg"
                  title="Sources: Cursor in talks to raise $2B+ at $50B valuation as enterprise growth surges"
                  author="Marina Temkin" time="- 10 hours ago"
                />
              </div>

              {/* Col 2: Two stacked */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="h-[240px] sm:h-[270px] lg:flex-1">
                  <OverlayCard
                    img={IMG_OPENAI_LOGO} category="AI" titleSize="sm"
                    title="Kevin Weil and Bill Peebles exit OpenAI as company continues to shed 'side quests'"
                    author="Rebecca Bellan" time="- 8 hours ago"
                  />
                </div>
                <div className="h-[240px] sm:h-[270px] lg:flex-1">
                  <OverlayCard
                    img={IMG_GETTY_ALTMAN} category="AI" titleSize="sm"
                    title="Sam Altman's project World looks to scale its human verification empire. First stop: Tinder."
                    author="Lucas Ropek" time="- 6 hours ago"
                  />
                </div>
              </div>

              {/* Col 3: Top Headlines — hidden on mobile/md */}
              <div className="hidden lg:flex flex-col gap-3 pt-1">
                <h3 className="text-white font-bold text-[16px] leading-[28px]">Top Headlines</h3>
                {[
                  "'Tokenmaxxing' is making developers less productive than they think",
                  "Gigs turns your concert history into a personal live music archive",
                  "Anthropic launches Claude Design, a new product for creating quick visuals",
                  "Zoom teams up with World to verify humans in meetings",
                  "Uber will now pick up your returns from your doorstep",
                ].map((h, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-white/10 pb-3">
                    <div className="w-2 h-2 bg-white shrink-0 mt-[5px]" />
                    <a href="#" className="text-white font-medium text-[13px] leading-[19px] tracking-[0.2px] hover:text-white/75 transition-colors">
                      {h}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Headlines on mobile/tablet (below the cards) */}
            <div className="lg:hidden">
              <h3 className="text-white font-bold text-[15px] leading-[28px] mb-3">Top Headlines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {[
                  "'Tokenmaxxing' is making developers less productive than they think",
                  "Gigs turns your concert history into a personal live music archive",
                  "Anthropic launches Claude Design, a new product for creating quick visuals",
                  "Zoom teams up with World to verify humans in meetings",
                  "Uber will now pick up your returns from your doorstep",
                ].map((h, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-white/10 py-3 pr-4">
                    <div className="w-2 h-2 bg-white shrink-0 mt-[5px]" />
                    <a href="#" className="text-white font-medium text-[13px] leading-[19px] hover:text-white/75 transition-colors">
                      {h}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AI ── */}
        <PageSection id="ai">
          <SectionHead label="AI" />
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px] sm:h-[380px] lg:h-[460px]">
                <OverlayCard img={IMG_ALTMAN_WORLD} category="AI" titleSize="md"
                  title="Sam Altman's project World looks to scale its human verification empire. First stop: Tinder."
                  author="Lucas Ropek" time="- 6 hours ago" />
              </div>
              <ImageCard img={IMG_OPENAI_PHONE} category="AI"
                title="Kevin Weil and Bill Peebles exit OpenAI as company continues to shed 'side quests'"
                author="Rebecca Bellan" time="- 8 hours ago" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextCard category="AI"
                title="Sources: Cursor in talks to raise $2B+ at $50B valuation as enterprise growth surges"
                author="Marina Temkin" time="- 10 hours ago" />
              <TextCard category="AI"
                title="'Tokenmaxxing' is making developers less productive than they think"
                author="Tim Fernholz" time="- 10 hours ago" />
              <TextCard category="Startups"
                title="Tokenmaxxing, OpenAI's shopping spree, and the AI Anxiety Gap"
                author="Anthony Ha, Theresa Loconsolo, Kirsten Korosec, Sean O'Kane"
                time="- 13 hours ago" isPodcast />
            </div>
          </div>
        </PageSection>

        <div className="border-t border-[#d2dcd7] mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-auto 2xl:max-w-[1360px]" />

        {/* ── Startups ── */}
        <PageSection id="startups">
          <SectionHead label="Startups" />
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px] sm:h-[380px] lg:h-[460px]">
                <OverlayCard img={IMG_CURSOR_CEO2} category="AI" titleSize="md"
                  title="Sources: Cursor in talks to raise $2B+ at $50B valuation as enterprise growth surges"
                  author="Marina Temkin" time="- 10 hours ago" />
              </div>
              <ImageCard img={IMG_STARTUP_GETTY} category="Startups"
                title="Tokenmaxxing, OpenAI's shopping spree, and the AI Anxiety Gap"
                author="Anthony Ha, Theresa Loconsolo, Kirsten Korosec, Sean O'Kane"
                time="- 13 hours ago" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextCard category="Apps"
                title="SaySo is a new short-form video app that aims to restore users' trust in news"
                author="Lauren Forristal" time="- 16 hours ago" />
              <TextCard category="Startups"
                title="Loop raises $95M to build supply chain AI that predicts disruptions"
                author="Sean O'Kane" time="- 16 hours ago" />
              <TextCard category="Startups"
                title="Are we tokenmaxxing our way to nowhere?"
                author="Theresa Loconsolo" time="- 16 hours ago" isPodcast />
            </div>
          </div>
        </PageSection>

        <div className="border-t border-[#d2dcd7] mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-auto 2xl:max-w-[1360px]" />

        {/* ── Security ── */}
        <PageSection id="security">
          <SectionHead label="Security" />
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px] sm:h-[380px] lg:h-[460px]">
                <OverlayCard img={IMG_SUPREME_COURT} category="In Brief" titleSize="md" badge
                  title="Man who hacked US Supreme Court filing system sentenced to probation"
                  author="Lorenzo Franceschi-Bicchierai" time="- 9 hours ago" />
              </div>
              <ImageCard img={IMG_WINDOWS_GLITCH} category="Security"
                title="Hackers are abusing unpatched Windows security flaws to hack into organizations"
                author="Lorenzo Franceschi-Bicchierai" time="- 11 hours ago" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextCard category="Security"
                title="With US spy laws set to expire, lawmakers are split over protecting Americans from warrantless surveillance"
                author="Zack Whittaker" time="- 15 hours ago" />
              <TextCard category="Security"
                title="Bluesky confirms DDoS attack is cause of continued app outages"
                author="Sarah Perez" time="- 15 hours ago" />
              <TextCard category="In Brief"
                title="European police email 75,000 people asking them to stop DDoS attacks"
                author="Lorenzo Franceschi-Bicchierai" time="- 1 day ago" isPodcast />
            </div>
          </div>
        </PageSection>

        {/* ── Venture (Yellow) ── */}
        <section id="venture" className="bg-[#f2f673] py-8 sm:py-10">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 flex flex-col gap-6">
            {/* Heading */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <h2 className="font-bold text-[44px] sm:text-[56px] lg:text-[70px] leading-[1.15] tracking-[-0.5px] text-[#5631ea]">Venture</h2>
              <a href="#" className="flex items-center gap-1 border border-[#0a8935] rounded-full px-4 py-3 text-[#012800] text-[13px] hover:bg-[#0a8935]/10 transition-colors shrink-0">
                See More
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Featured left */}
              <div className="flex flex-col gap-3 border-b border-[#b3b85b] pb-5">
                <div className="relative overflow-hidden h-[240px] sm:h-[300px] lg:h-[360px]">
                  <Image src={IMG_SEQUOIA} alt="" fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="border-t border-[rgba(84,90,87,0.4)] pt-[5px]">
                    <span className="text-[11px] text-[#212623] tracking-[0.5px] uppercase font-normal">In Brief</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-[#050505] flex items-center justify-center shrink-0 mt-[2px] w-5 h-5">
                      <span className="text-white text-[9px] leading-none">✦</span>
                    </div>
                    <h3 className="font-bold text-[#212623] text-[20px] sm:text-[24px] lg:text-[30px] leading-[1.3] tracking-[-0.5px]">
                      New leaders, new fund: Sequoia has raised $7B to expand its AI bets
                    </h3>
                  </div>
                  <div className="pt-1"><AuthorTime author="Connie Loizos" time="- 1 day ago" yellow /></div>
                </div>
              </div>

              {/* Small article list — 2 cols on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {[
                  { img: IMG_VENTURE_SMALL, cat: "In Brief",    title: "Upscale AI in talks to raise at $2B valuation, says report",                         author: "Dominic-Madori Davis", time: "- 1 day ago"  },
                  { img: IMG_PILLAR,        cat: "Venture",     title: "Financial risk management platform Pillar raises $20M seed round",                   author: "Dominic-Madori Davis", time: "- 4 days ago" },
                  { img: IMG_DARIO,         cat: "In Brief",    title: "Anthropic shrugs off VC funding offers valuing it at $800B+, for now",               author: "Julie Bort",           time: "- 3 days ago" },
                  { img: IMG_STRICTLYVC,    cat: "StrictlyVC",  title: "In just a couple weeks, StrictlyVC SF brings leaders from TDK…",                    author: "TechCrunch Events",    time: "- 4 days ago" },
                  { img: IMG_VERCEL,        cat: "Startups",    title: "Vercel CEO Guillermo Rauch signals IPO readiness as AI agents drive growth",         author: "Marina Temkin",        time: "- 5 days ago" },
                  { img: IMG_JENSEN,        cat: "Venture",     title: "Nvidia-backed SiFive hits $3.65B valuation for open AI chips",                       author: "Julie Bort",           time: "- Apr 11"     },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-[#b3b85b] py-3 sm:px-2">
                    <div className="relative shrink-0 overflow-hidden w-[72px] h-[72px] sm:w-[80px] sm:h-[80px]">
                      <Image src={item.img} alt="" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="border-t border-[rgba(84,90,87,0.4)] pt-[4px]">
                        <span className="text-[10px] text-[#212623] tracking-[0.5px] uppercase font-normal block leading-[14px]">{item.cat}</span>
                      </div>
                      <a href="#" className="font-bold text-[#212623] text-[12px] sm:text-[13px] leading-[1.4] tracking-[-0.2px] hover:text-[#5631ea] transition-colors">
                        {item.title}
                      </a>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[#212623] text-[11px] leading-[20px]">{item.author}</span>
                        <span className="text-[#212623] text-[11px] leading-[20px]">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-[#d2dcd7] mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-auto 2xl:max-w-[1360px]" />

        {/* ── Transportation ── */}
        <PageSection id="transportation">
          <SectionHead label="Transportation" />
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px] sm:h-[380px] lg:h-[460px]">
                <OverlayCard img={IMG_UBER} category="Transportation" titleSize="md"
                  title="Uber will now pick up your returns from your doorstep"
                  author="Kirsten Korosec" time="- 14 hours ago" />
              </div>
              <ImageCard img={IMG_DOUG_FIELD} category="Transportation"
                title="Ford EV and tech chief leaving automaker"
                author="Kirsten Korosec" time="- 2 days ago" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextCard category="Transportation"
                title="Monarch Tractor's collapse ends with an acquisition by Caterpillar"
                author="Sean O'Kane" time="- 2 days ago" />
              <TextCard category="In Brief"
                title="This Khosla-backed autonomous pod startup just raised $170M — now it's aiming for more"
                author="Kirsten Korosec" time="- 2 days ago" isPodcast />
              <TextCard category="Transportation"
                title="Chipmakers AMD, Arm, and Qualcomm are all investing in this buzzy self-driving tech startup"
                author="Kirsten Korosec" time="- 3 days ago" />
            </div>
          </div>
        </PageSection>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#212623] py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-between">

            {/* Logo + social */}
            <div className="flex flex-col gap-6 shrink-0">
              <a href="#" className="text-white font-bold text-[28px] sm:text-[32px] tracking-tight leading-none">
                TechCrunch
              </a>
              <div className="flex items-center gap-0.5 flex-wrap">
                {["X", "Li", "FB", "IG", "YT", "TT", "RS", "Ma"].map((label, i) => (
                  <a key={i} href="#" className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white text-[11px] font-bold w-9 h-9 flex items-center justify-center">
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="flex flex-wrap gap-8 sm:gap-12">
              <div className="flex flex-col gap-3">
                {["TechCrunch", "Staff", "Contact Us", "Advertise", "Crunchboard Jobs", "Site Map"].map((item) => (
                  <a key={item} href="#" className="text-white text-[13px] sm:text-[14px] tracking-[1px] leading-[22px] hover:text-white/70 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {["Terms of Service", "Privacy Policy", "RSS Terms of Use"].map((item) => (
                  <a key={item} href="#" className="text-white text-[13px] sm:text-[14px] tracking-[1px] leading-[22px] hover:text-white/70 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                {["OpenAI", "Iran", "Gas Prices", "Tesla", "Apple", "Tech Layoffs", "ChatGPT"].map((item) => (
                  <a key={item} href="#" className="text-white text-[12px] tracking-[1px] leading-[18px] hover:text-white/70 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-white text-[12px] leading-[18px]">© 2026 TechCrunch Media LLC.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
