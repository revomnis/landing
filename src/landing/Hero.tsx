import { Button } from "../components/Button";
import { CTA_HREF } from "../lib/constants";

const LEAD_COUNT = 5;
const LEAD_TX = [26, 13, 0, -13, -26] as const;
const BAR_HEIGHTS = [0.38, 0.52, 0.68, 0.84, 1] as const;

const STAGE_LABELS = ["ICP", "Lists", "Outreach", "Pipeline", "Meetings"] as const;

export function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-heading">
      <div className="container hero__layout">
        <div className="hero__copy">
          <p className="hero__eyebrow animate-in">Managed outbound for B2B teams</p>
          <h1 id="hero-heading" className="hero__title animate-in animate-in--delay-1">
            Qualified meetings on your calendar—without running outbound yourself.
          </h1>
          <p className="hero__sub animate-in animate-in--delay-2">
            Revomnis builds and runs your system from ICP through booked calls. You don&apos;t
            manage SDRs or campaigns—you show up to conversations that matter.
          </p>
          <div className="hero__cta animate-in animate-in--delay-3">
            <div className="hero__cta-row">
              <Button href={CTA_HREF} variant="primary" size="lg">
                Book Free Consultation
              </Button>
              <a className="hero__cta-secondary" href="#process">
                See how it works
              </a>
            </div>
            <p className="hero__trust">We reply within one business day when you reach out.</p>
            <p className="hero__trust hero__trust--dim">
              No SDR bench, no lead-chasing theater—just a managed system aimed at qualified
              meetings.
            </p>
          </div>
        </div>
        <div className="hero__visual animate-in animate-in--delay-1" aria-hidden="true">
          <div className="hero-chart">
            <p className="hero-chart__label">ICP &rarr; pipeline &rarr; meetings</p>
            <div
              className="hero-funnel"
              role="img"
              aria-label="Leads funnel through pipeline toward meetings; revenue bars rise beside it."
            >
              <div className="hero-funnel__leads-block">
                <span className="hero-funnel__eyebrow">Leads</span>
                <div className="hero-funnel__chute">
                  <svg
                    className="hero-funnel__guides"
                    viewBox="0 0 200 56"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 8 4 L 100 52"
                      stroke="#0a0a0a"
                      strokeOpacity="0.14"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 192 4 L 100 52"
                      stroke="#0a0a0a"
                      strokeOpacity="0.14"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="hero-funnel__dots">
                    {Array.from({ length: LEAD_COUNT }, (_, i) => (
                      <span
                        key={i}
                        className="hero-funnel__dot"
                        style={
                          {
                            "--tx": `${LEAD_TX[i]}px`,
                            "--d": `${i * 0.34}s`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="hero-funnel__pipeline-wrap">
                <div className="hero-funnel__pipeline">Pipeline</div>
              </div>

              <div className="hero-funnel__revenue-block">
                <span className="hero-funnel__eyebrow">Revenue</span>
                <div className="hero-funnel__bars">
                  {BAR_HEIGHTS.map((fh, i) => (
                    <span key={i} className="hero-funnel__bar">
                      <span
                        className="hero-funnel__bar-inner"
                        style={
                          {
                            "--fh": String(fh),
                            "--bi": String(i),
                          } as React.CSSProperties
                        }
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-stages">
              {STAGE_LABELS.map((label, i) => (
                <span
                  key={label}
                  className="hero-stages__item"
                  style={{ "--si": String(i) } as React.CSSProperties}
                >
                  {label}
                </span>
              ))}
            </div>

            <p className="hero-chart__hint hero-funnel__hint">
              Narrow the field; compound the outcome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
