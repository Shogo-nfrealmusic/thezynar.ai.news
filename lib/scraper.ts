const BOT_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const MAX_BODY_CHARS = 18_000;

export interface ScrapeResult {
  body: string;
  thumbnail: string;
}

// ─── HTML helpers ────────────────────────────────────────────

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
  // Remove inline <style> blocks that may appear inside components (CSS-in-JS)
  const noStyle = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");
  return decodeBasicEntities(
    noStyle.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
}

/** テキストがCSSコードかどうか判定 */
function looksLikeCss(text: string): boolean {
  // CSS patterns: .css-xxx{, var(--, {display:, @media, etc.
  const cssIndicators = (
    text.match(
      /\{[^}]*\}|\.css-[\w]+|var\(--[\w-]+|@media\s+screen|font-size:|display:|padding:|margin:|position:|background:|border:|opacity:|z-index:|line-height:|flex-shrink:|vertical-align:/gi,
    ) || []
  ).length;
  // If more than 3 CSS patterns per 500 chars, it's CSS
  return cssIndicators > 3 && cssIndicators / (text.length / 500) > 2;
}

// ─── OG / meta image extraction (miniflux + RSSHub inspired) ─

function extractMetaImage(html: string): string {
  // og:image (highest priority)
  const ogImage =
    html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    )?.[1] ||
    html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    )?.[1];
  if (ogImage) return decodeBasicEntities(ogImage);

  // twitter:image
  const twImage =
    html.match(
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    )?.[1] ||
    html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    )?.[1];
  if (twImage) return decodeBasicEntities(twImage);

  return "";
}

// ─── Unlikely candidate removal (miniflux readability) ───────

const UNLIKELY_TAGS =
  /<(nav|footer|aside|header|form|figcaption|figure)\b[^>]*>[\s\S]*?<\/\1>/gi;

function removeUnlikelyElements(html: string): string {
  // Remove script/style/noscript/svg first (run style removal twice for nested CSS-in-JS)
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "") // second pass for nested
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    // Remove CSS class definitions that appear as text (CSS-in-JS leak)
    .replace(/\.css-[\w-]+\{[^}]*\}/g, "")
    .replace(/@media\s+screen\s*\([^)]*\)\{[^}]*\}/g, "");

  // Remove common non-content tags
  cleaned = cleaned.replace(UNLIKELY_TAGS, " ");

  // Remove divs/sections with unlikely class/id names
  // This regex matches opening tags with suspicious class/id, then tries to find the content
  cleaned = cleaned.replace(
    /<(div|section|aside|ul|ol)\b[^>]*(?:class|id)=["'][^"']*(?:sidebar|comment|footer|social|share|related|promo|widget|popup|modal|banner|ad-container|sponsor|newsletter|subscribe|signup|breadcrumb|pagination|cookie)[^"']*["'][^>]*>[\s\S]*?<\/\1>/gi,
    " ",
  );

  return cleaned;
}

// ─── Predefined rules for known sites (miniflux approach) ────

const PREDEFINED_SELECTORS: Record<string, RegExp> = {
  "techcrunch.com":
    /<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]+class="[^"]*(?:article-footer|social|related)|<footer)/i,
  "venturebeat.com":
    /<div[^>]+class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]+class="[^"]*(?:article-footer|social|related)|<footer)/i,
  "arstechnica.com":
    /<div[^>]+class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]+class="[^"]*(?:article-footer|social|related)|<footer)/i,
  "theverge.com":
    /<div[^>]+class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]+class="[^"]*(?:article-footer|social|related)|<footer|<aside)/i,
  "wired.com":
    /<div[^>]+class="[^"]*body__inner[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]+class="[^"]*(?:article-footer|social|related)|<footer)/i,
};

function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// ─── Readability-style content scoring (miniflux inspired) ───

interface ScoredBlock {
  html: string;
  text: string;
  score: number;
}

