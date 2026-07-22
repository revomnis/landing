import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SITE_URL = "https://revomnis.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

type ArticleRow = {
  slug: string;
  title: string;
  source_name: string;
  source_url: string;
  author_name: string | null;
  published_at: string;
  excerpt: string;
  body_md: string | null;
  revomnis_comment: string;
  topics: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(str: string, max: number): string {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function toIsoDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return "";
  }
}

function baseStyles(): string {
  return `
    :root {
      --bg: #FFFFFF;
      --bg-muted: #F8FAFC;
      --text: #0F172A;
      --text-muted: #475569;
      --text-subtle: #64748B;
      --accent: #2563EB;
      --accent-soft: #EFF6FF;
      --accent-border: #BFDBFE;
      --line: #E2E8F0;
      --radius: 12px;
      --radius-card: 24px;
      --font: "DM Sans", system-ui, -apple-system, sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      line-height: 1.55;
    }
    a { color: var(--accent); }
    .wrap { max-width: 720px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
    header {
      display: flex; align-items: center; justify-content: space-between;
      max-width: 1200px; margin: 0 auto; padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--line);
    }
    .logo {
      font-weight: 700; font-size: 1.125rem; color: var(--text);
      text-decoration: none; letter-spacing: -0.02em;
    }
    .meta { color: var(--text-subtle); font-size: 0.875rem; margin-bottom: 0.75rem; }
    h1 {
      font-size: clamp(1.75rem, 4vw, 2.75rem); letter-spacing: -0.03em;
      line-height: 1.15; margin: 0 0 1rem;
    }
    .excerpt { color: var(--text-muted); font-size: 1.05rem; margin: 0 0 1.5rem; }
    .topics { list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .topics li {
      font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.02em; color: var(--accent); background: var(--accent-soft);
      border: 1px solid var(--accent-border); border-radius: 999px; padding: 0.2rem 0.55rem;
    }
    .take {
      background: var(--accent-soft); border: 1px solid var(--accent-border);
      border-radius: var(--radius); padding: 1.25rem; margin: 2rem 0;
    }
    .take-label {
      font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--accent); margin: 0 0 0.5rem;
    }
    .take p { margin: 0; font-size: 1.1rem; font-weight: 500; }
    .cta {
      margin-top: 2.5rem; padding: 1.5rem; background: var(--bg-muted);
      border: 1px solid var(--line); border-radius: var(--radius-card);
    }
    .cta h2 { margin: 0 0 0.5rem; font-size: 1.35rem; }
    .cta p { margin: 0 0 1rem; color: var(--text-muted); }
    .cta a.btn {
      display: inline-block; background: var(--text); color: #fff;
      text-decoration: none; font-weight: 600; padding: 0.75rem 1.25rem;
      border-radius: 999px;
    }
    .back { display: inline-block; margin-bottom: 1.25rem; color: var(--text-subtle); text-decoration: none; font-size: 0.875rem; font-weight: 600; }
    .body p { margin: 0 0 1rem; }
  `;
}

function notFoundHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Article Not Found | Revomnis Knowledge</title>
  <meta name="robots" content="noindex" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>${baseStyles()}</style>
</head>
<body>
  <header><a class="logo" href="${SITE_URL}/">Revomnis</a></header>
  <div class="wrap" style="text-align:center;padding-top:4rem">
    <h1>Article not found</h1>
    <p style="color:var(--text-muted)">This piece may have been unpublished or the link is incorrect.</p>
    <p style="margin-top:2rem"><a href="${SITE_URL}/knowledge">← Back to knowledge</a></p>
  </div>
</body>
</html>`;
}

function articleHtml(article: ArticleRow): string {
  const title =
    article.seo_title || `${article.title} — Revomnis Knowledge`;
  const description = truncate(
    article.seo_description || article.excerpt || article.revomnis_comment,
    160
  );
  const canonical = `${SITE_URL}/knowledge/${encodeURIComponent(article.slug)}`;
  const published = toIsoDate(article.published_at);
  const topics = Array.isArray(article.topics) ? article.topics : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    datePublished: published,
    author: { "@type": "Organization", name: "Revomnis", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Revomnis",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: OG_IMAGE },
    },
    mainEntityOfPage: canonical,
    url: canonical,
    image: OG_IMAGE,
  };

  const bodyParas = (article.body_md || "")
    .split(/\n\n+/)
    .filter((p) => p.trim())
    .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
    .join("\n");

  const topicHtml =
    topics.length > 0
      ? `<ul class="topics">${topics
          .map((t) => `<li>${escapeHtml(t)}</li>`)
          .join("")}</ul>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>${baseStyles()}</style>
