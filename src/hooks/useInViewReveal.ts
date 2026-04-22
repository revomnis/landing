import { useEffect, type RefObject } from "react";

export function useInViewReveal<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mark = () => {
      el.classList.add("is-visible");
    };

    if (!("IntersectionObserver" in window)) {
      mark();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mark();
            obs.unobserve(el);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.01 }
    );

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      mark();
    } else {
      obs.observe(el);
    }
    return () => obs.disconnect();
  }, [ref]);
}
