import { createClient } from "./server";
import { redirect } from "next/navigation";

/**
 * 現在のログインユーザーを取得（なければ null）
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * ログイン必須のページで使用。未ログインならリダイレクト
 */
export async function requireUser() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
