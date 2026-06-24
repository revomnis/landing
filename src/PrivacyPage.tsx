export function PrivacyPage() {
  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="logo" href="/">
            Revomnis
          </a>
        </div>
      </header>

      <main className="privacy">
        <div className="container privacy__inner">
          <h1 className="privacy__title">Privacy Policy</h1>
          <p className="privacy__updated">Last updated: June 24, 2026</p>

          <section className="privacy__section">
            <h2>Who we are</h2>
            <p>
              Revomnis ("we", "us", "our") operates the website{" "}
              <strong>revomnis.com</strong>. This privacy policy explains how we
              collect, use, and protect information when you visit our website or
              submit a consultation request.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Information we collect</h2>

            <h3>Contact form submissions</h3>
            <p>
              When you submit the consultation form, we collect the information
              you provide: your name, work email address, company website URL,
              and message. We use this information solely to evaluate fit,
              respond to your inquiry, and follow up regarding our services.
            </p>

            <h3>Analytics data (Google Analytics 4)</h3>
            <p>
              If you accept analytics cookies via the consent banner, we use
              Google Analytics 4 (measurement ID: G-EJK57Z31PY) to collect
              anonymized usage data such as pages visited, time on site, browser
              type, device type, and approximate geographic region. This data
              helps us understand how visitors use the site so we can improve it.
            </p>
            <p>
              Google Analytics uses cookies stored on your device. Google may
              process this data on servers located outside your country. For
              details, see{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google's Privacy Policy
              </a>
              .
            </p>

            <h3>Google Fonts</h3>
            <p>
              This site loads typefaces from Google Fonts. When the page loads,
              your browser makes a request to Google's servers, which may expose
              your IP address to Google. See{" "}
              <a
                href="https://developers.google.com/fonts/faq/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Fonts privacy information
              </a>
              .
            </p>
          </section>

          <section className="privacy__section">
            <h2>How we use your information</h2>
            <ul>
              <li>To respond to your consultation request</li>
              <li>To evaluate whether our services are a fit for your needs</li>
              <li>
                To understand site usage and improve the website (analytics)
              </li>
            </ul>
            <p>
              We do not sell, rent, or share your personal information with third
              parties for their marketing purposes.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Cookies and consent</h2>
            <p>
              Analytics cookies are <strong>not</strong> loaded unless you click
              "Accept" on the cookie consent banner. If you decline, no analytics
              cookies are set and Google Analytics does not run.
            </p>
            <p>
              You can change your preference at any time by clearing your
              browser's local storage for this site, which will cause the consent
              banner to reappear on your next visit.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Third-party processors</h2>
            <ul>
              <li>
                <strong>Google LLC</strong> — Google Analytics 4 (analytics
                cookies, usage data) and Google Fonts (IP address for font
                delivery)
              </li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>Data retention</h2>
            <ul>
              <li>
                <strong>Contact form data</strong> — retained for the duration of
                the business relationship or inquiry, then deleted
              </li>
              <li>
                <strong>Analytics data</strong> — retained per Google Analytics
                default retention settings (14 months)
              </li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>Your rights</h2>

            <h3>European Economic Area and United Kingdom (GDPR)</h3>
            <p>
              If you are located in the EEA or UK, you have the right to access,
              correct, delete, or restrict processing of your personal data. You
              may also withdraw consent at any time. To exercise any of these
              rights, contact us at the address below.
            </p>

            <h3>California (CCPA / CPRA)</h3>
            <p>
              If you are a California resident, you have the right to know what
              personal information we collect, request its deletion, and opt out
              of the sale or sharing of personal information. We do not sell or
              share personal information as defined by the CCPA.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Contact</h2>
            <p>
              For privacy-related questions or requests, email us at{" "}
              <a href="mailto:hello@revomnis.com">hello@revomnis.com</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <span className="logo logo--muted">Revomnis</span>
            <p className="site-footer__copy">
              &copy; Revomnis. All rights reserved.
            </p>
          </div>
          <div className="site-footer__contact">
            <a href="mailto:hello@revomnis.com">hello@revomnis.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
