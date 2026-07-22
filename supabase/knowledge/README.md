# Revomnis Knowledge Feed — Supabase

Dedicated project for the public knowledge base at `/knowledge`. Do **not** use the portal Supabase project.

## Setup

1. Create a new Supabase project.
2. In the SQL editor, run `001_schema.sql`, then `002_seed.sql`.
3. Copy the project URL and anon key into landing env:

```bash
# .env.local (Vite)
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Vercel (article HTML + sitemap)
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=your-anon-key
# or reuse the VITE_ names — API falls back to them
```

4. Add articles in Table Editor (`status = published`). Slug becomes `/knowledge/:slug`.

## RLS

- Public (`anon` / `authenticated`) can **SELECT** published rows only.
- No public write policies — use the dashboard or service role for inserts/updates.
