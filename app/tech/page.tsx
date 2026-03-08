import { TechNewsSection } from "@/components/TechNewsSection";

export default async function TechPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(String(params?.page ?? "1"), 10) || 1);

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+1rem)] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <TechNewsSection
        currentPage={currentPage}
        basePath="/tech"
        className="border-t-0 pt-4"
      />
    </main>
  );
}
