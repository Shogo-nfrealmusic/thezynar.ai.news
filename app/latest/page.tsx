import { getLatestArticles, timeAgo } from "@/lib/articles";
import { SiteHeader } from "@/components/SiteHeader";
import {
  OverlayCard,
  ImageCard,
  TextCard,
  AuthorTime,
} from "@/components/ArticleCards";

export const revalidate = 300;

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80";

export default async function LatestPage() {
  const { articles } = await getLatestArticles(1, 12);

  const items = articles.map((a) => ({
    id: typeof a.id === "number" ? String(a.id) : a.id,
    title: a.title,
    category: a.category ?? "news",
    summary: a.summary ?? "",
    author: a.author ?? "",
    time: timeAgo(a.created_at),
    imageUrl: a.thumbnail ?? FALLBACK_IMG,
  }));

  const hero = items[0];
  const leftCol = items.slice(3, 6);
  const rightCol = items.slice(6, 9);
  const bottomPair = items.slice(1, 3);

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white min-h-screen font-[Inter,sans-serif]">
      <SiteHeader active="Latest" />

      {/* ① 緑ヘッダーバー */}
      <div className="bg-[#0a8935] py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h1 className="text-white text-[40px] sm:text-[56px] font-bold leading-none tracking-[-1.5px]">
            Latest News
          </h1>
          <p className="text-white/80 text-[13px] sm:text-[14px] font-medium tracking-[0.5px] sm:pb-2">
            {todayLabel}
          </p>
        </div>
      </div>

      {/* ② 新聞グリッド */}
      <section className="bg-white py-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8">

            {/* 左コラム */}
            <div className="flex flex-col gap-6">
              {leftCol.map((article) => (
                <TextCard
                  key={article.id}
                  href={`/news/${article.id}`}
                  category={article.category}
                  title={article.title}
                  author={article.author}
                  time={article.time}
                />
              ))}
            </div>

            {/* 中央コラム */}
            {hero && (
              <div className="flex flex-col gap-4">
                <div className="h-[480px]">
                  <OverlayCard
                    href={`/news/${hero.id}`}
                    img={hero.imageUrl}
                    category={hero.category}
                    title={hero.title}
                    author={hero.author}
                    time={hero.time}
                    titleSize="lg"
                  />
                </div>
                {hero.summary && (
                  <p className="text-[#212623] text-[15px] leading-[1.6] border-b border-[#d2dcd7] pb-4">
                    {hero.summary}
                  </p>
                )}
                <AuthorTime author={hero.author} time={hero.time} />
              </div>
            )}

            {/* 右コラム */}
            <div className="flex flex-col gap-6">
              {rightCol.map((article) => (
                <TextCard
                  key={article.id}
                  href={`/news/${article.id}`}
                  category={article.category}
                  title={article.title}
                  author={article.author}
                  time={article.time}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ③ ボーダー */}
      <div className="border-t border-[#d2dcd7]" />

      {/* ④ 2列 ImageCard グリッド */}
      <section className="bg-white py-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bottomPair.map((article) => (
              <ImageCard
                key={article.id}
                href={`/news/${article.id}`}
                img={article.imageUrl}
                category={article.category}
                title={article.title}
                author={article.author}
                time={article.time}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
