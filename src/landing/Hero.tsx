import { Button } from "../components/Button";
import { CTA_HREF } from "../lib/constants";

export function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-heading">
      <div className="container hero__layout">
        <div className="hero__copy">
          <p className="hero__eyebrow animate-in">BUILT-AND-RUN B2B OUTBOUND</p>
          <h1 id="hero-heading" className="hero__title animate-in animate-in--delay-1">
            <span className="hero__title-main">Qualified B2B meetings</span>
            <span className="hero__title-support">
              from managed <span className="hero__title-accent">email + LinkedIn</span> outbound.
            </span>
          </h1>
          <p className="hero__sub animate-in animate-in--delay-2">
            Revomnis builds and runs coordinated email + LinkedIn outbound for
            B2B companies, covering audience definition, infrastructure, reply
            handling, and qualified meetings.
          </p>
          <div className="hero__cta animate-in animate-in--delay-3">
            <div className="hero__cta-row">
              <Button href={CTA_HREF} variant="primary" size="lg">
                Book a Free Consultation
              </Button>
              <a className="hero__cta-secondary" href="#how-it-works">
                See How It Works
              </a>
            </div>
            <p className="hero__trust">We review your market before recommending scope.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
