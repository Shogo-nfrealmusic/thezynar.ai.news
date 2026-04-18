import { latestNews } from "@/lib/mockLatestNews";
import { SiteHeader } from "@/components/SiteHeader";
import {
  OverlayCard,
  ImageCard,
  TextCard,
  CategoryLabel,
  AuthorTime,
} from "@/components/ArticleCards";

export default async function TechPage() {
  const techArticles = latestNews.filter((a) => a.category === "tech");
  const fallback = latestNews.filter((a) => a.category !== "tech");
  const items = [...techArticles, ...fallback].slice(0, 8);

  const toCardProps = (a: (typeof latestNews)[number]) => ({
    href: `/article/${a.id}`,
    img: a.imageUrl,
    category: a.category,
    title: a.title,
    author: a.author,
    time: a.publishedAt,
  });

  return (
    <div className="bg-white min-h-screen">
      <SiteHeader active="Tech" />

      {/* ① ダーク特集セクション */}
      <section className="bg-[#212623] py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-center">
          {/* 左: テキスト */}
          <div className="flex flex-col gap-6">
            <h1 className="text-[80px] font-bold text-white leading-none tracking-[-2px]">
              Tech
            </h1>
            <p className="text-[#6b7b6e] text-[15px] leading-[1.6] max-w-[420px]">
              The latest breakthroughs in technology — from chips and cloud to
              software and hardware shaping our digital future.
            </p>
            {items[0] && (
              <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
                <CategoryLabel label={items[0].category} light />
                <h2 className="text-xl text-white font-bold leading-[1.35] tracking-[-0.3px]">
                  {items[0].title}
                </h2>
                <AuthorTime
                  author={items[0].author}
                  time={items[0].publishedAt}
                  light
                />
              </div>
            )}
          </div>

          {/* 右: OverlayCard */}
          {items[0] && (
            <div className="h-[400px]">
              <OverlayCard {...toCardProps(items[0])} titleSize="md" />
            </div>
          )}
        </div>
      </section>

      {/* ② 4列 ImageCard グリッド */}
      <section className="py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {items.slice(1, 5).map((a) => (
              <ImageCard key={a.id} {...toCardProps(a)} />
            ))}
          </div>
        </div>
      </section>

      {/* ③ TextCard 3列 */}
      <section className="pb-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="border-t border-[#d2dcd7] pt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {items.slice(5, 8).map((a) => (
                <TextCard key={a.id} {...toCardProps(a)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
