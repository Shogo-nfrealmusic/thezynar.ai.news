-- ============================================================
-- thezynar.ai.news — Initial Schema
-- Supabase Dashboard の SQL Editor で実行してください
-- ============================================================

-- 1. profiles（Auth ユーザーと連携）
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auth ユーザー作成時に profile を自動作成
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. articles（全カテゴリ統合）
create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text default '',
  body text default '',
  thumbnail text default '',
  link text default '',
  category text not null default 'latest',
  published boolean default false,
  author_id uuid references public.profiles(id),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.articles enable row level security;

create policy "Published articles are viewable by everyone"
  on public.articles for select using (published = true);

create policy "Authors can manage own articles"
  on public.articles for all using (auth.uid() = author_id);

create index idx_articles_category on public.articles(category);
create index idx_articles_created_at on public.articles(created_at desc);


-- 3. subscribers（Newsletter）
create table if not exists public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  user_id uuid references public.profiles(id),
  subscribed boolean default true,
  created_at timestamptz default now() not null
);

alter table public.subscribers enable row level security;

create policy "Users can view own subscription"
  on public.subscribers for select using (auth.uid() = user_id);

create policy "Anyone can subscribe"
  on public.subscribers for insert with check (true);

create policy "Users can update own subscription"
  on public.subscribers for update using (auth.uid() = user_id);


-- 4. bookmarks（ログインユーザー向け）
create table if not exists public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  article_id uuid references public.articles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(user_id, article_id)
);

alter table public.bookmarks enable row level security;

create policy "Users can manage own bookmarks"
  on public.bookmarks for all using (auth.uid() = user_id);

create index idx_bookmarks_user on public.bookmarks(user_id);


-- 5. updated_at 自動更新トリガー
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger update_articles_updated_at
  before update on public.articles
  for each row execute function public.update_updated_at();
