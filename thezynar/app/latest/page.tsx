export default function LatestPage() {
  return (
    <main className="min-h-screen pt-32 px-4">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
        LATEST
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        最新のニュース一覧（ダミー）
      </p>
      <ul className="mt-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <li
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="font-medium">記事タイトル {i}</span>
            <p className="mt-1 text-sm text-neutral-500">
              ダミー本文です。あとで差し替えます。
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
