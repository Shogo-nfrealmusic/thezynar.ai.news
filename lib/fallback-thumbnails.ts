import type { Category } from "@/lib/types";

const Q = "?auto=format&fit=crop&w=800&q=60";

function u(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}${Q}`;
}

/**
 * サムネ未取得時のプール。各カテゴリで重複を減らすため多めに分けて持つ。
 * （同一プールをオフセットして回すと連続で被りにくい）
 */
/** 重複なし・プールはこれを回転させてカテゴリ別に使う（件数多め） */
const BASE_IDS: string[] = [
  "1677442136019-21780ecad995",
  "1620712943543-bcc4688e7485",
  "1655720831022-0e7e08e5e9c5",
  "1550751827-4bd374c3f58b",
  "1531746790731-6c087fecd65a",
  "1518770660439-4636190af475",
  "1461749280684-dccba630e2f6",
  "1504384308090-c894fdcc538d",
  "1558494949-ef010cbdcc31",
  "1511707171634-5f897ff02aa9",
  "1591799264318-7e6ef8ddb7ea",
  "1512499617640-c74ae3a79d37",
  "1610945265064-0e34e5519bbf",
  "1517336714731-489689fd1ca8",
  "1504711434969-e33886168f5c",
  "1526374965328-7f61d4dc18c5",
  "1519389950473-47ba0277781c",
  "1451187580459-43490279c0fa",
  "1488229297570-58520851e868",
  "1498050108023-c5249f4df085",
  "1460925895917-afdab827c52f",
  "1517694712202-14dd9538aa97",
  "1551434678-e076c223a692",
  "1522071820081-009f0129c71c",
  "1496180476214-3493d5f5c7d4",
  "1555949963-aa79dcee981c",
  "1639322537504-6427a16b0a28",
  "1618005182384-a83a8bd57fbe",
  "1516321318423-f06f85e504b3",
  "1551288049-bebda4e38f71",
  "1563986768609-322da13575f3",
  "1526336025654-49044a9388e2",
  "1518779578994-ef1329e23264",
  "1487050792450-bb090c7d0b96",
  "1555949963-ff9fe0c870eb",
  "1635070041078-e363dbe005cb",
  "1512941937669-90a1b58e7e9c",
  "1493246507139-6e7024574cda",
  // mock / 他コンポーネントで使っている既知 ID もプールに追加
  "1581090700227-1e37b190418e",
  "1534237710431-e2fc698436d0",
  "1517248135467-4c7edcad34c4",
  "1512496015851-a90fb38ba796",
  "1516570161787-2fd917215a3d",
  "1510511459019-5dda7724fd87",
  "1505751172876-fa1923c5c528",
  "1531746795393-6c2490d0edee",
  "1529107386315-e1a2ed48a620",
  "1633356122544-f134324a6cee",
  "1704964969056-0c6d7caf7af8",
];

function dedupe(ids: string[]): string[] {
  return [...new Set(ids)];
}

/** ベース配列を回転させつつ URL 化（カテゴリごとにずらして偏りを減らす） */
function poolForCategory(category: Category, extraOffset: number): string[] {
  const clean = dedupe(BASE_IDS);
  const n = clean.length;
  const catShift: Record<Category, number> = {
    ai: 0,
    tech: 5,
    gadget: 11,
    trending: 17,
    latest: 23,
  };
  const shift = (catShift[category] + extraOffset + n) % n;
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    out.push(u(clean[(shift + i) % n]));
  }
  return out;
}

const POOLS: Record<Category, string[]> = {
  ai: poolForCategory("ai", 0),
  tech: poolForCategory("tech", 0),
  gadget: poolForCategory("gadget", 0),
  trending: poolForCategory("trending", 0),
  latest: poolForCategory("latest", 0),
};

function hash32(input: string): number {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** RSS 等でサムネが無いときのフォールバック URL */
export function pickFallbackThumbnail(category: Category, seed: string): string {
  const pool = POOLS[category];
  const h = hash32(seed);
  return pool[h % pool.length];
}
