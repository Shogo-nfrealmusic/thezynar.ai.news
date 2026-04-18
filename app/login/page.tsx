"use client";

import { useState } from "react";
import { signInWithMagicLink, signInWithGoogle } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleMagicLink(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await signInWithMagicLink(formData);
    setIsPending(false);

    if (result.error) {
      setError(result.error);
    } else {
      setEmailSent(true);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Sign in to thezynar
          </h1>
          <p className="mt-2 text-sm text-[#6b7b6e]">
            Get personalized news, bookmarks, and more.
          </p>
        </div>

        {emailSent ? (
          <div className="rounded-lg border border-[#2c312e] bg-[#1a1f1c] p-6 text-center">
            <p className="text-sm text-[#c8d4cb]">
              Check your email for a magic link to sign in.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Magic Link */}
            <form action={handleMagicLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#c8d4cb]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={isPending}
                  className="border-[#2c312e] bg-[#0f1410] text-white placeholder:text-[#4a5a4d] focus-visible:ring-[#0a8935]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#0a8935] text-white hover:bg-[#0a8935]/90"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Continue with Email"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#2c312e]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f1410] px-2 text-[#4a5a4d]">
                  or
                </span>
              </div>
            </div>

            {/* Google OAuth */}
            <form action={signInWithGoogle}>
              <Button
                type="submit"
                variant="outline"
                className="w-full border-[#2c312e] bg-[#1a1f1c] text-white hover:bg-[#2c312e] hover:text-white"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>
            </form>

            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
