import { useRef, type ElementRef } from "react";
import { Section } from "./Section";
import { Button } from "./Button";
import { useInViewReveal } from "../hooks/useInViewReveal";
import { CTA_HREF } from "../lib/constants";

const SETUP_ITEMS = [
  "Audience and ICP definition",
  "Classification and segment logic",
  "Infrastructure preparation",
  "Campaign architecture",
  "Onboarding and launch setup",
] as const;

const MONTHLY_ITEMS = [
  "Campaign management",
  "Email + LinkedIn execution",
  "Reply handling and qualification",
  "Booked meeting movement",
  "Portal visibility and review",
] as const;

const SCOPE_FACTORS = [
  "Audience complexity",
  "Segment depth",
  "Infrastructure footprint",
  "Email + LinkedIn motion",
  "Management load",
] as const;

export function PricingSection() {
  const sectionRef = useRef<ElementRef<"section">>(null);
  useInViewReveal(sectionRef);

  return (
    <Section
      ref={sectionRef}
      id="pricing"
      className="pricing"
      aria-labelledby="pricing-headline"
    >
      <div className="container">
        <div className="pricing__layout">
          <div className="pricing__copy">
            <p className="section__title animate-in">Pricing</p>
            <h2
              id="pricing-headline"
              className="pricing__headline animate-in animate-in--delay-1"
            >
              Pricing reflects the outbound system you need.
            </h2>
            <p className="pricing__lead animate-in animate-in--delay-2">
              Revomnis engagements use a setup fee and a monthly management fee.
            </p>
            <p className="pricing__lead animate-in animate-in--delay-2">
              Final scope depends on audience complexity, infrastructure
              requirements, channel motion, and delivery intensity.
            </p>
            <div className="pricing__cta-wrap animate-in animate-in--delay-3">
              <Button href={CTA_HREF} variant="primary" size="lg">
                Book a consultation
              </Button>
              <p className="pricing__trust">
                We review your market before recommending scope.
              </p>
            </div>
          </div>

          <div className="pricing__panel animate-in animate-in--delay-2">
            <div className="pricing__panel-header">
              <span className="pricing__panel-title">Commercial structure</span>
              <span className="pricing__panel-caption">
                Scoped after discovery
              </span>
            </div>

            <div className="pricing__cards">
              <div className="pricing__card">
                <div className="pricing__card-head">
                  <span className="pricing__card-num" aria-hidden="true">
                    01
                  </span>
                  <h3 className="pricing__card-title">Setup fee</h3>
                </div>
                <p className="pricing__card-desc">
                  Prepares the outbound engine for launch.
                </p>
                <ul className="pricing__card-list">
                  {SETUP_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pricing__card">
                <div className="pricing__card-head">
                  <span className="pricing__card-num" aria-hidden="true">
                    02
                  </span>
                  <h3 className="pricing__card-title">Monthly management fee</h3>
                </div>
                <p className="pricing__card-desc">
                  Runs and improves the outbound engine.
                </p>
                <ul className="pricing__card-list">
                  {MONTHLY_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pricing__scope">
              <p className="pricing__scope-title">Scope is shaped by</p>
              <ul className="pricing__scope-list">
                {SCOPE_FACTORS.map((factor) => (
                  <li key={factor} className="pricing__scope-chip">
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
