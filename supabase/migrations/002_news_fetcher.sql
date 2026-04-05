-- ============================================================
-- 002_news_fetcher.sql
-- RSS / Hacker News フェッチャー用の追加カラム
-- ============================================================

-- 外部ソースから取得した記事用フィールド
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS author text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT '';

-- link を NULL 許容に変更（UNIQUE 制約は NULL を重複扱いしない）
ALTER TABLE public.articles
  ALTER COLUMN link DROP NOT NULL,
  ALTER COLUMN link SET DEFAULT NULL;

-- 既存の空文字を NULL に統一
UPDATE public.articles SET link = NULL WHERE link = '';

-- UNIQUE 制約を追加（NULL は複数行あっても競合しない）
ALTER TABLE public.articles
  DROP CONSTRAINT IF EXISTS articles_link_unique;
ALTER TABLE public.articles
  ADD CONSTRAINT articles_link_unique UNIQUE (link);
