import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { formatArticleDate, getBySlug } from "./api";
import { KnowledgeLayout } from "./KnowledgeLayout";
import type { KnowledgeArticle } from "./types";
import "./knowledge.css";

type KnowledgeArticlePageProps = {
  slug: string;
  onBack: () => void;
};

export function KnowledgeArticlePage({
  slug,
  onBack,
}: KnowledgeArticlePageProps) {
  const [article, setArticle] = useState<KnowledgeArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    getBySlug(slug)
      .then((row) => {
        if (cancelled) return;
        if (!row) {
          setNotFound(true);
          setArticle(null);
        } else {
          setArticle(row);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const title =
      article.seo_title || `${article.title} — Revomnis Knowledge`;
    const description =
      article.seo_description || article.excerpt || article.revomnis_comment;
    document.title = title;

    const ensureMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (selector.includes("property=")) {
          el.setAttribute("property", selector.match(/property="([^"]+)"/)![1]);
        } else {
          el.setAttribute("name", selector.match(/name="([^"]+)"/)![1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    ensureMeta('meta[name="description"]', "content", description);
    ensureMeta('meta[property="og:title"]', "content", title);
    ensureMeta('meta[property="og:description"]', "content", description);
  }, [article]);

  return (
    <KnowledgeLayout ctaToHome>
      <main className="knowledge-article">
        <div className="container knowledge-article__inner">
          <button type="button" className="knowledge-article__back" onClick={onBack}>
            ← All knowledge
          </button>

          {loading && (
            <p className="knowledge-feed__status" role="status">
              Loading…
            </p>
          )}

          {notFound && !loading && (
            <div className="knowledge-article__missing">
              <h1>Article not found</h1>
              <p>This piece may have been unpublished or the link is incorrect.</p>
              <Button href="/knowledge" variant="primary" size="lg">
                Back to knowledge
              </Button>
            </div>
          )}

          {article && !loading && (
            <article className="knowledge-article__content animate-in">
              <div className="knowledge-article__meta">
                <span>{article.source_name}</span>
                <span className="knowledge-card__dot" aria-hidden="true" />
                <time dateTime={article.published_at}>
                  {formatArticleDate(article.published_at)}
                </time>
              </div>

              <h1 className="knowledge-article__title">{article.title}</h1>

              {article.topics.length > 0 && (
                <ul className="knowledge-card__topics knowledge-article__topics">
                  {article.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              )}

              <p className="knowledge-article__excerpt">{article.excerpt}</p>

              {article.body_md && (
                <div className="knowledge-article__body">
                  {article.body_md.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              <section
                className="knowledge-article__take"
                aria-labelledby="revomnis-take-heading"
              >
                <p className="knowledge-article__take-eyebrow" id="revomnis-take-heading">
                  Revomnis take
                </p>
                <p className="knowledge-article__take-text">
                  {article.revomnis_comment}
                </p>
              </section>

              <p className="knowledge-article__source-link">
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View original source
                </a>
              </p>

              <aside className="knowledge-article__cta">
                <h2>Want this operating system for your market?</h2>
                <p>
                  Revomnis builds and runs coordinated email and LinkedIn
                  outbound for B2B teams — with fit, infrastructure, and
                  visibility included.
                </p>
                <Button href="/#consultation" variant="primary" size="lg">
                  Book a Free Consultation
                </Button>
              </aside>
            </article>
          )}
        </div>
      </main>
    </KnowledgeLayout>
  );
}
