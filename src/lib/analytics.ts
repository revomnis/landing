export const GA_ID = "G-EJK57Z31PY";

const STORAGE_KEY = "revomnis_ga_consent";

let loaded = false;

export function getConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "granted" || v === "denied") return v;
  } catch {
    /* private browsing / storage disabled */
  }
  return null;
}

export function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* noop */
  }
}

export function loadGA() {
  if (loaded) return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }

  gtag("js", new Date());
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("config", GA_ID);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
