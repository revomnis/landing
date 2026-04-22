import { useEffect } from "react";

function isInViewport(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

/**
 * Reveals `.animate-in` elements when they enter the viewport.
 * Skips nodes inside `#pricing` — that section uses `.pricing.is-visible` + CSS instead.
 * Immediately reveals anything already on screen (avoids blank first paint / StrictMode races).
 */
export function useAnimateInOnView() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".animate-in")).filter(
      (el) => !(el as HTMLElement).closest("#pricing")
    );

    if (!elements.length) return;

    const reveal = (target: Element) => {
      target.classList.add("is-visible");
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.01 }
    );

    elements.forEach((el) => {
      if (isInViewport(el)) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);
}
