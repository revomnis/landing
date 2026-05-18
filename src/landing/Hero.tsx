import { Button } from "../components/Button";
import { StatusChip } from "../components/StatusChip";
import { CTA_HREF } from "../lib/constants";

const SNAPSHOT_ITEMS = [
  { label: "Audience", value: "Founder-led B2B services" },
  { label: "Infrastructure", value: "4 domains / 16 inboxes" },
  { label: "Channels", value: "Email + LinkedIn" },
  { label: "Replies", value: "18 classified" },
  { label: "Meetings", value: "4 booked" },
] as const;

export function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-heading">
      <div className="container hero__layout">
        <div className="hero__copy">
          <p className="hero__eyebrow animate-in">Managed outbound for B2B teams</p>
          <h1 id="hero-heading" className="hero__title animate-in animate-in--delay-1">
            <span className="hero__title-main">Qualified</span>
            <span className="hero__title-main">B2B meetings</span>
            <span className="hero__title-support">
              from managed{" "}
              <span className="hero__title-accent">email + LinkedIn</span>{" "}
              outbound.
            </span>
          </h1>
          <p className="hero__sub animate-in animate-in--delay-2">
            Revomnis is a boutique premium outbound agency that builds and runs coordinated
            email + LinkedIn systems for B2B companies.
          </p>
          <p className="hero__sub animate-in animate-in--delay-2">
            We define the audience, manage the infrastructure, run outreach, handle replies,
            and book qualified meetings with portal visibility into what is moving and being
            learned.
          </p>
          <div className="hero__cta animate-in animate-in--delay-3">
            <div className="hero__cta-row">
              <Button href={CTA_HREF} variant="primary" size="lg">
                Book a Free Consultation
              </Button>
              <a className="hero__cta-secondary" href="#process">
                See How It Works
              </a>
            </div>
            <p className="hero__trust">We review your market before recommending scope.</p>
          </div>
        </div>

        <div className="hero__visual animate-in animate-in--delay-1">
          <div className="portal-mock" aria-label="Revomnis Portal visibility console">
            <div className="portal-mock__topbar" aria-hidden="true">
              <span className="portal-mock__dot portal-mock__dot--red" />
              <span className="portal-mock__dot portal-mock__dot--yellow" />
              <span className="portal-mock__dot portal-mock__dot--green" />
            </div>

            <div className="portal-mock__header">
              <span className="portal-mock__title">Revomnis Portal</span>
              <span className="portal-mock__header-right">
                <span className="portal-mock__live-dot" aria-hidden="true" />
                <span className="portal-mock__badge">Live visibility</span>
              </span>
            </div>

            <div className="portal-mock__snapshot">
              {SNAPSHOT_ITEMS.map((item) => (
                <div key={item.label} className="portal-mock__snap-item">
                  <span className="portal-mock__snap-label">{item.label}</span>
                  <span className="portal-mock__snap-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="portal-mock__body">
              <div className="portal-mock__columns">
                <div className="portal-mock__panel">
                  <div className="portal-mock__panel-header">
                    <span className="portal-mock__panel-title">Active campaign motion</span>
                    <StatusChip label="Active" color="blue" />
                  </div>
                  <div className="portal-mock__row">
                    <span className="portal-mock__row-label">ICP segment</span>
                    <span className="portal-mock__row-value">Founder-led B2B services</span>
                  </div>
                  <div className="portal-mock__row">
                    <span className="portal-mock__row-label">
                      <span className="portal-mock__row-dot portal-mock__row-dot--blue" aria-hidden="true" />
                      Email sequence
                    </span>
                    <span className="portal-mock__row-value">Active</span>
                  </div>
                  <div className="portal-mock__row">
                    <span className="portal-mock__row-label">
                      <span className="portal-mock__row-dot portal-mock__row-dot--blue" aria-hidden="true" />
                      LinkedIn touchpoints
                    </span>
                    <span className="portal-mock__row-value">Active</span>
                  </div>
                  <div className="portal-mock__row">
                    <span className="portal-mock__row-label">
                      <span className="portal-mock__row-dot portal-mock__row-dot--green" aria-hidden="true" />
                      Reply handling
                    </span>
                    <span className="portal-mock__row-value">Monitored</span>
                  </div>
                </div>

                <div className="portal-mock__panel">
                  <div className="portal-mock__panel-header">
                    <span className="portal-mock__panel-title">Qualified movement</span>
                  </div>
                  <div className="portal-mock__stat-grid">
                    <div className="portal-mock__stat">
                      <span className="portal-mock__stat-label">Replies classified</span>
                      <span className="portal-mock__stat-num">18</span>
                    </div>
                    <div className="portal-mock__stat">
                      <span className="portal-mock__stat-label">Qualified conversations</span>
                      <span className="portal-mock__stat-num">7</span>
                    </div>
                    <div className="portal-mock__stat">
                      <span className="portal-mock__stat-label">Meetings booked</span>
                      <span className="portal-mock__stat-num">4</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="portal-mock__interp">
                <div className="portal-mock__interp-header">
                  <span className="portal-mock__interp-title">Latest interpretation</span>
                  <StatusChip label="Insight" color="blue" />
                </div>
                <div className="portal-mock__insight-row">
                  <span className="portal-mock__insight-label">Positive reply pattern</span>
                  <p className="portal-mock__insight-text">
                    42% of positive replies came after the second email touch.
                  </p>
                </div>
                <div className="portal-mock__insight-row">
                  <span className="portal-mock__insight-label">Audience signal</span>
                  <p className="portal-mock__insight-text">
                    Strongest replies mention SDR hiring cost and internal outbound complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
