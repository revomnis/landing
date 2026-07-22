import { commentTeaser, formatArticleDate } from "./api";
import type { KnowledgeArticle } from "./types";

type KnowledgeCardProps = {
  article: KnowledgeArticle;
  onOpen: (slug: string) => void;
};

export function KnowledgeCard({ article, onOpen }: KnowledgeCardProps) {
  return (
    <article className="knowledge-card">
      <a
        className="knowledge-card__hit"
        href={`/knowledge/${article.slug}`}
        onClick={(e) => {
          if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey
          ) {
            return;
          }
          e.preventDefault();
          onOpen(article.slug);
        }}
      >
        <div className="knowledge-card__meta">
          <span className="knowledge-card__source">{article.source_name}</span>
          <span className="knowledge-card__dot" aria-hidden="true" />
          <time dateTime={article.published_at}>
            {formatArticleDate(article.published_at)}
          </time>
        </div>
        <h2 className="knowledge-card__title">{article.title}</h2>
        <p className="knowledge-card__excerpt">{article.excerpt}</p>
        {article.topics.length > 0 && (
          <ul className="knowledge-card__topics">
            {article.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        )}
        <p className="knowledge-card__take">
          <span className="knowledge-card__take-label">Revomnis take</span>
          {commentTeaser(article.revomnis_comment)}
        </p>
      </a>
    </article>
  );
}
