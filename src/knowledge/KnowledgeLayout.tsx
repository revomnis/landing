import { useState, type ReactNode } from "react";
import { Button } from "../components/Button";
import { CookieBanner } from "../components/CookieBanner";
import { CTA_HREF } from "../lib/constants";

type KnowledgeLayoutProps = {
  children: ReactNode;
  /** When true, consultation CTA points at homepage anchor. */
  ctaToHome?: boolean;
};

export function KnowledgeLayout({
  children,
  ctaToHome = false,
}: KnowledgeLayoutProps) {
  const [navOpen, setNavOpen] = useState(false);
  const ctaHref = ctaToHome ? `/${CTA_HREF}` : CTA_HREF;

  return (
    <div className="knowledge">
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="logo" href="/">
            Revomnis
          </a>
          <nav className={`site-header__nav${navOpen ? " is-open" : ""}`}>
            <ul className="site-header__nav-list">
              <li>
                <a
                  className="site-header__nav-link"
                  href="/#how-it-works"
                  onClick={() => setNavOpen(false)}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  className="site-header__nav-link"
                  href="/#pricing"
                  onClick={() => setNavOpen(false)}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  className="site-header__nav-link"
                  href="/#faq"
                  onClick={() => setNavOpen(false)}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  className="site-header__nav-link"
                  href="/knowledge"
                  onClick={() => setNavOpen(false)}
                >
                  Knowledge
                </a>
              </li>
            </ul>
          </nav>
          <Button href={ctaHref} variant="ghost" size="sm">
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

      {children}

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <span className="logo logo--muted">Revomnis</span>
            <p className="site-footer__copy">
              &copy; Revomnis. All rights reserved.
            </p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <a href="/#how-it-works">How It Works</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#faq">FAQ</a>
            <a href="/knowledge">Knowledge</a>
            <a href="/#consultation">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </nav>
          <div className="site-footer__contact">
            <a href="mailto:hello@revomnis.com">hello@revomnis.com</a>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
