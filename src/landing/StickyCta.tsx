import { useEffect, useState } from "react";
import { CTA_HREF } from "../lib/constants";

const MOBILE_QUERY = "(max-width: 959px)";

type Zone = "heroCta" | "pricing" | "consultation";

/**
 * Mobile-only sticky CTA that continues the Hero CTA after it scrolls away.
 * Visible only when the viewport is mobile and none of the Hero CTA group,
 * Pricing section, or final Consultation/Form section are intersecting.
 * Defaults to hidden when IntersectionObserver is unavailable.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setVisible(false);
      return;
    }

    const heroCta = document.getElementById("hero-cta");
    const pricing = document.getElementById("pricing");
    const consultation = document.getElementById("consultation");

    // Assume the Hero CTA is on screen at load so the sticky CTA stays hidden
    // until the observers report otherwise.
    const state: Record<Zone, boolean> = {
      heroCta: true,
      pricing: false,
      consultation: false,
    };

    const mql = window.matchMedia(MOBILE_QUERY);

    const update = () => {
      setVisible(
        mql.matches && !state.heroCta && !state.pricing && !state.consultation,
      );
    };

    const makeObserver = (key: Zone) =>
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            state[key] = entry.isIntersecting;
          }
          update();
        },
        { threshold: 0 },
      );

    const observers: IntersectionObserver[] = [];

    if (heroCta) {
      const observer = makeObserver("heroCta");
      observer.observe(heroCta);
      observers.push(observer);
    } else {
      // No Hero CTA to gate on; treat it as off-screen.
      state.heroCta = false;
    }

    if (pricing) {
      const observer = makeObserver("pricing");
      observer.observe(pricing);
      observers.push(observer);
    }

    if (consultation) {
      const observer = makeObserver("consultation");
      observer.observe(consultation);
      observers.push(observer);
    }

    const onMediaChange = () => update();
    mql.addEventListener("change", onMediaChange);

    update();

    return () => {
      observers.forEach((observer) => observer.disconnect());
      mql.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <a
      className={`mobile-sticky-cta${visible ? " is-visible" : ""}`}
      href={CTA_HREF}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
    >
      Book a Free Consultation
    </a>
  );
}
