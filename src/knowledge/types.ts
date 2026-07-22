export type KnowledgeArticleStatus = "draft" | "published";

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  source_name: string;
  source_url: string;
  author_name: string | null;
  published_at: string;
  excerpt: string;
  body_md: string | null;
  revomnis_comment: string;
  topics: string[];
  status: KnowledgeArticleStatus;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
}

export const KNOWLEDGE_TOPIC_CHIPS = [
  "ICP",
  "email",
  "LinkedIn",
  "deliverability",
  "sequencing",
  "qualification",
  "visibility",
  "anti-patterns",
] as const;
