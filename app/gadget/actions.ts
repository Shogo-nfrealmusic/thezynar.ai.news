"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createGadgetArticle,
  updateGadgetArticle,
  deleteGadgetArticle,
  type GadgetArticleInput,
} from "@/lib/gadget";

export async function createArticle(formData: FormData) {
  const input: GadgetArticleInput = {
    thumbnail: (formData.get("thumbnail") as string) ?? "",
    title: (formData.get("title") as string) ?? "",
    summary: (formData.get("summary") as string) ?? "",
    body: (formData.get("body") as string) ?? "",
    link: (formData.get("link") as string) ?? "",
  };
  await createGadgetArticle(input);
  revalidatePath("/gadget");
  redirect("/gadget");
}

export async function updateArticle(id: string, formData: FormData) {
  const input: Partial<GadgetArticleInput> = {
    thumbnail: formData.get("thumbnail") as string | undefined,
    title: formData.get("title") as string | undefined,
    summary: formData.get("summary") as string | undefined,
    body: formData.get("body") as string | undefined,
    link: formData.get("link") as string | undefined,
  };
  const filtered = Object.fromEntries(
    Object.entries(input).filter(([, v]) => v !== undefined && v !== "")
  ) as Partial<GadgetArticleInput>;
  await updateGadgetArticle(id, filtered);
  revalidatePath("/gadget");
  revalidatePath(`/gadget/${id}`);
  revalidatePath(`/gadget/${id}/edit`);
  redirect("/gadget");
}

export async function deleteArticle(id: string) {
  await deleteGadgetArticle(id);
  revalidatePath("/gadget");
}
