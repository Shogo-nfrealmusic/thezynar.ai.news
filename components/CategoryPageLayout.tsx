import { SiteHeader } from "@/components/SiteHeader";
import { OverlayCard, ImageCard, TextCard } from "@/components/ArticleCards";

export interface ArticleItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
}

export function CategoryPageLayout({
  active,
  pageTitle,
  articles,
}: {
  active: string;
  pageTitle: string;
  articles: ArticleItem[];
}) {
  const featured   = articles[0];
  const stacked    = articles.slice(1, 3);
  const headlines  = articles.slice(3, 8).map((a) => a.title);
  const overlayArt = articles[3];
  const imageArt   = articles[4];
  const textCards  = articles.slice(5, 11);

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <SiteHeader active={active} />

      <main className="flex-1">
        {/* ── Hero (Green) ── */}
        <section className="bg-[#0a8935] py-6 sm:py-8">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 flex flex-col gap-6 sm:gap-8">

            {/* Page title */}
            <h1 className="text-white font-bold text-[40px] sm:text-[52px] lg:text-[64px] tracking-tight leading-none">
              {pageTitle}
            </h1>

            {/* 3-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-4 sm:gap-6">

              {/* Col 1: Main featured */}
              {featured && (
                <div className="h-[320px] sm:h-[400px] lg:h-[520px]">
                  <OverlayCard
                    href={`/news/${featured.id}`}
                    img={featured.imageUrl}
                    category={featured.category}
                    title={featured.title}
                    author={featured.author}
                    time={featured.publishedAt}
                    titleSize="lg"
                  />
                </div>
              )}

              {/* Col 2: Two stacked */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {stacked.map((a) => (
                  <div key={a.id} className="h-[240px] sm:h-[270px] lg:flex-1">
                    <OverlayCard
                      href={`/news/${a.id}`}
                      img={a.imageUrl}
                      category={a.category}
                      title={a.title}
                      author={a.author}
                      time={a.publishedAt}
                      titleSize="sm"
                    />
                  </div>
                ))}
              </div>

              {/* Col 3: Top Headlines (desktop only) */}
              {headlines.length > 0 && (
                <div className="hidden lg:flex flex-col gap-3 pt-1">
                  <h3 className="text-white font-bold text-[16px] leading-[28px]">Top Headlines</h3>
                  {headlines.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 border-b border-white/10 pb-3">
                      <div className="w-2 h-2 bg-white shrink-0 mt-[5px]" />
                      <span className="text-white font-medium text-[13px] leading-[19px] tracking-[0.2px]">{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Headlines on mobile/tablet */}
            {headlines.length > 0 && (
              <div className="lg:hidden">
                <h3 className="text-white font-bold text-[15px] leading-[28px] mb-3">Top Headlines</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {headlines.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 border-b border-white/10 py-3 pr-4">
                      <div className="w-2 h-2 bg-white shrink-0 mt-[5px]" />
                      <span className="text-white font-medium text-[13px] leading-[19px]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Content (White) ── */}
        <section className="bg-white py-8 sm:py-10">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0 flex flex-col gap-8 sm:gap-10">

            {/* OverlayCard + ImageCard */}
            {(overlayArt || imageArt) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {overlayArt && (
                  <div className="h-[300px] sm:h-[380px] lg:h-[460px]">
                    <OverlayCard
                      href={`/news/${overlayArt.id}`}
                      img={overlayArt.imageUrl}
                      category={overlayArt.category}
                      title={overlayArt.title}
                      author={overlayArt.author}
                      time={overlayArt.publishedAt}
                      titleSize="md"
                    />
                  </div>
                )}
                {imageArt && (
                  <ImageCard
                    href={`/news/${imageArt.id}`}
                    img={imageArt.imageUrl}
                    category={imageArt.category}
                    title={imageArt.title}
                    author={imageArt.author}
                    time={imageArt.publishedAt}
                  />
                )}
              </div>
            )}

            {/* Text cards grid */}
            {textCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {textCards.map((a) => (
                  <TextCard
                    key={a.id}
                    href={`/news/${a.id}`}
                    category={a.category}
                    title={a.title}
                    author={a.author}
                    time={a.publishedAt}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
