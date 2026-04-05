/**
 * Gadget 記事の型と Supabase 連携。
 */

import { createClient } from "@/lib/supabase/server";

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

// --- DB row → GadgetArticle 変換 ---

function toGadgetArticle(row: Record<string, unknown>): GadgetArticle {
  return {
    id: row.id as string,
    thumbnail: (row.thumbnail as string) ?? "",
    title: (row.title as string) ?? "",
    summary: (row.summary as string) ?? "",
    body: (row.body as string) ?? "",
    link: (row.link as string) ?? "",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getGadgetArticles(): Promise<GadgetArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", "gadget")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toGadgetArticle);
}

export async function getGadgetArticleById(
  id: string
): Promise<GadgetArticle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .eq("category", "gadget")
    .single();

  if (error) return null;
  return toGadgetArticle(data);
}

export async function createGadgetArticle(
  input: GadgetArticleInput
): Promise<GadgetArticle> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .insert({
      title: input.title,
      summary: input.summary,
      body: input.body,
      thumbnail: input.thumbnail,
      link: input.link,
      category: "gadget",
      published: true,
    })
    .select()
    .single();

  if (error) throw error;
  return toGadgetArticle(data);
}

export async function updateGadgetArticle(
  id: string,
  input: Partial<GadgetArticleInput>
): Promise<GadgetArticle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return toGadgetArticle(data);
}

export async function deleteGadgetArticle(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id);

  return !error;
}
