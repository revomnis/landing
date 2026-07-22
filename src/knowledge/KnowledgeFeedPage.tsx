import { useEffect, useMemo, useState } from "react";
import { listPublished } from "./api";
import { KnowledgeCard } from "./KnowledgeCard";
import { KnowledgeLayout } from "./KnowledgeLayout";
import { KNOWLEDGE_TOPIC_CHIPS, type KnowledgeArticle } from "./types";
import "./knowledge.css";

type KnowledgeFeedPageProps = {
  onOpenArticle: (slug: string) => void;
};

export function KnowledgeFeedPage({ onOpenArticle }: KnowledgeFeedPageProps) {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    listPublished(topic)
      .then((rows) => {
        if (!cancelled) setArticles(rows);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load knowledge articles.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [topic]);

  const empty = useMemo(
    () => !loading && !error && articles.length === 0,
    [loading, error, articles.length]
  );

  return (
    <KnowledgeLayout ctaToHome>
      <main className="knowledge-feed">
        <div className="container knowledge-feed__inner">
          <header className="knowledge-feed__header animate-in">
            <p className="knowledge-feed__eyebrow">Knowledge</p>
            <h1 className="knowledge-feed__title">
              Outbound knowledge, curated by Revomnis
            </h1>
            <p className="knowledge-feed__lede">
              Skip the rabbit hole. Best thinking on fit before volume, managed
              infrastructure, reply handling, and qualified meetings, with how
              we’d run it.
            </p>
          </header>

          <div
            className="knowledge-feed__chips animate-in animate-in--delay-1"
            role="toolbar"
            aria-label="Filter by topic"
          >
            <button
              type="button"
              className={`knowledge-chip${topic === null ? " is-active" : ""}`}
              onClick={() => setTopic(null)}
            >
              All
            </button>
            {KNOWLEDGE_TOPIC_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className={`knowledge-chip${topic === chip ? " is-active" : ""}`}
                onClick={() => setTopic(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {loading && (
            <p className="knowledge-feed__status" role="status">
              Loading…
            </p>
          )}
          {error && (
            <p className="knowledge-feed__status knowledge-feed__status--error">
              {error}
            </p>
          )}
          {empty && (
            <p className="knowledge-feed__status">
              No published articles in this topic yet.
            </p>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="knowledge-feed__list animate-in animate-in--delay-2">
              {articles.map((article) => (
                <KnowledgeCard
                  key={article.id}
                  article={article}
                  onOpen={onOpenArticle}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </KnowledgeLayout>
  );
}
