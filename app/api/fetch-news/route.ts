import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { pickFallbackThumbnail } from "@/lib/fallback-thumbnails";
import { formatArticleBody } from "@/lib/formatArticleBody";
import { getNewsDayRangeUtc, isInNewsDayRange } from "@/lib/news-day";
import type { Category } from "@/lib/types";
import { scrapeAll } from "@/lib/scraper";

/** フィードあたりその日分だけ採用する最大件数 */
const MAX_ITEMS_PER_RSS_FEED = 6;
const MAX_HN_MATCHED = 12;
/** リンク先をスクレイピングする最大件数（本文が短い順に優先） */
const MAX_BODY_SCRAPE = 72;

// service_role key は RLS をバイパスして insert できる
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ─── RSS ──────────────────────────────────────────────────────

const RSS_FEEDS: { url: string; category: Category; source: string }[] = [
  {
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    category: "ai",
    source: "TechCrunch AI",
  },
  {
    url: "https://venturebeat.com/category/ai/feed/",
    category: "ai",
    source: "VentureBeat AI",
  },
  {
    url: "https://www.wired.com/feed/rss",
    category: "tech",
    source: "Wired",
  },
  {
    url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
    category: "tech",
    source: "Ars Technica",
  },
  {
    url: "https://www.theverge.com/rss/index.xml",
    category: "gadget",
    source: "The Verge",
  },
  {
    url: "https://feeds.feedburner.com/TechCrunch/",
    category: "trending",
    source: "TechCrunch",
  },
];

function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${tag}>`,
    "i",
  );
  return xml.match(re)?.[1]?.trim() ?? "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]+${attr}="([^"]+)"`, "i");
  const val = xml.match(re)?.[1]?.trim() ?? "";
  return unescapeHtml(val); // &amp; → & を修正
}

interface FetchedItem {
  title: string;
  link: string;
  summary: string;
  body: string;
  thumbnail: string;
  publishedAt: string;
  author: string;
  category: Category;
  source: string;
}

type RSSItem = Omit<FetchedItem, "category" | "source">;

function parseRSS(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;

  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];

    const title = unescapeHtml(extractTag(block, "title"));
    const link = unescapeHtml(
      extractTag(block, "link") ||
        block.match(/<link\s*\/?>\s*([^\s<]+)/i)?.[1]?.trim() ||
        "",
    );

    // 本文: content:encoded > dc:content > description
    const contentEncoded =
      extractTag(block, "content:encoded") || extractTag(block, "dc:content");
    const description = extractTag(block, "description");
    const fullText = stripHtml(contentEncoded || description);

    const summary = fullText.substring(0, 420);
    const body = fullText.substring(0, 16_000);

    // サムネイル: media:content → enclosure → content内のimg 順で探す
    const thumbnail =
      extractAttr(block, "media:content", "url") ||
      extractAttr(block, "enclosure", "url") ||
      (() => {
        const src =
          (contentEncoded || description).match(
            /<img[^>]+src="([^"]+)"/i,
          )?.[1] ?? "";
        return unescapeHtml(src);
      })() ||
      "";

    const pubDate =
      extractTag(block, "pubDate") || extractTag(block, "dc:date");
    const publishedAt = pubDate
      ? new Date(pubDate).toISOString()
      : new Date().toISOString();

    const author = unescapeHtml(
      extractTag(block, "dc:creator") || extractTag(block, "author") || "",
    );

    if (title && link) {
      items.push({
        title,
        link,
        summary,
        body,
        thumbnail,
        publishedAt,
        author,
      });
    }
  }

  return items;
}

async function fetchRSS(
  feed: (typeof RSS_FEEDS)[number],
  range: ReturnType<typeof getNewsDayRangeUtc>,
) {
  const res = await fetch(feed.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; thezynar-news-bot/1.0)",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`RSS fetch failed: ${feed.url} (${res.status})`);
  const xml = await res.text();
  const items = parseRSS(xml)
    .filter((item) => isInNewsDayRange(item.publishedAt, range))
    .slice(0, MAX_ITEMS_PER_RSS_FEED);
  return items.map((item) => ({
    ...item,
    category: feed.category,
    source: feed.source,
  }));
}

// ─── Hacker News ──────────────────────────────────────────────

// キーワード → カテゴリのマッピング（先に一致した方が優先）
const HN_KEYWORD_CATEGORIES: { keywords: string[]; category: Category }[] = [
  {
    keywords: [
      "ai",
      "llm",
      "gpt",
      "openai",
      "anthropic",
      "claude",
      "gemini",
      "deepmind",
      "machine learning",
      "neural",
      "diffusion",
      "transformer",
      "stable diffusion",
      "midjourney",
      "mistral",
      "groq",
      "hugging face",
    ],
    category: "ai",
  },
  {
    keywords: [
      "iphone",
      "android",
      "samsung",
      "pixel",
      "headphones",
      "earbuds",
      "smartwatch",
      "tablet",
      "macbook",
      "camera",
      "drone",
      "console",
      "playstation",
      "xbox",
      "nintendo",
    ],
    category: "gadget",
  },
  {
    keywords: [
      "startup",
      "funding",
      "ipo",
      "acquisition",
      "series a",
      "series b",
      "yc",
      "y combinator",
      "vc",
      "venture",
      "saas",
      "cloud",
      "aws",
      "kubernetes",
      "open source",
      "programming",
      "developer",
    ],
    category: "tech",
  },
];

