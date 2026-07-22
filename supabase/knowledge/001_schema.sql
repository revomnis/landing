-- Revomnis Knowledge Feed schema
-- Run in a dedicated Supabase project (not the portal project).

create extension if not exists "pgcrypto";

create table if not exists public.knowledge_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  source_name text not null,
  source_url text not null,
  author_name text,
  published_at timestamptz not null default now(),
  excerpt text not null default '',
  body_md text,
  revomnis_comment text not null,
  topics text[] not null default '{}',
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists knowledge_articles_published_at_idx
  on public.knowledge_articles (published_at desc)
  where status = 'published';

create index if not exists knowledge_articles_topics_idx
  on public.knowledge_articles using gin (topics);

create or replace function public.set_knowledge_articles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists knowledge_articles_set_updated_at on public.knowledge_articles;
create trigger knowledge_articles_set_updated_at
  before update on public.knowledge_articles
  for each row
  execute function public.set_knowledge_articles_updated_at();

alter table public.knowledge_articles enable row level security;

drop policy if exists "Public can read published knowledge articles"
  on public.knowledge_articles;
create policy "Public can read published knowledge articles"
  on public.knowledge_articles
  for select
  to anon, authenticated
  using (status = 'published');

-- Writes happen via service role / Table Editor only (no public insert/update/delete policies).
