import { requireUser } from "@/lib/supabase/auth";
import { getBookmarks } from "@/lib/actions/bookmarks";
import { getSubscription } from "@/lib/actions/subscription";
import { getProfile } from "@/lib/actions/profile";
import { SubscriptionToggle } from "./SubscriptionToggle";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const user = await requireUser();
  const [bookmarks, subscription, profile] = await Promise.all([
    getBookmarks(),
    getSubscription(),
    getProfile(),
  ]);

  const displayName =
    profile?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    "User";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-[#6b7b6e]">
          Welcome back, {displayName}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-2xl border border-[#2c312e] bg-[#1a1f1c] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Profile</h2>
            <Link
              href="/dashboard/profile"
              className="text-sm text-[#6b7b6e] transition-colors hover:text-white"
            >
              Edit
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt={displayName}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2c312e] text-xl font-bold text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium text-white">{displayName}</p>
              <p className="text-sm text-[#6b7b6e]">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Newsletter Card */}
        <div className="rounded-2xl border border-[#2c312e] bg-[#1a1f1c] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Newsletter</h2>
          <p className="mb-4 text-sm text-[#6b7b6e]">
            Receive the latest AI & tech news in your inbox.
          </p>
          <SubscriptionToggle
            subscribed={subscription?.subscribed ?? false}
          />
        </div>

        {/* Bookmarks Card */}
        <div className="rounded-2xl border border-[#2c312e] bg-[#1a1f1c] p-6 md:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Bookmarks
            <span className="ml-2 text-sm font-normal text-[#4a5a4d]">
              ({bookmarks.length})
            </span>
          </h2>

          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="mb-4 h-12 w-12 text-[#2c312e]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              <p className="text-[#c8d4cb]">No bookmarks yet</p>
              <p className="mt-1 text-sm text-[#4a5a4d]">
                Bookmark articles to read them later
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bookmark: Record<string, unknown>) => {
                const article = bookmark.article as Record<string, unknown> | null;
                if (!article) return null;
                return (
                  <Link
                    key={bookmark.id as string}
                    href={`/news/${article.id}`}
                    className="flex items-center gap-4 rounded-xl border border-[#2c312e] p-4 transition-colors hover:border-[#3c4a3e] hover:bg-[#0f1410]"
                  >
                    {(article.thumbnail as string) && (
                      <Image
                        src={article.thumbnail as string}
                        alt={article.title as string}
                        width={96}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {article.title as string}
                      </p>
                      <p className="mt-1 text-sm text-[#6b7b6e] truncate">
                        {article.summary as string}
                      </p>
                      <span className="mt-1 inline-block text-xs text-[#0a8935] uppercase">
                        {article.category as string}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
