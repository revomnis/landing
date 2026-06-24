import { useEffect, useState } from "react";
import { getConsent, setConsent, loadGA } from "../lib/analytics";
import "./CookieBanner.css";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "granted") {
      loadGA();
      return;
    }
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setConsent("granted");
    setVisible(false);
    loadGA();
  }

  function decline() {
    setConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p className="cookie-banner__text">
        We use cookies for analytics to improve this site.{" "}
        <a href="/privacy" className="cookie-banner__link">
          Privacy Policy
        </a>
      </p>
      <div className="cookie-banner__actions">
        <button
          type="button"
          className="btn btn--primary btn--sm cookie-banner__btn"
          onClick={accept}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm cookie-banner__btn"
          onClick={decline}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
