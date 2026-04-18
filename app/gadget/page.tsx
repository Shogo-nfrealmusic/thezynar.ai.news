import { latestNews } from "@/lib/mockLatestNews";
import { SiteHeader } from "@/components/SiteHeader";
import { OverlayCard, TextCard } from "@/components/ArticleCards";

export default async function GadgetPage() {
  const items = latestNews.slice(0, 8);

  return (
    <div className="bg-white min-h-screen font-[Inter,sans-serif]">
      <SiteHeader active="Gadget" />

      {/* ① ダークヘッダーバー */}
      <div className="bg-[#212623] py-8 text-center">
        <h1 className="text-white text-[64px] sm:text-[96px] font-bold leading-none tracking-[-2px]">
          Gadget
        </h1>
      </div>

      {/* ② メインモザイクグリッド */}
      <section className="bg-white py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 左大 */}
            <div className="col-span-2 lg:col-span-1 h-[400px] lg:h-[600px]">
              <OverlayCard
                href={`/news/${items[0].id}`}
                img={items[0].imageUrl}
                category={items[0].category}
                title={items[0].title}
                author={items[0].author}
                time={items[0].publishedAt}
                titleSize="lg"
              />
            </div>

            {/* 右2×2 */}
            <div
              className="col-span-2 lg:col-span-2 grid grid-rows-2 gap-4"
              style={{ height: "600px" }}
            >
              <div className="grid grid-cols-2 gap-4">
                <OverlayCard
                  href={`/news/${items[1].id}`}
                  img={items[1].imageUrl}
                  category={items[1].category}
                  title={items[1].title}
                  author={items[1].author}
                  time={items[1].publishedAt}
                  titleSize="sm"
                />
                <OverlayCard
                  href={`/news/${items[2].id}`}
                  img={items[2].imageUrl}
                  category={items[2].category}
                  title={items[2].title}
                  author={items[2].author}
                  time={items[2].publishedAt}
                  titleSize="sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <OverlayCard
                  href={`/news/${items[3].id}`}
                  img={items[3].imageUrl}
                  category={items[3].category}
                  title={items[3].title}
                  author={items[3].author}
                  time={items[3].publishedAt}
                  titleSize="sm"
                />
                <OverlayCard
                  href={`/news/${items[4].id}`}
                  img={items[4].imageUrl}
                  category={items[4].category}
                  title={items[4].title}
                  author={items[4].author}
                  time={items[4].publishedAt}
                  titleSize="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ③ ボーダー区切り */}
      <div className="border-t border-[#d2dcd7]" />

      {/* ④ 3列 TextCard グリッド */}
      <section className="bg-white py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {items.slice(5, 8).map((article) => (
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
