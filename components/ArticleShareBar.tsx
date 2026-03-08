"use client";

import { useCallback, useEffect, useState } from "react";

interface ArticleShareBarProps {
  title: string;
  /** サーバーから渡す場合。未指定ならクライアントで window.location.href を使用 */
  shareUrl?: string;
  className?: string;
}

export function ArticleShareBar({ title, shareUrl: initialUrl, className }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [clientUrl, setClientUrl] = useState(initialUrl ?? "");

  useEffect(() => {
    if (initialUrl) return;
    setClientUrl(window.location.href);
  }, [initialUrl]);

  const shareUrl = initialUrl || clientUrl;

  const handleCopyLink = useCallback(() => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [shareUrl]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Share on Reddit",
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .768-.411 1.424-1.021 1.796-.021.018-.047.028-.073.044-.023.015-.045.032-.068.046-.23.165-.437.354-.633.555-.993 1.04-1.618 2.282-1.618 3.727a4.252 4.252 0 0 0 4.252 4.252 4.252 4.252 0 0 0 4.252-4.252c0-1.445-.625-2.687-1.618-3.727-.196-.201-.403-.39-.633-.555-.023-.014-.045-.031-.068-.046-.026-.016-.052-.026-.073-.044-.61-.372-1.021-1.028-1.021-1.796 0-.968.786-1.754 1.754-1.754.466 0 .898.182 1.207.49 1.194-.856 2.85-1.418 4.674-1.488l-.8-3.747-2.597.547a1.25 1.25 0 0 1-2.498-.056c0-.688.562-1.25 1.25-1.25z" />
        </svg>
      ),
    },
    {
      label: "Share via Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" aria-hidden />
        <span className="h-px w-8 border-t border-dashed border-neutral-300 dark:border-neutral-600" aria-hidden />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {shareLinks.map(({ label, href, icon }) => {
          const fullHref = shareUrl ? href : "#";
          return (
            <a
              key={label}
              href={fullHref}
              target={shareUrl ? "_blank" : undefined}
              rel={shareUrl ? "noopener noreferrer" : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 disabled:pointer-events-none disabled:opacity-50"
              aria-label={label}
              onClick={!shareUrl ? (e) => e.preventDefault() : undefined}
            >
              {icon}
            </a>
          );
        })}
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
          aria-label={copied ? "Link copied" : "Copy link"}
          title={copied ? "Copied!" : "Copy link"}
        >
          {copied ? (
            <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.172-1.172a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.172 1.172z" />
            </svg>
          )}
        </button>
      </div>
      <div className="mt-4 h-px w-full bg-neutral-200 dark:bg-neutral-700" aria-hidden />
    </div>
  );
}
