import { useEffect } from "react";

/** Reveal-on-scroll: fades/slides in every `.reveal` element currently in the
 * document, once, the first time it scrolls into view. Re-run on route
 * change (pass [pathname]) since navigating swaps the page's DOM. */
export function useReveal(deps: unknown[]) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