/** Score class/id names for content likelihood (miniflux readability) */
function scoreClassId(classId: string): number {
  if (!classId) return 0;
  const lower = classId.toLowerCase();
  let score = 0;

  // Positive signals
  if (/article|content|entry|post|body|text|story|prose/.test(lower))
    score += 25;
  if (/main|primary/.test(lower)) score += 15;

  // Negative signals
  if (
    /comment|sidebar|widget|footer|header|nav|menu|social|share|related|promo|ad[_-]|sponsor|newsletter|subscribe|meta|tag|breadcrumb/.test(
      lower,
    )
  )
    score -= 25;

  return score;
}

/** Calculate link density — high link density = probably navigation/ads */
function linkDensity(html: string, textLen: number): number {
  if (textLen === 0) return 1;
  const linkTexts = html.match(/<a[^>]*>([\s\S]*?)<\/a>/gi) || [];
  const linkTextLen = linkTexts.reduce(
    (sum, a) => sum + stripTagsToText(a).length,
    0,
  );
  return linkTextLen / textLen;
}

function extractWithReadability(html: string): string {
  const cleaned = removeUnlikelyElements(html);

  // Find major content containers
  const containerRe =
    /<(article|div|section|main)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  const blocks: ScoredBlock[] = [];
  let m: RegExpExecArray | null;

  while ((m = containerRe.exec(cleaned)) !== null) {
    const attrs = m[2];
    const inner = m[3];
    const text = stripTagsToText(inner);

    // Skip tiny blocks or CSS-heavy blocks
    if (text.length < 100) continue;
    if (looksLikeCss(text)) continue;

    let score = 0;

    // Tag type bonus (miniflux)
    if (m[1].toLowerCase() === "article") score += 15;
    if (m[1].toLowerCase() === "main") score += 10;

    // Class/id scoring
    const classMatch = attrs.match(/class="([^"]*)"/i)?.[1] || "";
    const idMatch = attrs.match(/id="([^"]*)"/i)?.[1] || "";
    score += scoreClassId(classMatch);
    score += scoreClassId(idMatch);

    // Text length bonus (longer = more likely content)
    score += Math.min(Math.floor(text.length / 100), 30);

    // Comma count bonus (prose has commas)
    const commas = (text.match(/,/g) || []).length;
    score += Math.min(commas, 10);

    // Paragraph count bonus
    const pCount = (inner.match(/<p[\s>]/gi) || []).length;
    score += Math.min(pCount * 3, 15);

    // Link density penalty
    const ld = linkDensity(inner, text.length);
    if (ld > 0.5) score -= 30;
    else if (ld > 0.3) score -= 15;

    blocks.push({ html: inner, text, score });
  }

  if (blocks.length === 0) return "";

  // Pick the highest scoring block
  blocks.sort((a, b) => b.score - a.score);
  return blocks[0].html;
}

// ─── Paragraph extraction ────────────────────────────────────

function extractParagraphsFromContainer(containerHtml: string): string {
  const paras: string[] = [];
  const blockRe =
    /<p[^>]*>([\s\S]*?)<\/p>|<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi;
  let m: RegExpExecArray | null;

  while ((m = blockRe.exec(containerHtml)) !== null) {
    const raw = m[1] ?? m[2];
    if (!raw) continue;
    const text = stripTagsToText(raw);
    const minLen = m[2] ? 8 : 25;
    const maxLen = m[2] ? 220 : 20_000;
    if (text.length >= minLen && text.length <= maxLen && !looksLikeCss(text))
      paras.push(text);
  }

  return paras.join("\n\n");
}

