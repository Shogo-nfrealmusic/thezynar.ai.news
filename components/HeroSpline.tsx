"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/types";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false, loading: () => <SplinePlaceholder /> }
);

const SPLINE_SCENE_URL =
  "https://prod.spline.design/dTMAoDRVroDzvhts/scene.splinecode";

/**
 * シーンが動かない場合: Spline エディタで Export → Play Settings を確認してください。
 * - Orbit, Pan, Zoom を有効に
 * - Touch: Orbit / Pan を「1 Finger」に（タッチでドラッグできるように）
 */

/** 読み込み中・表示前の軽いプレースホルダー */
function SplinePlaceholder({ className }: { className?: string } = {}) {
  return (
    <div
      className={className ?? "h-full w-full"}
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
      }}
    />
  );
}

/** Spline ランタイムの "Missing property" 等で落ちないよう Error Boundary で囲む */
class SplineErrorBoundary extends Component<
  { children: ReactNode; className?: string; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError = () => ({ hasError: true });

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className={this.props.className}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
              color: "#888",
              fontSize: "0.875rem",
            }}
          >
            Scene failed to load
          </div>
        )
      );
    }
    return this.props.children;
  }
}

/** onSplineMouseDown のイベント（target.name でオブジェクト名を取得） */
interface SplineMouseEvent {
  target?: { name?: string };
}

const OBJECT_NAME_TO_CATEGORY: Array<{
  pattern: string;
  category: Category;
}> = [
  { pattern: "LATEST", category: "latest" },
  { pattern: "AI", category: "ai" },
  { pattern: "TECH", category: "tech" },
  { pattern: "GADGET", category: "gadget" },
  { pattern: "TREND", category: "trending" },
];

function getCategoryFromObjectName(name: string | undefined): Category | null {
  if (!name || typeof name !== "string") return null;
  const upper = name.toUpperCase();
  for (const { pattern, category } of OBJECT_NAME_TO_CATEGORY) {
    if (upper.includes(pattern)) return category;
  }
  return null;
}

export interface HeroSplineProps {
  /** Spline シーンの URL（.splinecode など）。未指定時は SPLINE_SCENE_URL を使用 */
  scene?: string;
  /** オブジェクトクリック時に呼ばれる。カテゴリにマップされた場合のみ呼ばれる */
  onCategorySelect?: (category: Category) => void;
  className?: string;
}

/** 再生ボタン用のアイコン（Spline 部分の再レンダリング） */
function ReplayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );
}

export function HeroSpline({
  scene = SPLINE_SCENE_URL,
  onCategorySelect,
  className,
}: HeroSplineProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [splineRemountKey, setSplineRemountKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    setSplineRemountKey((k) => k + 1);
  };

  // Spline ランタイムの buildTimeline で出る "Missing property" の console.error を抑制（シーン側の参照不備で表示されるのみで動作には影響しない）
  useEffect(() => {
    if (!shouldLoad) return;
    const orig = console.error;
    console.error = (...args: unknown[]) => {
      const msg = args[0];
      if (typeof msg === "string" && msg.includes("Missing property")) return;
      orig.apply(console, args);
    };
    return () => {
      console.error = orig;
    };
  }, [shouldLoad]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "100px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSplineMouseDown = (e: SplineMouseEvent) => {
    const name = e.target?.name;
    const category = getCategoryFromObjectName(name);
    if (category) onCategorySelect?.(category);
  };

  return (
    <div ref={containerRef} className={className} style={{ minHeight: 0, maxWidth: "100%" }}>
      {shouldLoad ? (
        <SplineErrorBoundary className="relative block h-full w-full overflow-hidden">
          <div
            key={splineRemountKey}
            className="h-full w-full [&_>*]:h-full [&_>*]:w-full [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:cursor-grab [&_canvas]:active:cursor-grabbing"
            style={{ touchAction: "none", minHeight: "100%", minWidth: "100%" }}
          >
            <Spline
              scene={scene}
              onSplineMouseDown={handleSplineMouseDown}
            />
          </div>
          <button
            type="button"
            onClick={handleReplay}
            className="hero-replay-top absolute right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-neutral-800 shadow-md ring-1 ring-black/5 transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/60 dark:bg-neutral-900/80 dark:text-neutral-100 dark:hover:bg-neutral-800"
            title="Reload Spline"
            aria-label="Reload Spline"
          >
            <ReplayIcon className="h-4 w-4" />
          </button>
        </SplineErrorBoundary>
      ) : (
        <SplinePlaceholder className={className} />
      )}
    </div>
  );
}
