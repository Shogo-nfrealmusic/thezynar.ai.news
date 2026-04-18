/**
 * 取得した本文を読みやすい段落区切りに正規化する（DB保存・表示の両方で利用可）。
 */

const SOFT_PARAGRAPH_MAX = 520;

/** CSSコードが混入した段落を検出して除去する */
function isCssParagraph(text: string): boolean {
  const indicators = (
    text.match(
      /\{[^}]*\}|\.css-[\w-]+|var\(--[\w-]+|@media\s+screen|font-size:|display:\s*(?:flex|none|block|inline)|padding(?:-\w+)?:|margin(?:-\w+)?:|position:\s*(?:absolute|relative|fixed)|background:|border(?:-\w+)?:|opacity:|z-index:|line-height:|flex-shrink:|vertical-align:|box-shadow:|transition:|outline:|white-space:|letter-spacing:|text-align:|font-weight:|border-radius:/gi,
    ) || []
  ).length;
  if (indicators === 0) return false;
  // 500文字あたり3個以上CSSパターンがあればCSS
  return indicators >= 3 && indicators / (text.length / 500) > 1.5;
}

function splitSentences(text: string): string[] {
  const result: string[] = [];
  let current = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    current += ch;
    if (!/[.!?。！？]/.test(ch)) continue;
    // 小数 "3.14" などは文区切りにしない
    if (ch === "." && /\d$/.test(text.slice(Math.max(0, i - 1), i))) continue;
    const t = current.trim();
    if (t) result.push(t);
    current = "";
    while (i + 1 < text.length && /\s/.test(text[i + 1])) i++;
  }
  const rest = current.trim();
  if (rest) result.push(rest);
  return result.length ? result : [text.trim()].filter(Boolean);
}

function packSentencesIntoParagraphs(
  sentences: string[],
  softMax: number
): string[] {
  const out: string[] = [];
  let buf = "";
  for (const s of sentences) {
    const next = buf ? `${buf} ${s}` : s;
    if (next.length > softMax && buf) {
      out.push(buf.trim());
      buf = s;
    } else {
      buf = next;
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

function findBreakIndex(chunk: string): number {
  let best = -1;
  const mark = (idx: number, len: number) => {
    if (idx >= 0 && idx + len > best) best = idx + len;
  };
  mark(chunk.lastIndexOf(". "), 2);
  mark(chunk.lastIndexOf("? "), 2);
  mark(chunk.lastIndexOf("! "), 2);
  mark(chunk.lastIndexOf("。"), 1);
  mark(chunk.lastIndexOf("！"), 1);
  mark(chunk.lastIndexOf("？"), 1);
  mark(chunk.lastIndexOf("、"), 1);
  mark(chunk.lastIndexOf(" "), 1);
  return best > 0 ? best : Math.min(chunk.length, SOFT_PARAGRAPH_MAX);
}

/** スペースのない長文（日本語など）を適度な長さで折る */
function hardWrapParagraph(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const out: string[] = [];
  let remaining = text.trim();
  while (remaining.length > maxLen) {
    const chunk = remaining.slice(0, maxLen);
    const br = findBreakIndex(chunk);
    const take = br > 0 ? br : maxLen;
    out.push(remaining.slice(0, take).trim());
    remaining = remaining.slice(take).trim();
  }
  if (remaining) out.push(remaining);
  return out;
}

function splitLongParagraph(block: string): string[] {
  const t = block.trim();
  if (t.length <= SOFT_PARAGRAPH_MAX) return [t];
  const sentences = splitSentences(t);
  if (sentences.length <= 1) return hardWrapParagraph(t, SOFT_PARAGRAPH_MAX);
  const packed = packSentencesIntoParagraphs(sentences, SOFT_PARAGRAPH_MAX);
  const expanded: string[] = [];
  for (const p of packed) {
    if (p.length <= SOFT_PARAGRAPH_MAX) expanded.push(p);
    else expanded.push(...hardWrapParagraph(p, SOFT_PARAGRAPH_MAX));
  }
  return expanded;
}

export function formatArticleBody(raw: string): string {
  if (!raw) return "";
  const normalized = raw
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    // Strip inline CSS blocks that leaked into text (CSS-in-JS)
    .replace(/\.css-[\w-]+\s*\{[^}]*\}/g, "")
    .replace(/@media\s+screen\s*\([^)]*\)\s*\{[^}]*\}/g, "")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paragraphs = normalized.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  for (const p of paragraphs) {
    // CSSが混入した段落を除去
    if (isCssParagraph(p)) continue;
    out.push(...splitLongParagraph(p));
  }
  return out.join("\n\n");
}
