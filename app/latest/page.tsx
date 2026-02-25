import type { Category } from "@/lib/types";
import { LatestNewsSection } from "@/components/LatestNewsSection";

const ACTIVE_CATEGORY: Category = "latest";

export default function LatestPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-28 text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <LatestNewsSection
        activeCategory={ACTIVE_CATEGORY}
        limit={20}
        showSeeMore={false}
        className="border-t-0 pt-4"
      />
    </main>
  );
}