</head>
<body>
  <header>
    <a class="logo" href="${SITE_URL}/">Revomnis</a>
    <a href="${SITE_URL}/knowledge">Knowledge</a>
  </header>
  <div class="wrap">
    <a class="back" href="${SITE_URL}/knowledge">← All knowledge</a>
    <p class="meta">
      ${escapeHtml(article.source_name)}
      ·
      <time datetime="${escapeHtml(article.published_at)}">${escapeHtml(formatDate(article.published_at))}</time>
    </p>
    <h1>${escapeHtml(article.title)}</h1>
    ${topicHtml}
    <p class="excerpt">${escapeHtml(article.excerpt)}</p>
    ${bodyParas ? `<div class="body">${bodyParas}</div>` : ""}
    <section class="take" aria-label="Revomnis take">
      <p class="take-label">Revomnis take</p>
      <p>${escapeHtml(article.revomnis_comment)}</p>
    </section>
    <p><a href="${escapeHtml(article.source_url)}" rel="noopener noreferrer">View original source</a></p>
    <aside class="cta">
      <h2>Want this operating system for your market?</h2>
      <p>Revomnis builds and runs coordinated email and LinkedIn outbound for B2B teams — with fit, infrastructure, and visibility included.</p>
      <a class="btn" href="${SITE_URL}/#consultation">Book a Free Consultation</a>
    </aside>
  </div>
