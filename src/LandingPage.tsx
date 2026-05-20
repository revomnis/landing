import { useState } from "react";
import { Button } from "./components/Button";
import { ContactForm } from "./components/ContactForm";
import { PricingSection } from "./components/PricingSection";
import { ValueCard } from "./components/ValueCard";
import { CTA_HREF } from "./lib/constants";
import { SITE_MEDIA } from "./lib/siteMedia";
import { DELIVERABLES } from "./landing/deliverablesData";
import { DIFF_COLUMNS, DIFF_ROWS } from "./landing/differentiationData";
import { FAQ_ITEMS } from "./landing/faqData";
import { Hero } from "./landing/Hero";
import { RevomnisEngine } from "./landing/RevomnisEngine";
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

        <section className="diff section" aria-labelledby="diff-heading">
          <div className="container">
            <h2 id="diff-heading" className="section__title animate-in">
              Not another lead-gen agency.
            </h2>
            <div className="diff__lede animate-in animate-in--delay-1">
              <p className="diff__lede-line">
                Most outbound vendors sell fragments: lists, sequences, SDR activity, or reports.
              </p>
              <p className="diff__lede-line">
                Revomnis operates the full outbound engine, from audience definition to
                qualified meetings and visible campaign insight.
              </p>
            </div>

            <div className="diff__table-wrap animate-in animate-in--delay-2">
              <table className="diff__table">
                <thead>
                  <tr>
                    <th className="diff__corner" scope="col">
                      <span className="visually-hidden">Comparison area</span>
                    </th>
                    {DIFF_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className={`diff__col-header${col.key === "revomnis" ? " diff__col-header--rev" : ""}`}
                      >
                        <span className="diff__col-name">{col.label}</span>
                        <span className="diff__col-desc">{col.description}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DIFF_ROWS.map((row) => (
                    <tr key={row.label} className="diff__row">
                      <th scope="row" className="diff__row-label">{row.label}</th>
                      <td className="diff__cell">{row.diy}</td>
                      <td className="diff__cell">{row.generic}</td>
                      <td className="diff__cell diff__cell--rev">{row.revomnis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="diff__closing animate-in animate-in--delay-3">
              Revomnis is built for teams that want outbound working without assembling
              the machinery themselves.
            </p>
          </div>
        </section>

        <section className="breaks section" aria-labelledby="breaks-heading">
          <div className="container">
            <h2 id="breaks-heading" className="section__title animate-in">
              Where outbound usually breaks
            </h2>
            <p className="breaks__lede animate-in animate-in--delay-1">
              Poor meetings usually start before anyone reaches the calendar.
              They come from weak targeting, disconnected channels, unmanaged
              replies, and reporting that shows activity without explaining what
              it means.
            </p>
            <div className="breaks__grid">

              {/* Card 1: Wrong audience */}
              <article className="bc animate-in animate-in--delay-1">
                <div className="bc__vis" aria-hidden="true">
                  <div className="bc__vis-bar">
                    <span className="bc__vis-label">Segment review</span>
                    <span className="bc__vis-status">Reviewing fit</span>
                  </div>
                  <div className="bc__vis-body">
                    <div className="bc-seg__target">
                      Target segment: <strong>Founder-led B2B services</strong>
                    </div>
                    <table className="bc-seg__table">
                      <thead>
                        <tr>
                          <th className="bc-seg__th">Name</th>
                          <th className="bc-seg__th">Role</th>
                          <th className="bc-seg__th bc-seg__th--end">Fit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bc-seg__tr">
                          <td className="bc-seg__td"><span className="bc-seg__name">M. Carter</span></td>
                          <td className="bc-seg__td"><span className="bc-seg__role">Founder</span></td>
                          <td className="bc-seg__td bc-seg__td--end"><span className="bc-chip bc-chip--green">High fit</span></td>
                        </tr>
                        <tr className="bc-seg__tr bc-seg__tr--review">
                          <td className="bc-seg__td"><span className="bc-seg__name">J. Reed</span></td>
                          <td className="bc-seg__td"><span className="bc-seg__role">VP Sales</span></td>
                          <td className="bc-seg__td bc-seg__td--end">
                            <span className="bc-seg__swap">
                              <span className="bc-chip bc-chip--amber bc-seg__swap-out">Needs review</span>
                              <span className="bc-chip bc-chip--gray bc-seg__swap-in">Excluded</span>
                            </span>
                          </td>
                        </tr>
                        <tr className="bc-seg__tr bc-seg__tr--excluded">
                          <td className="bc-seg__td"><span className="bc-seg__name">S. Novak</span></td>
                          <td className="bc-seg__td"><span className="bc-seg__role">Operations</span></td>
                          <td className="bc-seg__td bc-seg__td--end"><span className="bc-chip bc-chip--gray">Excluded</span></td>
                        </tr>
                        <tr className="bc-seg__tr">
                          <td className="bc-seg__td"><span className="bc-seg__name">A. Keller</span></td>
                          <td className="bc-seg__td"><span className="bc-seg__role">Agency owner</span></td>
                          <td className="bc-seg__td bc-seg__td--end"><span className="bc-chip bc-chip--green">High fit</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bc__vis-note bc-seg__note--anim">Low-fit contacts removed before launch</div>
                </div>
                <h3 className="bc__title">The wrong audience gets targeted</h3>
                <p className="bc__copy">
                  Weak ICP logic turns every contact into a prospect, even when
                  fit signals are missing.
                </p>
              </article>

              {/* Card 2: Fragmented buyer experience */}
              <article className="bc animate-in animate-in--delay-2">
                <div className="bc__vis" aria-hidden="true">
                  <div className="bc__vis-body">
                    <div className="bc-ch">
                      <div className="bc-ch__header">Campaign channels</div>

                      <div className="bc-ch__block">
                        <div className="bc-ch__row">
                          <div className="bc-ch__icon bc-ch__icon--email">
                            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4A1.5 1.5 0 0 0 1 5.5v.7l9 4.5 9-4.5v-.7A1.5 1.5 0 0 0 17.5 4h-15ZM19 7.3l-9 4.5-9-4.5V14.5A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5V7.3Z"/></svg>
                          </div>
                          <div className="bc-ch__info">
                            <div className="bc-ch__name">Email</div>
                            <div className="bc-ch__sub">Active channel</div>
                          </div>
                          <div className="bc-ch__toggle bc-ch__toggle--on">
                            <div className="bc-ch__toggle-knob" />
                          </div>
                        </div>
                        <div className="bc-ch__steps">
                          <div className="bc-ch__step bc-ch__step--active">Email 1 sent</div>
                          <div className="bc-ch__step bc-ch__step--active">Email 2 sent</div>
                          <div className="bc-ch__step bc-ch__step--queued">Email 3 queued</div>
                        </div>
                      </div>

                      <div className="bc-ch__block bc-ch__block--off">
                        <div className="bc-ch__row">
                          <div className="bc-ch__icon bc-ch__icon--li">
                            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.07 7.04H2.03v10.04h3.04V7.04Zm.2-2.87a1.57 1.57 0 0 0-1.58-1.58c-.88 0-1.58.7-1.58 1.58 0 .87.7 1.57 1.58 1.57.87 0 1.57-.7 1.57-1.57Zm5.3 2.6c0 0-0.03.27-0.03.27H7.56V7.04h2.93v1.37s.87-1.67 3.03-1.67c2.17 0 3.79 1.32 3.79 4.06v6.28h-3.04V11.5c0-1.55-.73-2.33-1.86-2.33-1.33 0-2.04 1.01-2.04 2.56v5.35H7.56V7.04"/></svg>
                          </div>
                          <div className="bc-ch__info">
                            <div className="bc-ch__name">LinkedIn</div>
                            <div className="bc-ch__sub">Channel inactive</div>
                          </div>
                          <div className="bc-ch__toggle bc-ch__toggle--off">
                            <div className="bc-ch__toggle-knob" />
                          </div>
                        </div>
                        <div className="bc-ch__steps">
                          <div className="bc-ch__step bc-ch__step--off">Connection request</div>
                          <div className="bc-ch__step bc-ch__step--off">Post like</div>
                          <div className="bc-ch__step bc-ch__step--off">Message</div>
                        </div>
                      </div>

                      <div className="bc-ch__note">LinkedIn is inactive while email follow-ups continue.</div>
                    </div>
                  </div>
                </div>
                <h3 className="bc__title">The buyer experience becomes fragmented</h3>
                <p className="bc__copy">
                  Email, LinkedIn, and follow-up activity happen separately, so
                  outreach feels random.
                </p>
              </article>

              {/* Card 3: Lost intent */}
              <article className="bc animate-in animate-in--delay-1">
                <div className="bc__vis" aria-hidden="true">
                  <div className="bc__vis-bar">
                    <span className="bc__vis-label">Reply queue</span>
                    <span className="bc__vis-status">3 open replies</span>
                  </div>
                  <div className="bc__vis-body">
                    <div className="bc-inbox__list">
                      <div className="bc-inbox__row">
                        <span className="bc-inbox__avatar">J</span>
                        <div className="bc-inbox__body">
                          <span className="bc-inbox__sender">J. Martinez</span>
                          <span className="bc-inbox__msg">Interested, can you send details?</span>
                        </div>
                        <div className="bc-inbox__meta">
                          <span className="bc-inbox__time bc-inbox__time--pulse">42h</span>
                          <span className="bc-chip bc-chip--amber">Needs response</span>
                        </div>
                      </div>
                      <div className="bc-inbox__row">
                        <span className="bc-inbox__avatar">S</span>
                        <div className="bc-inbox__body">
                          <span className="bc-inbox__sender">S. Chen</span>
                          <span className="bc-inbox__msg">Not now, follow up in Q2.</span>
                        </div>
                        <div className="bc-inbox__meta">
                          <span className="bc-chip bc-chip--amber">Follow-up due</span>
                        </div>
                      </div>
                      <div className="bc-inbox__row">
                        <span className="bc-inbox__avatar">A</span>
                        <div className="bc-inbox__body">
                          <span className="bc-inbox__sender">A. Novak</span>
                          <span className="bc-inbox__msg">Can you send pricing?</span>
                        </div>
                        <div className="bc-inbox__meta">
                          <span className="bc-chip bc-chip--green">Needs qualification</span>
                        </div>
                      </div>
                      <div className="bc-inbox__row bc-inbox__row--cycle">
                        <span className="bc-inbox__avatar">M</span>
                        <div className="bc-inbox__body">
                          <span className="bc-inbox__sender">M. Carter</span>
                          <span className="bc-inbox__msg">Worth a look. What does setup involve?</span>
                        </div>
                        <div className="bc-inbox__meta">
                          <span className="bc-chip bc-chip--amber">Needs response</span>
                        </div>
                      </div>
                    </div>
                    <div className="bc-inbox__insight">
                      <span className="bc-inbox__insight-dot" />
                      Positive reply waiting for next step
                    </div>
                  </div>
                </div>
                <h3 className="bc__title">Real intent gets lost</h3>
                <p className="bc__copy">
                  Interested replies stall, objections go unanswered, and
                  qualification becomes inconsistent.
                </p>
              </article>

              {/* Card 4: Revomnis resolution (dark) */}
              <article className="bc bc--dark animate-in animate-in--delay-2">
                <div className="bc__vis" aria-hidden="true">
                  <div className="bc__vis-body">
                    <div className="bc-rpt">
                      <div className="bc-rpt__row bc-rpt__row--anim">
                        <div className="bc-rpt__row-label">Active campaign</div>
                        <div className="bc-rpt__row-main">Founder-led B2B services</div>
                        <div className="bc-rpt__row-sub">Email + LinkedIn coordinated</div>
                      </div>
                      <div className="bc-rpt__row bc-rpt__row--anim">
                        <div className="bc-rpt__row-label">Managed infrastructure</div>
                        <div className="bc-rpt__row-main">4 domains / 16 inboxes active</div>
                        <div className="bc-rpt__row-sub">Client-branded sending layer</div>
                      </div>
                      <div className="bc-rpt__row bc-rpt__row--anim">
                        <div className="bc-rpt__row-label">Reply movement</div>
                        <div className="bc-rpt__metrics">
                          <div className="bc-rpt__metric">
                            <span className="bc-rpt__metric-val">18</span>
                            <span className="bc-rpt__metric-label">classified</span>
                          </div>
                          <div className="bc-rpt__metric">
                            <span className="bc-rpt__metric-val">7</span>
                            <span className="bc-rpt__metric-label">qualified</span>
                          </div>
                          <div className="bc-rpt__metric">
                            <span className="bc-rpt__metric-val">4</span>
                            <span className="bc-rpt__metric-label">booked</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="bc__title">Revomnis brings the system together</h3>
                <p className="bc__copy">
                  The moving parts become one managed outbound engine.
                </p>
                <p className="bc__sub">
                  Audience, channels, infrastructure, replies, and visibility
                  operate as one system.
                </p>
              </article>

            </div>
          </div>
        </section>

        <RevomnisEngine />

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
