import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Magic Link / OAuth のコールバック処理
 * メール内リンクやOAuthリダイレクトからここに飛んでくる
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // エラー時はログインページへ
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
