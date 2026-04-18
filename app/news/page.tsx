import Image from "next/image";
import Link from "next/link";
import { latestNews } from "@/lib/mockLatestNews";
import { SiteHeader } from "@/components/SiteHeader";
import { CategoryLabel, AuthorTime, TextCard } from "@/components/ArticleCards";

export default async function NewsPage() {
  const items = latestNews.slice(0, 12);

  const feature = items[0];
  const stack = items.slice(1, 5);
  const bottom = items.slice(5, 11);

  return (
    <div className="bg-white min-h-screen font-[Inter,sans-serif]">
      <SiteHeader active="News" />

      {/* ① Breaking News バナー */}
      <div className="bg-[#212623] border-b-4 border-[#0a8935]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 py-3 flex items-center gap-4">
          <span className="bg-[#0a8935] text-white text-[11px] font-bold px-3 py-1 tracking-widest shrink-0">
            BREAKING
          </span>
          <p className="text-white text-[13px] sm:text-[14px] truncate">
            {feature.title}
          </p>
        </div>
      </div>

      {/* ② フィーチャー: 左大 + 右スタック */}
      <section className="py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">

            {/* 左: 大フィーチャー記事 */}
            <Link href={`/news/${feature.id}`} className="group flex flex-col gap-4">
              <div className="relative w-full h-[320px] sm:h-[440px] overflow-hidden">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2">
                <CategoryLabel label={feature.category} />
                <h2 className="text-[26px] sm:text-[36px] font-bold text-[#212623] leading-[1.2] tracking-[-0.8px] group-hover:text-[#0a8935] transition-colors">
                  {feature.title}
                </h2>
                <p className="text-[#6c7571] text-[15px] leading-[1.6] line-clamp-3">
                  {feature.summary}
                </p>
                <AuthorTime author={feature.author} time={feature.publishedAt} />
              </div>
            </Link>

            {/* 右: スタック記事 × 4 */}
            <div className="flex flex-col divide-y divide-[#d2dcd7]">
              {stack.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group flex gap-4 py-4 items-start"
                >
                  <div className="relative w-[100px] sm:w-[120px] h-[75px] sm:h-[90px] shrink-0 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <CategoryLabel label={article.category} />
                    <h3 className="font-bold text-[#212623] text-[14px] sm:text-[15px] leading-[1.4] group-hover:text-[#0a8935] transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                    <AuthorTime author={article.author} time={article.publishedAt} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ③ ボーダー + "More News" 見出し */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
        <div className="border-t-2 border-[#212623] pt-8 pb-2 flex items-center justify-between">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#212623] tracking-[-0.8px]">
            More News
          </h2>
          <span className="text-[#0a8935] text-[13px] font-semibold tracking-wide">
            All stories
          </span>
        </div>
      </div>

      {/* ④ 3列 TextCard グリッド */}
      <section className="pb-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {bottom.map((article) => (
              <TextCard
                key={article.id}
                href={`/news/${article.id}`}
                category={article.category}
                title={article.title}
                author={article.author}
                time={article.publishedAt}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
