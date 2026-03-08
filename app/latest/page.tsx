import type { Category } from "@/lib/types";
import { LatestNewsSection } from "@/components/LatestNewsSection";

const ACTIVE_CATEGORY: Category = "latest";

export default async function LatestPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(String(params?.page ?? "1"), 10) || 1);

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <LatestNewsSection
        activeCategory={ACTIVE_CATEGORY}
        showSeeMore={false}
        showPagination
        currentPage={currentPage}
        basePath="/latest"
        className="border-t-0 pt-4"
      />
    </main>
  );
}

