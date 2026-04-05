const BOT_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const MAX_BODY_CHARS = 18_000;

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTagsToText(html: string): string {
  return decodeBasicEntities(
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  );
}

/** <p> だけだと取りこぼすサイト向け: article/main 内をブロック境界でテキスト化 */
function fallbackBlockText(html: string): string {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
    .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
    .replace(/<form[\s\S]*?<\/form>/gi, " ")
    .replace(/<\/(p|div|section|blockquote|li|h[1-6])[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");

  const plain = stripTagsToText(cleaned);
  const lines = plain
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 20);
  return lines.join("\n\n");
}

function extractParagraphs(html: string): string {
  // <article> > <main> > [role=article] > フォールバック全体
  const articleBlock =
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] ||
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ||
    html;

  const paras: string[] = [];
  // 段落と h2–h4 を出現順に取る（順序が崩れないように）
  const blockRe =
    /<p[^>]*>([\s\S]*?)<\/p>|<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi;
  let m: RegExpExecArray | null;

  while ((m = blockRe.exec(articleBlock)) !== null) {
    const raw = m[1] ?? m[2];
    if (!raw) continue;
    const text = stripTagsToText(raw);
    const minLen = m[2] ? 8 : 25;
    const maxLen = m[2] ? 220 : 20_000;
    if (text.length >= minLen && text.length <= maxLen) paras.push(text);
  }

  let fromP = paras.join("\n\n");

  if (fromP.length < 500) {
    const fb = fallbackBlockText(articleBlock);
    if (fb.length > fromP.length) fromP = fb;
  }

  return fromP.substring(0, MAX_BODY_CHARS);
}

export async function scrapeArticle(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(18_000),
      headers: {
        "User-Agent": BOT_UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) return "";
    const html = await res.text();
    return extractParagraphs(html);
  } catch {
    return "";
  }
}

/** 並列数を制限しながら複数URLをスクレイピング */
export async function scrapeAll(
  urls: string[],
  concurrency = 8
): Promise<string[]> {
  const results: string[] = new Array(urls.length).fill("");
  let idx = 0;

  async function worker() {
    while (idx < urls.length) {
      const i = idx++;
      results[i] = await scrapeArticle(urls[i]);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}
