"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [isPending, setIsPending] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setSaved(false);
    const result = await updateProfile(formData);
    setIsPending(false);
    if (!result.error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="display_name"
          className="mb-2 block text-sm font-medium text-neutral-300"
        >
          Display Name
        </label>
        <Input
          id="display_name"
          name="display_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-neutral-700 bg-neutral-950 text-white"
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
        {saved && (
          <span className="text-sm text-green-400">Saved!</span>
        )}
      </div>
    </form>
  );
}
