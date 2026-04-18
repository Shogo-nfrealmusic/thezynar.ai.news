import Image from "next/image";
import { getTrendingNews } from "@/lib/mockLatestNews";
import { SiteHeader } from "@/components/SiteHeader";
import { CategoryLabel, AuthorTime } from "@/components/ArticleCards";

export default async function TrendPage() {
  const items = getTrendingNews(8);

  const ranks = ["01", "02", "03", "04", "05", "06", "07", "08"];

  return (
    <div className="bg-white min-h-screen">
      <SiteHeader active="Trend" />

      {/* ① 黄緑ヘッダー */}
      <section className="bg-[#f2f673] py-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <h1 className="text-[64px] font-bold text-[#212623] leading-none tracking-[-2px]">
            Trending
          </h1>
          <p className="text-[#6c7571] text-[15px] mt-2">
            Most read this week
          </p>
        </div>
      </section>

      {/* ② ランキングセクション */}
      <section className="py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">

          {/* Top 3 */}
          <div>
            {items.slice(0, 3).map((a, i) => (
              <div
                key={a.id}
                className="group flex gap-6 border-b border-[#d2dcd7] py-8 items-start"
              >
                <span className="text-[80px] sm:text-[120px] font-bold text-[#0a8935] leading-none w-[100px] sm:w-[160px] shrink-0">
                  {ranks[i]}
                </span>
                <div className="relative w-[240px] sm:w-[320px] h-[180px] sm:h-[220px] shrink-0 overflow-hidden">
                  <Image
                    src={a.imageUrl}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1 pt-2">
                  <CategoryLabel label={a.category} />
                  <h3 className="font-bold text-[#212623] text-[20px] sm:text-[28px] leading-[1.3] tracking-[-0.5px] group-hover:text-[#0a8935] transition-colors">
                    {a.title}
                  </h3>
                  <AuthorTime author={a.author} time={a.publishedAt} />
                </div>
              </div>
            ))}
          </div>

          {/* 4〜8位 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mt-4">
            {items.slice(3, 8).map((a, i) => (
              <div
                key={a.id}
                className="flex gap-4 border-b border-[#d2dcd7] py-5 items-start"
              >
                <span className="text-[40px] font-bold text-[#0a8935]/30 leading-none w-[60px] shrink-0">
                  {ranks[i + 3]}
                </span>
                <div className="relative w-[80px] h-[60px] shrink-0 overflow-hidden">
                  <Image
                    src={a.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CategoryLabel label={a.category} />
                  <h4 className="font-bold text-[#212623] text-[14px] leading-[1.4]">
                    {a.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
