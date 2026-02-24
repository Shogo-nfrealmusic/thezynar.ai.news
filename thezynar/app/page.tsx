import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 px-4">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
        Home
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        トップページです。
      </p>
      <p className="mt-4">
        <Link
          href="/latest"
          className="font-medium text-neutral-700 underline dark:text-neutral-300"
        >
          LATEST へ →
        </Link>
      </p>
    </main>
  );
}
