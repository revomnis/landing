import { useRef, type ElementRef } from "react";
import { Section } from "./Section";
import { Button } from "./Button";
import { useInViewReveal } from "../hooks/useInViewReveal";
import { CTA_HREF } from "../lib/constants";

const FACTORS = [
  "Target market complexity",
  "Number of ICP segments",
  "Outreach channels required",
  "Level of personalization and speed",
] as const;

const SETUP_ITEMS = [
  "Discovery and ICP definition",
  "Audience research and list building",
  "Infrastructure setup and warmup",
  "Messaging strategy and copy",
] as const;

const MONTHLY_ITEMS = [
  "Campaign execution and optimization",
  "Email and LinkedIn outreach",
  "Reply handling and qualification",
  "Meeting booking and reporting",
] as const;

export function PricingSection() {
  const sectionRef = useRef<ElementRef<"section">>(null);
  useInViewReveal(sectionRef);

  return (
    <Section
      ref={sectionRef}
      id="pricing"
      className="pricing section"
      aria-labelledby="pricing-headline"
    >
      <div className="container">
        <div className="pricing__inner">
          <p className="section__title animate-in">Pricing</p>
          <h2 id="pricing-headline" className="pricing__headline animate-in animate-in--delay-1">
            Custom engagement, built around your market
          </h2>
          <p className="pricing__lead animate-in animate-in--delay-2">
            Every company is different, so pricing is scoped after a short consultation. We apply a
            proven outbound system to your market, ICP, and growth goals.
          </p>

          <div className="pricing__structure animate-in animate-in--delay-3">
            <div className="pricing__phase">
              <p className="pricing__phase-label">Setup</p>
              <p className="pricing__phase-sub">
                One-time investment to build your outbound foundation.
              </p>
              <ul className="pricing__phase-list">
                {SETUP_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="pricing__phase">
              <p className="pricing__phase-label">Monthly</p>
              <p className="pricing__phase-sub">
                Ongoing execution, optimization, and meeting delivery.
              </p>
              <ul className="pricing__phase-list">
                {MONTHLY_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pricing__statement animate-in">
            <p className="pricing__statement-label">No packages. No per-meeting fees.</p>
            <p className="pricing__statement-sub">
              Scope and pricing defined after consultation — shaped by your market reality.
            </p>
          </div>

          <p className="pricing__factors-title animate-in">What pricing depends on</p>
          <ul className="pricing__factors animate-in animate-in--delay-1" role="list">
            {FACTORS.map((label) => (
              <li key={label} className="pricing__factor">
                {label}
              </li>
            ))}
          </ul>
          <div className="pricing__cta-wrap animate-in animate-in--delay-2">
            <Button href={CTA_HREF} variant="primary" size="lg">
              Book Free Consultation
            </Button>
            <p className="pricing__trust">
              We&apos;ll review your market, define scope, and recommend the right setup.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
