import { requireUser } from "@/lib/supabase/auth";
import { getProfile } from "@/lib/actions/profile";
import { ProfileForm } from "./ProfileForm";
import Link from "next/link";
import Image from "next/image";

export default async function ProfilePage() {
  const user = await requireUser();
  const profile = await getProfile();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Back */}
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#6b7b6e] transition-colors hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back to Dashboard
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-white">Profile Settings</h1>

      <div className="rounded-2xl border border-[#2c312e] bg-[#1a1f1c] p-6">
        {/* Avatar */}
        <div className="mb-8 flex items-center gap-4">
          {user.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2c312e] text-2xl font-bold text-white">
              {(profile?.display_name || user.email || "?").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm text-[#6b7b6e]">Avatar</p>
            <p className="text-xs text-[#4a5a4d]">
              Managed by your Google account
            </p>
          </div>
        </div>

        {/* Email (read only) */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-[#c8d4cb]">
            Email
          </label>
          <div className="rounded-lg border border-[#2c312e] bg-[#0f1410] px-4 py-3 text-sm text-[#4a5a4d]">
            {user.email}
          </div>
        </div>

        {/* Editable form */}
        <ProfileForm
          initialName={
            profile?.display_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            ""
          }
        />
      </div>
    </div>
  );
}
