import { LOCAL_SEED_ARTICLES } from "./seed";
import { getSupabase, isSupabaseConfigured } from "./supabase";
import type { KnowledgeArticle } from "./types";

function normalizeArticle(row: Record<string, unknown>): KnowledgeArticle {
  const topicsRaw = row.topics;
  const topics = Array.isArray(topicsRaw)
    ? topicsRaw.filter((t): t is string => typeof t === "string")
    : [];

  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    source_name: String(row.source_name),
    source_url: String(row.source_url),
    author_name:
      row.author_name == null ? null : String(row.author_name),
    published_at: String(row.published_at),
    excerpt: String(row.excerpt ?? ""),
    body_md: row.body_md == null ? null : String(row.body_md),
    revomnis_comment: String(row.revomnis_comment),
    topics,
    status: row.status === "draft" ? "draft" : "published",
    seo_title: row.seo_title == null ? null : String(row.seo_title),
    seo_description:
      row.seo_description == null ? null : String(row.seo_description),
    created_at:
      row.created_at == null ? undefined : String(row.created_at),
    updated_at:
      row.updated_at == null ? undefined : String(row.updated_at),
  };
}

function sortByPublishedDesc(articles: KnowledgeArticle[]): KnowledgeArticle[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export async function listPublished(
  topic?: string | null
): Promise<KnowledgeArticle[]> {
  const supabase = getSupabase();

  if (!supabase) {
    const local = sortByPublishedDesc(LOCAL_SEED_ARTICLES);
    if (!topic) return local;
    return local.filter((a) =>
      a.topics.some((t) => t.toLowerCase() === topic.toLowerCase())
    );
  }

  let query = supabase
    .from("knowledge_articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (topic) {
    query = query.contains("topics", [topic]);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.warn("[knowledge] listPublished fallback:", error?.message);
    return sortByPublishedDesc(LOCAL_SEED_ARTICLES);
  }

  return data.map((row) => normalizeArticle(row as Record<string, unknown>));
}

export async function getBySlug(
  slug: string
): Promise<KnowledgeArticle | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return (
      LOCAL_SEED_ARTICLES.find((a) => a.slug === slug && a.status === "published") ??
      null
    );
  }

  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.warn("[knowledge] getBySlug fallback:", error.message);
    return (
      LOCAL_SEED_ARTICLES.find((a) => a.slug === slug && a.status === "published") ??
      null
    );
  }

  if (!data) return null;
  return normalizeArticle(data as Record<string, unknown>);
}

export function commentTeaser(comment: string, max = 120): string {
  const cleaned = comment.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export function formatArticleDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export { isSupabaseConfigured };
