import { useState } from "react";
import { Button } from "./components/Button";
import { ContactForm } from "./components/ContactForm";
import { PricingSection } from "./components/PricingSection";
import { ValueCard } from "./components/ValueCard";
import { CTA_HREF } from "./lib/constants";
import { SITE_MEDIA } from "./lib/siteMedia";
import { DELIVERABLES } from "./landing/deliverablesData";
import { DIFFERENTIATION_ITEMS } from "./landing/differentiationData";
import { FAQ_ITEMS } from "./landing/faqData";
import { Hero } from "./landing/Hero";
import { PROCESS_STEPS } from "./landing/processData";
import { SIGNAL_ITEMS } from "./landing/signalsData";
import { VALUE_CARDS } from "./landing/valueData";

const delayClass = (i: number) => {
  if (i === 1) return "animate-in--delay-1";
  if (i === 2) return "animate-in--delay-2";
  if (i === 3) return "animate-in--delay-3";
  return "";
};

const NAV_LINKS = [
  { label: "How It Works", href: "#process" },
  { label: "Why Revomnis", href: "#value" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="logo" href="#">
            Revomnis
          </a>
          <nav className={`site-header__nav${navOpen ? " is-open" : ""}`}>
            <ul className="site-header__nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className="site-header__nav-link"
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={CTA_HREF} variant="ghost" size="sm">
            Book a Free Consultation
          </Button>
          <button
            type="button"
            className="site-header__hamburger"
            aria-label="Toggle navigation"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span className="site-header__hamburger-bar" />
            <span className="site-header__hamburger-bar" />
            <span className="site-header__hamburger-bar" />
          </button>
        </div>
      </header>

      <main>
        <Hero />

        <section className="diff section section--tight" aria-labelledby="diff-heading">
          <div className="container">
            <h2 id="diff-heading" className="section__title animate-in">
              Not another lead gen agency
            </h2>
            <p className="diff__lede animate-in animate-in--delay-1">
              Most outbound vendors sell fragments. Revomnis delivers a managed system.
            </p>
            <div className="diff__grid animate-in animate-in--delay-2">
              <div className="diff__header">
                <span className="diff__col-label">What others sell</span>
                <span className="diff__col-label">What Revomnis delivers</span>
              </div>
              {DIFFERENTIATION_ITEMS.map((item) => (
                <div key={item.others} className="diff__row">
                  <span className="diff__others">{item.others}</span>
                  <span className="diff__ours">{item.revomnis}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="process section" aria-labelledby="process-heading">
          <div className="container">
            <header className="process__header animate-in">
              <h2 id="process-heading" className="section__title">
                How it works
              </h2>
              <p className="process__lede">
                Each step names a common outbound pain — and how Revomnis removes it with a system,
                not ad-hoc tasks.
              </p>
            </header>
            <ol className="process__list">
              {PROCESS_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className={`process__step animate-in ${delayClass(index % 4)}`}
                >
                  <span className="process__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="process__body">
                    <h3 className="process__title">{step.title}</h3>
                    <p className="process__pain">
                      <span className="process__tag">Pain</span>
                      {step.pain}
                    </p>
                    <p className="process__resolve">
                      <span className="process__tag process__tag--resolve">Revomnis</span>
                      {step.resolve}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <figure className="visual-break animate-in" aria-hidden="true">
          <img
            src={SITE_MEDIA.visualBreak}
            alt=""
            className="visual-break__img"
            width={1920}
            height={800}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <section id="value" className="value section" aria-labelledby="value-heading">
          <div className="container">
            <h2 id="value-heading" className="section__title animate-in">
              Why Revomnis
            </h2>
            <p className="value__intro animate-in animate-in--delay-1">
              Flip each switch to compare the friction you feel today with how we operate alongside
              your team.
            </p>
            <div className="value__cards">
              {VALUE_CARDS.map((card, index) => (
                <ValueCard
                  key={card.headline}
                  headline={card.headline}
                  friction={card.friction}
                  revomnis={card.revomnis}
                  accent={card.accent}
                  animateClass={`animate-in ${delayClass(index)}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="deliverables section" aria-labelledby="deliverables-heading">
          <div className="container">
            <h2 id="deliverables-heading" className="section__title animate-in">
              Everything included
            </h2>
            <p className="deliverables__lede animate-in animate-in--delay-1">
              Every engagement includes the full stack — from audience definition to booked meetings
              and reporting.
            </p>
            <div className="deliverables__grid">
              {DELIVERABLES.map((item, index) => (
                <div
                  key={item.title}
                  className={`deliverables__item animate-in ${delayClass(index % 4)}`}
                >
                  <h3 className="deliverables__item-title">{item.title}</h3>
                  <p className="deliverables__item-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="proof section" aria-labelledby="signals-heading">
          <div className="container">
            <h2 id="signals-heading" className="section__title animate-in">
              How we operate
            </h2>
            <p className="proof__lede animate-in animate-in--delay-1">
              Three principles that shape every Revomnis engagement — and the outcomes we optimize
              for.
            </p>
            <div className="proof__metrics animate-in animate-in--delay-2">
              {SIGNAL_ITEMS.map((item) => (
                <div key={item.kicker} className="proof__metric proof__metric--standard">
                  <span className="proof__metric-kicker">{item.kicker}</span>
                  <span className="proof__metric-label">{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection />

        <section id="faq" className="faq section" aria-labelledby="faq-heading">
          <div className="container narrow">
            <h2 id="faq-heading" className="section__title animate-in">
              FAQ
            </h2>
            <div className="faq__list">
              {FAQ_ITEMS.map((item, index) => (
                <article
                  key={item.q}
                  className={`faq__item animate-in ${delayClass(index % 4)}`}
                >
                  <h3 className="faq__question">{item.q}</h3>
                  <p className="faq__answer">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="consultation" className="final-cta section" aria-labelledby="final-heading">
          <div className="container final-cta__layout">
            <div className="final-cta__content">
              <h2 id="final-heading" className="final-cta__title animate-in">
                If your calendar isn&apos;t filling with the right prospects, we fix that.
              </h2>
              <p className="final-cta__sub animate-in animate-in--delay-1">
                Tell us about your market and goals — we reply within one business day.
              </p>
              <div className="animate-in animate-in--delay-2 final-cta__form-wrap">
                <ContactForm />
              </div>
            </div>
            <figure className="final-cta__figure animate-in animate-in--delay-2">
              <img
                src={SITE_MEDIA.ctaMeeting}
                alt="Business meeting"
                className="final-cta__img"
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <span className="logo logo--muted">Revomnis</span>
            <p className="site-footer__copy">&copy; Revomnis. All rights reserved.</p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <a href="#process">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#consultation">Contact</a>
          </nav>
          <div className="site-footer__contact">
            <a href="mailto:hello@revomnis.com">hello@revomnis.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
