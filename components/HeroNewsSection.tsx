import Link from "next/link";
import Image from "next/image";
import { latestNews } from "@/lib/mockLatestNews";

const categoryColors: Record<string, string> = {
  ai: "bg-green-500 text-black",
  tech: "bg-blue-500 text-white",
  gadget: "bg-purple-500 text-white",
  trending: "bg-yellow-400 text-black",
  trend: "bg-yellow-400 text-black",
  latest: "bg-green-500 text-black",
};

function CategoryBadge({ category }: { category: string }) {
  const cls =
    categoryColors[category.toLowerCase()] ?? "bg-neutral-600 text-white";
  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-widest ${cls}`}
    >
      {category}
    </span>
  );
}

/** Left: big feature card */
function BigFeatureCard({ item }: { item: (typeof latestNews)[0] }) {
  return (
    <Link
      href={`/news/${item.id}`}
      className="group relative flex h-[420px] w-full flex-col overflow-hidden rounded-sm bg-neutral-900 lg:h-full"
    >
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="mb-2">
          <CategoryBadge category={item.category} />
        </div>
        <h2 className="text-xl font-extrabold leading-tight text-white transition-colors group-hover:text-green-400 sm:text-2xl lg:text-[1.6rem]">
          {item.title}
        </h2>
        <div className="mt-3 flex items-center gap-2 text-[0.7rem] text-neutral-400">
          <span>{item.author}</span>
          <span className="text-neutral-600">·</span>
          <span>{item.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}

/** Middle: stacked medium card */
function MediumCard({ item }: { item: (typeof latestNews)[0] }) {
  return (
    <Link
      href={`/news/${item.id}`}
      className="group relative flex h-[200px] w-full flex-col overflow-hidden rounded-sm bg-neutral-900"
    >
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 25vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mb-1.5">
          <CategoryBadge category={item.category} />
        </div>
        <h3 className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-green-400 sm:text-base">
          {item.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-[0.65rem] text-neutral-400">
          <span>{item.author}</span>
          <span className="text-neutral-600">·</span>
          <span>{item.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}

/** Right: top headlines list */
function TopHeadlines({ items }: { items: (typeof latestNews) }) {
  return (
    <div className="flex h-full flex-col rounded-sm border border-neutral-800 bg-neutral-900/50 p-5">
      <div className="mb-4 border-b border-neutral-800 pb-3">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-green-500">
          Now Trending
        </p>
        <h3 className="mt-0.5 text-base font-extrabold tracking-tight text-white">
          Top Headlines
        </h3>
      </div>
      <ol className="flex flex-col gap-0 divide-y divide-neutral-800/60">
        {items.map((item, i) => (
          <li key={item.id} className="group py-3 first:pt-0">
            <Link href={`/news/${item.id}`} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 shrink-0 text-sm font-black tabular-nums text-green-500/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-[0.8rem] font-semibold leading-snug text-neutral-200 transition-colors group-hover:text-green-400">
                  {item.title}
                </p>
                <p className="mt-1 text-[0.65rem] text-neutral-500">
                  {item.category.toUpperCase()} · {item.publishedAt}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HeroNewsSection() {
  const bigFeature = latestNews[0];
  const stackedCards = latestNews.slice(1, 3);
  const headlines = latestNews.slice(3, 8);

  return (
    <section className="border-b border-neutral-800 bg-[#0a0a0a] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:grid-rows-1">
          {/* Big feature — 2 cols, full height */}
          <div className="lg:col-span-2 lg:row-span-1">
            <BigFeatureCard item={bigFeature} />
          </div>

          {/* Stacked medium cards — 1 col */}
          <div className="flex flex-col gap-3">
            {stackedCards.map((item) => (
              <MediumCard key={item.id} item={item} />
            ))}
          </div>

          {/* Top headlines — 1 col */}
          <div>
            <TopHeadlines items={headlines} />
          </div>
        </div>
      </div>
    </section>
  );
}
