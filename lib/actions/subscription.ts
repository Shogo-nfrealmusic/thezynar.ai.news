"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { revalidatePath } from "next/cache";

export async function getSubscription() {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("subscribers")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return data;
}

export async function updateSubscription(subscribed: boolean) {
  const user = await getUser();
  if (!user || !user.email) return { error: "Not authenticated" };

  const supabase = await createClient();

  const { error } = await supabase.from("subscribers").upsert(
    {
      email: user.email,
      user_id: user.id,
      subscribed,
    },
    { onConflict: "email" }
  );

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}
