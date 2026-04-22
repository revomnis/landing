import { useState } from "react";
import { cn } from "../lib/cn";

type TabId = "friction" | "revomnis";

export type ValueCardProps = {
  headline: string;
  friction: string;
  revomnis: string;
  accent?: boolean;
  animateClass?: string;
};

export function ValueCard({ headline, friction, revomnis, accent, animateClass }: ValueCardProps) {
  const [tab, setTab] = useState<TabId>("friction");

  return (
    <div className={animateClass}>
    <article
      className={cn("value-card", accent && "value-card--accent", tab === "revomnis" && "value-card--revomnis")}
    >
      <h3 className="value-card__headline">{headline}</h3>
      <div className="value-card__switch" role="tablist" aria-label={`View friction or Revomnis: ${headline}`}>
        <button
          type="button"
          className={cn("value-card__tab", tab === "friction" && "is-active")}
          role="tab"
          aria-selected={tab === "friction"}
          data-value-tab="friction"
          onClick={() => setTab("friction")}
        >
          The friction
        </button>
        <button
          type="button"
          className={cn("value-card__tab", tab === "revomnis" && "is-active")}
          role="tab"
          aria-selected={tab === "revomnis"}
          data-value-tab="revomnis"
          onClick={() => setTab("revomnis")}
        >
          With Revomnis
        </button>
        <span className="value-card__switch-thumb" aria-hidden="true" />
      </div>
      <div className="value-card__panels">
        <div
          className={cn("value-card__panel", tab === "friction" && "is-active")}
          role="tabpanel"
          aria-hidden={tab !== "friction"}
        >
          <p>{friction}</p>
        </div>
        <div
          className={cn("value-card__panel", tab === "revomnis" && "is-active")}
          role="tabpanel"
          aria-hidden={tab !== "revomnis"}
        >
          <p>{revomnis}</p>
        </div>
      </div>
    </article>
    </div>
  );
}
