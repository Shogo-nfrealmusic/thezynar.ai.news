import Image from "next/image";
import Link from "next/link";
import { latestNews } from "@/lib/mockLatestNews";
import { SiteHeader } from "@/components/SiteHeader";
import {
  OverlayCard,
  CategoryLabel,
  AuthorTime,
} from "@/components/ArticleCards";

export default async function AiPage() {
  const aiArticles = latestNews.filter((a) => a.category === "ai");
  const combined = [...aiArticles, ...latestNews];
  const seen = new Set<number>();
  const items: typeof latestNews = [];
  for (const a of combined) {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      items.push(a);
    }
    if (items.length === 8) break;
  }

  const hero = items[0];
  const row = items.slice(1, 4);
  const grid = items.slice(4, 8);

  return (
    <div className="bg-white min-h-screen font-[Inter,sans-serif]">
      <SiteHeader active="AI" />

      {/* ① フルページ幅 OverlayCard */}
      <div className="w-full h-[460px] sm:h-[560px]">
        <OverlayCard
          href={`/news/${hero.id}`}
          img={hero.imageUrl}
          category={hero.category}
          title={hero.title}
          author={hero.author}
          time={hero.publishedAt}
          titleSize="lg"
        />
      </div>

      {/* ② 白背景セクション: 大見出し + 水平記事行 */}
      <section className="bg-white py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <h2 className="text-[80px] font-bold text-[#0a8935] leading-none mb-8 tracking-[-2px]">
            AI
          </h2>

          <div className="flex flex-col">
            {row.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="flex items-start gap-6 border-b border-[#d2dcd7] py-6 group"
              >
                <div className="relative w-[200px] h-[150px] shrink-0 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <CategoryLabel label={article.category} />
                  <h3 className="font-bold text-[#212623] text-[18px] sm:text-[22px] leading-[1.3] tracking-[-0.4px] group-hover:text-[#0a8935] transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <AuthorTime author={article.author} time={article.publishedAt} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ③ 4列グリッドの ImageCard */}
      <section className="bg-white py-10 border-t border-[#d2dcd7]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {grid.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group flex flex-col gap-3 border-b border-[#d2dcd7] pb-4"
              >
                <div className="relative overflow-hidden h-[160px]">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <CategoryLabel label={article.category} />
                  <h3 className="font-bold text-[#212623] text-[14px] sm:text-[16px] leading-[1.35] tracking-[-0.2px] group-hover:text-[#0a8935] transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <div className="pt-1">
                    <AuthorTime author={article.author} time={article.publishedAt} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
