import Link from "next/link";
import Image from "next/image";
import { latestNews, type LatestNewsItem } from "@/lib/mockLatestNews";
import { MostPopularSidebar } from "@/components/MostPopularSidebar";

function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.05),transparent_60%)]" />
    </div>
  );
}

function HardwareNode({ article, featured = false }: { article: LatestNewsItem; featured?: boolean }) {
  return (
    <article className={`group relative overflow-hidden rounded-xl border border-white/5 bg-neutral-900/60 backdrop-blur-md transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 ${featured ? "md:col-span-2 md:row-span-2" : ""}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <Link href={`/news/${article.id}`} className="relative block h-full">
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
            className="object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
          
          {/* Neon border effect on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-t-xl border border-transparent transition-all group-hover:border-orange-500/20 group-hover:shadow-[inset_0_0_20px_rgba(251,146,60,0.1)]" />
        </div>

        <div className={`relative p-4 ${featured ? "sm:p-6" : ""}`}>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded border border-orange-500/30 bg-orange-500/10 px-1.5 py-0.5 text-[0.55rem] font-mono uppercase tracking-wider text-orange-400">
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              Hardware
            </span>
            {featured && (
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[0.55rem] font-mono uppercase text-neutral-500">
                Featured
              </span>
            )}
          </div>

          <h3 className={`mt-3 font-semibold leading-snug text-neutral-200 transition-colors group-hover:text-orange-300 ${featured ? "text-lg sm:text-xl" : "line-clamp-2 text-sm"}`}>
            {article.title}
          </h3>

          {featured && (
            <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
              {article.summary}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[0.6rem] font-mono text-neutral-600">
              {article.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1 text-[0.65rem] font-mono text-orange-500/70 transition-colors group-hover:text-orange-400">
              View
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function CompactNewsItem({ article }: { article: LatestNewsItem }) {
  return (
    <article className="group border-b border-white/5 last:border-0">
      <Link href={`/news/${article.id}`} className="flex items-center gap-4 py-3 transition-all hover:bg-orange-500/5">
        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded border border-white/10 bg-neutral-800">
          <Image
            src={article.imageUrl}
            alt=""
            fill
            sizes="64px"
            className="object-cover opacity-60 transition-opacity group-hover:opacity-100"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-1 text-sm font-medium text-neutral-300 transition-colors group-hover:text-orange-300">
            {article.title}
          </h4>
          <p className="mt-0.5 text-[0.6rem] font-mono text-neutral-600">
            {article.publishedAt}
          </p>
        </div>

        <svg className="h-4 w-4 flex-shrink-0 text-neutral-700 transition-all group-hover:translate-x-1 group-hover:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}

export default async function GadgetPage() {
  const gadgetNews = latestNews.filter((item) => item.category === "gadget");
  const allNews = latestNews.slice(0, 8);
  const featuredNode = gadgetNews[0] || allNews[0];
  const hardwareNodes = gadgetNews.length > 1 ? gadgetNews.slice(1, 7) : allNews.slice(1, 7);
  const latestHardware = allNews.slice(0, 5);

  return (
    <main className="relative min-h-screen bg-neutral-950 pb-16 pt-[calc(var(--header-height)+0.5rem)]">
      <GridBackground />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <header className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-400">
              Network Explorer
            </p>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Hardware & Devices
          </h1>
          <p className="mt-2 font-mono text-xs text-neutral-500">
            Exploring the hardware ecosystem — devices, chips, and the technology powering tomorrow.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 lg:w-8/12">
            {/* Section 1: Hardware Nodes Grid */}
            <section>
              <div className="mb-5 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
                <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-orange-400">
                  Hardware Nodes
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-orange-500/50 to-transparent" />
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {featuredNode && (
                  <HardwareNode article={featuredNode} featured />
                )}
                {hardwareNodes.map((article) => (
                  <HardwareNode key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Section 2: Latest Hardware News */}
            <section className="mt-10">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/10" />
                <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
                  Latest Hardware News
                </h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <div className="rounded-xl border border-white/5 bg-neutral-900/40 px-4 backdrop-blur-sm">
                {latestHardware.map((article) => (
                  <CompactNewsItem key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Network Status Footer */}
            <div className="mt-10 flex items-center justify-center gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="font-mono text-[0.6rem] text-neutral-600">Network Online</span>
              </div>
              <span className="text-neutral-800">|</span>
              <span className="font-mono text-[0.6rem] text-neutral-600">
                {gadgetNews.length + allNews.length} Nodes Active
              </span>
            </div>
          </div>

          {/* Sidebar */}
          <MostPopularSidebar articles={gadgetNews.length > 0 ? gadgetNews : allNews} theme="orange" className="lg:w-4/12" />
        </div>
      </div>
    </main>
  );
}
