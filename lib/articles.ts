import { createClient } from "@/lib/supabase/server";
import { getNewsDayRangeUtc } from "@/lib/news-day";
import type { Category } from "@/lib/types";

export interface Article {
  id: string;
  title: string;
  summary: string;
  body: string;
  thumbnail: string;
  link: string;
  category: Category;
  author: string;
  source: string;
  created_at: string;
}

export async function getLatestArticles(page = 1, perPage = 12) {
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { start, endExclusive } = getNewsDayRangeUtc();

  const { data, count, error } = await supabase
    .from("articles")
    .select("id, title, summary, thumbnail, link, category, author, source, created_at", {
      count: "exact",
    })
    .eq("published", true)
    .not("thumbnail", "is", null)
    .neq("thumbnail", "")
    .gte("created_at", start.toISOString())
    .lt("created_at", endExclusive.toISOString())
    .order("created_at", { ascending: false })
    .range(from, to);

  return { articles: (data ?? []) as Article[], total: count ?? 0, error };
}

export async function getArticleById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, summary, body, thumbnail, link, category, author, source, created_at")
    .eq("id", id)
    .eq("published", true)
    .single();

  return { article: data as Article | null, error };
}

export async function getArticlesByCategory(category: Category, limit = 12) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, summary, thumbnail, link, category, author, source, created_at")
    .eq("published", true)
    .eq("category", category)
    .not("thumbnail", "is", null)
    .neq("thumbnail", "")
    .order("created_at", { ascending: false })
    .limit(limit);

  return { articles: (data ?? []) as Article[], error };
}

export function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