</body>
</html>`;
}

/** Local seed fallback when Supabase is not configured (dev / misconfig). */
const LOCAL_FALLBACK: ArticleRow[] = [
  {
    slug: "fit-before-volume-in-outbound",
    title: "Why outbound fails when volume outruns fit",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-02T10:00:00Z",
    excerpt:
      "Outbound breaks when teams scale sends before they define who is actually worth a conversation.",
    body_md: null,
    revomnis_comment:
      "Fit before volume is not a slogan for us — it is the operating rule. We classify accounts and contacts before sequencing so campaigns protect reply quality and meeting standards instead of optimizing for send volume.",
    topics: ["ICP", "targeting"],
    seo_title: "Fit before volume in outbound — Revomnis Knowledge",
    seo_description:
      "Why outbound fails when volume outruns fit, and how Revomnis builds audience logic before campaigns scale.",
  },
  {
    slug: "coordinated-email-and-linkedin",
    title: "Email and LinkedIn only work as one motion",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-09T10:00:00Z",
    excerpt:
      "Treating cold email and LinkedIn as separate services creates mixed signals and weak handoffs.",
    body_md: null,
    revomnis_comment:
      "Revomnis runs email and LinkedIn against one ICP, one messaging system, and one meeting objective. LinkedIn reinforces familiarity; email carries scalable sequencing and reply generation. Separate vendors usually cannot hold that coherence.",
    topics: ["LinkedIn", "email", "sequencing"],
    seo_title: "Coordinated email and LinkedIn outbound — Revomnis Knowledge",
    seo_description:
      "How Revomnis coordinates email and LinkedIn as one outbound motion instead of two disconnected channels.",
  },
  {
    slug: "protect-the-primary-domain",
    title: "Do not burn your primary domain on cold email",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-16T10:00:00Z",
    excerpt:
      "Primary domains should not be the default sending layer for cold outbound.",
    body_md: null,
    revomnis_comment:
      "We operate client-branded secondary domains and managed inbox infrastructure so outbound can run with deliverability discipline while the primary brand domain stays protected. Infrastructure is part of the service, not a bolt-on.",
    topics: ["deliverability", "infrastructure"],
    seo_title: "Protect your primary domain in cold email — Revomnis Knowledge",
    seo_description:
      "Why Revomnis uses managed secondary domains for cold email instead of risking the primary brand domain.",
  },
  {
    slug: "qualified-meetings-not-calendar-spam",
    title: "A booked meeting is not automatically a qualified meeting",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-23T10:00:00Z",
    excerpt:
      "Calendar volume without buyer-fit criteria creates noise for sales and weak pipeline quality.",
    body_md: null,
    revomnis_comment:
      "Before campaigns launch, we define fit signals, disqualifiers, and commercial intent criteria with the client. Reply handling and qualification sit inside the operating system so meetings handed over are worth the conversation.",
    topics: ["qualification", "meetings"],
    seo_title: "Qualified outbound meetings — Revomnis Knowledge",
    seo_description:
      "How Revomnis defines and protects meeting quality instead of optimizing for raw booked-call volume.",
  },
  {
    slug: "visible-not-black-box-outbound",
    title: "Outbound should be visible, not a black box",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-30T10:00:00Z",
    excerpt:
      "Clients should see what is running, what is moving, and what is being learned — not just a monthly activity dump.",
    body_md: null,
    revomnis_comment:
      "The Revomnis portal is a visibility layer for managed outbound: campaign movement, meetings, segments, and insights. The product is still the operating system; the portal exists so clients are not buying a black box.",
    topics: ["visibility", "portal"],
    seo_title: "Visible outbound, not a black box — Revomnis Knowledge",
    seo_description:
      "Why Revomnis pairs managed outbound with portal visibility instead of black-box reporting.",
  },
  {
    slug: "messaging-tests-need-segment-logic",
    title: "Messaging tests are useless without segment logic",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-07-07T10:00:00Z",
    excerpt:
      "A/B copy tests on a mixed audience produce noise, not learning.",
    body_md: null,
    revomnis_comment:
      "We test angles inside clear segments so persona learning and objection patterns are attributable. Insights are only useful when audience definition and campaign execution share the same logic.",
    topics: ["messaging", "ICP", "testing"],
    seo_title: "Outbound messaging tests and segment logic — Revomnis Knowledge",
    seo_description:
      "Why Revomnis ties messaging tests to segment logic so outbound learning is attributable.",
  },
  {
    slug: "reply-handling-is-the-system",
    title: "Reply handling is not an afterthought",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-07-14T10:00:00Z",
    excerpt:
      "Most outbound programs break after the first positive reply because nobody owns interpretation and next step.",
    body_md: null,
    revomnis_comment:
      "Revomnis monitors, interprets, and qualifies replies as part of the managed service. The path from reply to meeting is designed, not forwarded as an unstructured inbox dump.",
    topics: ["replies", "qualification"],
    seo_title: "Outbound reply handling — Revomnis Knowledge",
    seo_description:
      "How Revomnis treats reply handling as part of the outbound operating system, not a handoff afterthought.",
  },
  {
    slug: "anti-patterns-vanity-metrics",
    title: "Vanity metrics hide weak outbound systems",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-07-21T10:00:00Z",
    excerpt:
      "Open rates, connection counts, and raw meetings can look healthy while pipeline quality is poor.",
    body_md: null,
    revomnis_comment:
      "We refuse to sell vanity as proof. The metrics that matter are fit, conversation quality, qualified meetings, and what the market is teaching the system. If a report cannot explain movement and learning, it is theater.",
    topics: ["anti-patterns", "visibility"],
    seo_title: "Outbound vanity metrics to avoid — Revomnis Knowledge",
    seo_description:
      "Which outbound vanity metrics Revomnis rejects, and what visibility should show instead.",
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slugParam = req.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug || typeof slug !== "string") {
    res.status(404).setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(notFoundHtml());
    return;
  }

  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  let article: ArticleRow | null = null;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from("knowledge_articles")
      .select(
        "slug,title,source_name,source_url,author_name,published_at,excerpt,body_md,revomnis_comment,topics,seo_title,seo_description"
      )
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    if (data) article = data as ArticleRow;
  } else {
    article = LOCAL_FALLBACK.find((a) => a.slug === slug) ?? null;
  }

  if (!article) {
    res.status(404).setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    res.send(notFoundHtml());
    return;
  }

  res.status(200).setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=86400"
  );
  res.send(articleHtml(article));
}