/** <p> だけだと取りこぼすサイト向け: ブロック境界でテキスト化 */
function fallbackBlockText(html: string): string {
  const cleaned = removeUnlikelyElements(html);
  const withBreaks = cleaned
    .replace(/<\/(p|div|section|blockquote|li|h[1-6])[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");

  const plain = stripTagsToText(withBreaks);
  const lines = plain
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 20 && !looksLikeCss(l));
  return lines.join("\n\n");
}

function extractParagraphs(html: string, url: string): string {
  const domain = getDomainFromUrl(url);

  // Strategy 1: Predefined site-specific selector (miniflux approach)
  if (domain && PREDEFINED_SELECTORS[domain]) {
    const siteMatch = html.match(PREDEFINED_SELECTORS[domain]);
    if (siteMatch?.[1]) {
      const result = extractParagraphsFromContainer(siteMatch[1]);
      if (result.length > 300) return result.substring(0, MAX_BODY_CHARS);
    }
  }

  // Strategy 2: <article> tag (most semantic)
  const articleMatch = html.match(
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  )?.[1];
  if (articleMatch) {
    const result = extractParagraphsFromContainer(articleMatch);
    if (result.length > 300) return result.substring(0, MAX_BODY_CHARS);
  }

  // Strategy 3: Readability-style scoring (miniflux inspired)
  const readabilityHtml = extractWithReadability(html);
  if (readabilityHtml) {
    const result = extractParagraphsFromContainer(readabilityHtml);
    if (result.length > 300) return result.substring(0, MAX_BODY_CHARS);
  }

  // Strategy 4: <main> tag
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (mainMatch) {
    const result = extractParagraphsFromContainer(mainMatch);
    if (result.length > 300) return result.substring(0, MAX_BODY_CHARS);
  }

  // Strategy 5: Fallback — block text from entire body
  const fb = fallbackBlockText(html);
  return fb.substring(0, MAX_BODY_CHARS);
}

// ─── Lazy-load image fix (RSSHub approach) ───────────────────

function fixLazyImages(html: string): string {
  // Replace img tags that have data-src/data-original but no proper src
  return html.replace(/<img\b([^>]*)>/gi, (full, attrs: string) => {
    // Already has a real src (not a placeholder)
    const existingSrc = attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1] || "";
    if (existingSrc && !/placeholder|data:image|spacer|1x1/.test(existingSrc)) {
      return full;
    }

    // Try data-src, data-original, data-lazy-src
    const lazySrc =
      attrs.match(
        /data-(?:src|original|lazy-src|hi-res-src)=["']([^"']+)["']/i,
      )?.[1] || "";
    if (lazySrc) {
      if (existingSrc) {
        return full.replace(/\bsrc=["'][^"']*["']/, `src="${lazySrc}"`);
      }
      return `<img src="${lazySrc}" ${attrs}>`;
    }

    // Fallback: scan all data-* attributes for image URLs (RSSHub technique)
    const dataAttrs = attrs.matchAll(/data-[\w-]+=["']([^"']+)["']/gi);
    for (const dm of dataAttrs) {
      const val = dm[1].trim();
      if (/\.(jpg|jpeg|png|webp|gif|avif)(\?|$)/i.test(val)) {
        if (existingSrc) {
          return full.replace(/\bsrc=["'][^"']*["']/, `src="${val}"`);
        }
        return `<img src="${val}" ${attrs}>`;
      }
    }

    return full;
  });
}

// ─── Public API ──────────────────────────────────────────────

export async function scrapeArticle(url: string): Promise<ScrapeResult> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(18_000),
      headers: {
        "User-Agent": BOT_UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) return { body: "", thumbnail: "" };
    const rawHtml = await res.text();

    // Fix lazy-loaded images before extraction
    const html = fixLazyImages(rawHtml);

    const thumbnail = extractMetaImage(html);
    const body = extractParagraphs(html, url);

    return { body, thumbnail };
  } catch {
    return { body: "", thumbnail: "" };
  }
}

/** 並列数を制限しながら複数URLをスクレイピング */
export async function scrapeAll(
  urls: string[],
  concurrency = 8,
): Promise<ScrapeResult[]> {
  const results: ScrapeResult[] = new Array(urls.length).fill({
    body: "",
    thumbnail: "",
  });
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
