/**
 * Gadget 記事の型とストア（形だけ）。
 * 後で Supabase に差し替える想定。
 */

export interface GadgetArticle {
  id: string;
  thumbnail: string;
  title: string;
  summary: string;
  body: string;
  /** アフィリエイトリンクなど */
  link: string;
  createdAt: string;
  updatedAt: string;
}

export type GadgetArticleInput = Omit<
  GadgetArticle,
  "id" | "createdAt" | "updatedAt"
>;

// --- ストア（仮実装: メモリ。Supabase 接続時に差し替え） ---

const store: GadgetArticle[] = [];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function getGadgetArticles(): Promise<GadgetArticle[]> {
  // TODO: Supabase から取得
  return [...store].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getGadgetArticleById(
  id: string
): Promise<GadgetArticle | null> {
  // TODO: Supabase から取得
  return store.find((a) => a.id === id) ?? null;
}

export async function createGadgetArticle(
  input: GadgetArticleInput
): Promise<GadgetArticle> {
  const now = new Date().toISOString();
  const article: GadgetArticle = {
    id: generateId(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  store.push(article);
  return article;
}

export async function updateGadgetArticle(
  id: string,
  input: Partial<GadgetArticleInput>
): Promise<GadgetArticle | null> {
  const index = store.findIndex((a) => a.id === id);
  if (index === -1) return null;
  const now = new Date().toISOString();
  store[index] = {
    ...store[index],
    ...input,
    updatedAt: now,
  };
  return store[index];
}

export async function deleteGadgetArticle(id: string): Promise<boolean> {
  const index = store.findIndex((a) => a.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