// 認証が必要で Next.js の Image が取得できないドメイン
const BLOCKED_IMG_HOSTS = ["o.aolcdn.com", "aolcdn.com"];

function isBlockedThumbnail(url: string): boolean {
  try {
    return BLOCKED_IMG_HOSTS.some((h) => new URL(url).hostname.endsWith(h));
  } catch {
    return false;
  }
}

function detectHNCategory(title: string): Category | null {
  const lower = title.toLowerCase();
  for (const { keywords, category } of HN_KEYWORD_CATEGORIES) {
    if (keywords.some((k) => lower.includes(k))) return category;
  }
  return null;
}

async function fetchHackerNews(
  limit: number,
  range: ReturnType<typeof getNewsDayRangeUtc>,
) {
  const idsRes = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    { next: { revalidate: 0 } },
  );
  const ids: number[] = await idsRes.json();

  const stories = await Promise.all(
    ids
      .slice(0, 120)
      .map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          (r) => r.json(),
        ),
      ),
  );

  const matched: FetchedItem[] = [];
  for (const s of stories) {
    if (!s?.url || !s?.title) continue;
    const publishedAt = new Date((s.time as number) * 1000).toISOString();
    if (!isInNewsDayRange(publishedAt, range)) continue;
    const category = detectHNCategory(s.title as string);
    if (!category) continue;
    const hnSummary = `${s.score} points · ${s.descendants ?? 0} comments on Hacker News`;
    matched.push({
      title: s.title as string,
      link: s.url as string,
      summary: hnSummary,
      body: hnSummary,
      thumbnail: "",
      publishedAt,
      author: s.by as string,
      category,
      source: "Hacker News",
    });
    if (matched.length >= limit) break;
  }
  return matched;
}

// ─── Route Handler ────────────────────────────────────────────

export async function GET(request: Request) {
  // 簡易シークレット保護（省略可）
  const secret = process.env.FETCH_NEWS_SECRET;
  if (secret) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("secret") !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const dayRange = getNewsDayRangeUtc();

    // 前日以前に取り込んだ外部ソース記事を削除（手動で source 空の記事は残す）
    const { error: pruneError } = await supabaseAdmin
      .from("articles")
      .delete()
      .lt("created_at", dayRange.start.toISOString())
      .neq("source", "");
    if (pruneError) throw pruneError;

    // RSS + HN を並列取得（各ソース失敗しても他を継続）
    const hnItemsPromise: Promise<FetchedItem[]> = fetchHackerNews(
      MAX_HN_MATCHED,
      dayRange,
    ).catch(() => []);
    const rssPromises = Promise.allSettled(
      RSS_FEEDS.map((feed) => fetchRSS(feed, dayRange)),
    );
    const [hnItems, rssSettled] = await Promise.all([
      hnItemsPromise,
      rssPromises,
    ]);
    const rssItems: FetchedItem[] = rssSettled.flatMap((r) =>
      r.status === "fulfilled" ? r.value : [],
    );
    const allItems: FetchedItem[] = [...hnItems, ...rssItems];

    // RSSの失敗状況をログ
    const rssErrors = rssSettled
      .map((r, i) =>
        r.status === "rejected" ? `${RSS_FEEDS[i].source}: ${r.reason}` : null,
      )
      .filter(Boolean);

    if (allItems.length === 0) {
      return NextResponse.json({
        inserted: 0,
        message: "No items fetched",
        rss_errors: rssErrors,
      });
    }

    // リンク重複排除
    const seen = new Set<string>();
    const deduped = allItems.filter((item) => {
      if (!item.link || seen.has(item.link)) return false;
      seen.add(item.link);
      return true;
    });

    // リンクがある記事は本文が短い順にスクレイピング（長いRSS本文は上書きしない）
    const needsScrape = deduped
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => Boolean(item.link))
      .sort((a, b) => a.item.body.length - b.item.body.length)
      .slice(0, MAX_BODY_SCRAPE);
    const scraped = await scrapeAll(needsScrape.map(({ item }) => item.link));
    needsScrape.forEach(({ i }, j) => {
      if (scraped[j] && scraped[j].length > deduped[i].body.length) {
        deduped[i] = { ...deduped[i], body: scraped[j] };
      }
    });

    const rows = deduped.map((item) => {
      const body = formatArticleBody(item.body);
      const summaryFlat =
        body.split(/\n\n+/)[0]?.trim().replace(/\s+/g, " ").slice(0, 420) ??
        body.slice(0, 420);
      return {
        title: item.title,
        summary: summaryFlat,
        body,
        thumbnail:
          item.thumbnail && !isBlockedThumbnail(item.thumbnail)
            ? item.thumbnail
            : pickFallbackThumbnail(
                item.category,
                `${item.title}\n${item.link ?? ""}`,
              ),
        link: item.link || null,
        category: item.category,
        author: item.author,
        source: item.source,
        published: true,
        created_at: item.publishedAt,
      };
    });

    const { data, error } = await supabaseAdmin
      .from("articles")
      .upsert(rows, { onConflict: "link", ignoreDuplicates: false })
      .select("id");

    if (error) throw error;

    return NextResponse.json({
      inserted: data?.length ?? 0,
      total_fetched: rows.length,
      rss_errors: rssErrors,
    });
  } catch (err) {
    console.error("[fetch-news]", err);
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null
          ? JSON.stringify(err)
          : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
