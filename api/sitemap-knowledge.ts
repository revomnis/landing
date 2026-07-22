import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SITE_URL = "https://revomnis.com";

const LOCAL_SLUGS = [
  "fit-before-volume-in-outbound",
  "coordinated-email-and-linkedin",
  "protect-the-primary-domain",
  "qualified-meetings-not-calendar-spam",
  "visible-not-black-box-outbound",
  "messaging-tests-need-segment-logic",
  "reply-handling-is-the-system",
  "anti-patterns-vanity-metrics",
];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  let urls: { loc: string; lastmod?: string }[] = [];

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from("knowledge_articles")
      .select("slug,updated_at,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (data?.length) {
      urls = data.map((row) => ({
        loc: `${SITE_URL}/knowledge/${encodeURIComponent(row.slug)}`,
        lastmod: (row.updated_at || row.published_at || "").slice(0, 10) || undefined,
      }));
    }
  }

  if (urls.length === 0) {
    urls = LOCAL_SLUGS.map((slug) => ({
      loc: `${SITE_URL}/knowledge/${slug}`,
    }));
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "";
    return `  <url>
    <loc>${u.loc}</loc>${lastmod}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  res.status(200).setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.send(body);
}
