import { useEffect } from "react";

function isInViewport(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

function shouldSkip(el: Element) {
  return Boolean((el as HTMLElement).closest("#pricing"));
}

/**
 * Reveals `.animate-in` elements when they enter the viewport.
 * Skips nodes inside `#pricing` — that section uses `.pricing.is-visible` + CSS instead.
 * Immediately reveals anything already on screen (avoids blank first paint / StrictMode races).
 * Also watches for late-mounted nodes (e.g. async knowledge feed list).
 */
export function useAnimateInOnView() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const reveal = (target: Element) => {
      target.classList.add("is-visible");
    };

    if (!("IntersectionObserver" in window)) {
      const revealAll = () => {
        document.querySelectorAll(".animate-in").forEach((el) => {
          if (!shouldSkip(el)) reveal(el);
        });
      };
      revealAll();
      const mutationObserver = new MutationObserver(revealAll);
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
      return () => mutationObserver.disconnect();
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

    const track = (el: Element) => {
      if (observed.has(el) || shouldSkip(el)) return;
      if (el.classList.contains("is-visible")) {
        observed.add(el);
        return;
      }
      observed.add(el);
      if (isInViewport(el)) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    };

    const scan = () => {
      document.querySelectorAll(".animate-in").forEach(track);
    };

    scan();

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.classList.contains("animate-in")) track(node);
          node.querySelectorAll?.(".animate-in").forEach(track);
        });
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
