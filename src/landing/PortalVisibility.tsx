import { StatusChip } from "../components/StatusChip";
import {
  PORTAL_TABS,
  ACTIVE_TAB,
  CAMPAIGN_ROWS,
  SEGMENT_ROWS,
  MEETING_SOURCES,
  INTERPRETATION_ROWS,
  VISIBILITY_CATEGORIES,
} from "./portalVisibilityData";

export function PortalVisibility() {
  return (
    <section
      className="portal-vis section section--cool"
      aria-labelledby="portal-vis-heading"
    >
      <div className="container portal-vis__layout">
        {/* ── Copy column (mobile first, desktop right via order) ── */}
        <div className="portal-vis__copy">
          <p className="section__title animate-in">Portal visibility</p>
          <h2
            id="portal-vis-heading"
            className="portal-vis__headline animate-in animate-in--delay-1"
          >
            See what is running, moving, and being learned.
          </h2>
          <p className="portal-vis__sub animate-in animate-in--delay-2">
            The Revomnis portal gives clients a structured view of campaigns,
            meetings, segments, and insights, so they can understand progress
            without managing the machinery.
          </p>

          <div className="portal-vis__cats animate-in animate-in--delay-3">
            {VISIBILITY_CATEGORIES.map((cat) => (
              <div key={cat.title} className="portal-vis__cat">
                <h3 className="portal-vis__cat-label">{cat.title}</h3>
                <p className="portal-vis__cat-desc">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Portal mockup column (desktop left via order) ── */}
        <div className="portal-vis__visual animate-in animate-in--delay-2">
          <div
            className="portal-vis__mobile-summary"
            aria-label="Portal visibility summary"
          >
            <p className="portal-vis__mobile-summary-title">Visibility summary</p>
            <div className="portal-vis__mobile-panel">
              {VISIBILITY_CATEGORIES.map((cat) => (
                <div key={cat.title} className="portal-vis__mobile-row">
                  <h3 className="portal-vis__mobile-row-title">{cat.title}</h3>
                  <p className="portal-vis__mobile-row-desc">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="portal-mock portal-vis__mock"
            aria-label="Revomnis Portal visibility view"
          >
            {/* Browser chrome */}
            <div className="portal-mock__topbar" aria-hidden="true">
              <span className="portal-mock__dot portal-mock__dot--red" />
              <span className="portal-mock__dot portal-mock__dot--yellow" />
              <span className="portal-mock__dot portal-mock__dot--green" />
            </div>

            {/* Dark header band */}
            <div className="portal-mock__header">
              <span className="portal-mock__title">Revomnis Portal</span>
              <span className="portal-mock__header-right">
                <span className="portal-mock__live-dot" aria-hidden="true" />
                <span className="portal-mock__badge">Live visibility</span>
              </span>
            </div>

            {/* Tab navigation (decorative, not interactive) */}
            <div className="portal-v__tabs">
              {PORTAL_TABS.map((tab) => (
                <span
                  key={tab.key}
                  className={`portal-v__tab${tab.key === ACTIVE_TAB ? " portal-v__tab--active" : ""}`}
                >
                  {tab.label}
                </span>
              ))}
            </div>

            {/* Body */}
            <div className="portal-mock__body">
              {/* Zone 1: two-column panels */}
              <div className="portal-mock__columns">
                {/* Panel A: Active campaigns */}
                <div className="portal-mock__panel">
                  <div className="portal-mock__panel-header">
                    <span className="portal-mock__panel-title">
                      Active campaigns
                    </span>
                    <StatusChip label="Active" color="blue" />
                  </div>
                  {CAMPAIGN_ROWS.map((row) => (
                    <div key={row.label} className="portal-mock__row">
                      <span className="portal-mock__row-label">{row.label}</span>
                      <span className="portal-mock__row-value">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Panel B: Segments in motion */}
                <div className="portal-mock__panel">
                  <div className="portal-mock__panel-header">
                    <span className="portal-mock__panel-title">
                      Segments in motion
                    </span>
                  </div>
                  {SEGMENT_ROWS.map((seg) => (
                    <div key={seg.label} className="portal-mock__row">
                      <span className="portal-mock__row-label">
                        <span
                          className={`portal-mock__row-dot ${seg.active ? "portal-mock__row-dot--blue" : "portal-mock__row-dot--gray"}`}
                          aria-hidden="true"
                        />
                        {seg.label}
                      </span>
                      {!seg.active && (
                        <span className="portal-mock__row-value">
                          <StatusChip label="Excluded" color="gray" className="chip--sm" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Zone 2: Meeting context */}
              <div className="portal-v__meeting portal-mock__panel">
                <div className="portal-mock__panel-header">
                  <span className="portal-mock__panel-title">
                    Meeting context
                  </span>
                </div>
                <div className="portal-v__meeting-sources">
                  {MEETING_SOURCES.map((src) => (
                    <div key={src.label} className="portal-v__meeting-item">
                      <span className="portal-v__meeting-count">{src.count}</span>
                      <span className="portal-v__meeting-label">{src.label}</span>
                    </div>
                  ))}
                </div>
                <div className="portal-v__meeting-qual">
                  <span className="portal-v__meeting-qual-label">
                    Qualification
                  </span>
                  <span className="portal-v__meeting-qual-value">
                    Qualified conversation
                  </span>
                </div>
              </div>

              {/* Zone 3: Interpretation */}
              <div className="portal-mock__interp">
                <div className="portal-mock__interp-header">
                  <span className="portal-mock__interp-title">
                    Latest interpretation
                  </span>
                  <StatusChip label="Insight" color="blue" />
                </div>
                {INTERPRETATION_ROWS.map((row) => (
                  <div key={row.label} className="portal-mock__insight-row">
                    <span className="portal-mock__insight-label">
                      {row.label}
                    </span>
                    <p className="portal-mock__insight-text">{row.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
