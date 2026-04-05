"use client";

import { useState } from "react";
import { updateSubscription } from "@/lib/actions/subscription";

export function SubscriptionToggle({ subscribed: initial }: { subscribed: boolean }) {
  const [subscribed, setSubscribed] = useState(initial);
  const [isPending, setIsPending] = useState(false);

  async function handleToggle() {
    setIsPending(true);
    const next = !subscribed;
    const result = await updateSubscription(next);
    if (!result.error) {
      setSubscribed(next);
    }
    setIsPending(false);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className="flex items-center gap-3"
    >
      <div
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
          subscribed ? "bg-green-600" : "bg-neutral-700"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
            subscribed ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <span className="text-sm text-neutral-300">
        {isPending ? "Updating..." : subscribed ? "Subscribed" : "Not subscribed"}
      </span>
    </button>
  );
}
