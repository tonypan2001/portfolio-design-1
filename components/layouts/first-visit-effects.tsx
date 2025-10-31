"use client";

import { useEffect } from "react";

/**
 * On first visit only, animates elements per section as the user scrolls.
 * - Sections to animate must have `data-fv`.
 * - Elements inside that should animate must have `fv-item` class.
 * - Sections visible on initial load are shown immediately (no animation).
 */
export default function FirstVisitEffects() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      // Always enable scroll-triggered animations on each visit

      const b = document.body;

      const getSections = () =>
        Array.from(document.querySelectorAll<HTMLElement>("section[data-fv]"));

      const isInViewport = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      };

      const init = () => {
        const sections = getSections();
        if (sections.length === 0) return null;

        // Enable CSS first, then mark all as awaiting, and animate any visible ones
        b.classList.add("fv-active");

        // Set initial hidden state
        for (const s of sections) s.classList.add("fv-await");

        // Animate sections currently in view on next frame
        requestAnimationFrame(() => {
          for (const s of sections) {
            if (isInViewport(s)) {
              s.classList.add("fv-show");
              s.classList.remove("fv-await");
            }
          }
        });

        let lastY = window.scrollY;

        const onIntersect: IntersectionObserverCallback = (entries, obs) => {
          const nowY = window.scrollY;
          const scrollingDown = nowY >= lastY;
          lastY = nowY;
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const section = e.target as HTMLElement;
            // Only animate on downward scroll to match requirement
            if (scrollingDown) {
              section.classList.add("fv-show");
              section.classList.remove("fv-await");
              obs.unobserve(section);
            }
          }
        };

        const io = new IntersectionObserver(onIntersect, {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        });

        for (const s of sections) {
          if (!s.classList.contains("fv-show")) io.observe(s);
        }

        // Manual fallback on scroll/resize in case IO misses
        const checkManual = () => {
          document
            .querySelectorAll<HTMLElement>('section[data-fv].fv-await')
            .forEach((s) => {
              if (isInViewport(s)) {
                s.classList.add("fv-show");
                s.classList.remove("fv-await");
                io.unobserve(s);
              }
            });
        };

        window.addEventListener("scroll", checkManual, { passive: true });
        window.addEventListener("resize", checkManual);

        // Optional: when all are shown, remove the marker class
        const checkAllShown = () => {
          const pending = document.querySelector('section[data-fv].fv-await');
          if (!pending) {
            b.classList.remove("fv-active");
            window.removeEventListener("scroll", checkAllShown);
            window.removeEventListener("scroll", checkManual);
            window.removeEventListener("resize", checkManual);
          }
        };
        window.addEventListener("scroll", checkAllShown, { passive: true });
        // Also check once after setup (in case all sections are already visible)
        checkManual();
        checkAllShown();
        // Cleanup listener on unmount
        return () => {
          io.disconnect();
          window.removeEventListener("scroll", checkAllShown);
          window.removeEventListener("scroll", checkManual);
          window.removeEventListener("resize", checkManual);
        };
      };

      // Initialize when sections are present; observe DOM if needed
      const startWhenReady = () => {
        const cleanup = init();
        if (cleanup) return cleanup;

        // Sections not ready yet, observe for additions
        let done = false;
        const mo = new MutationObserver(() => {
          const cu = init();
          if (cu) {
            done = true;
            mo.disconnect();
          }
        });
        mo.observe(document.body, { childList: true, subtree: true });

        // Safety timeout to stop observing after a while
        const stopTimer = window.setTimeout(() => {
          if (!done) mo.disconnect();
        }, 5000);

        return () => {
          window.clearTimeout(stopTimer);
          mo.disconnect();
        };
      };

      let outerCleanup: (() => void) | undefined;
      const run = () => {
        outerCleanup = startWhenReady() || undefined;
      };

      if (document.readyState === "complete") {
        run();
      } else {
        const onLoad = () => {
          run();
          window.removeEventListener("load", onLoad);
        };
        window.addEventListener("load", onLoad, { once: true });
      }

      return () => {
        if (outerCleanup) outerCleanup();
      };
    } catch {
      // If storage is blocked, fail silently.
    }
  }, []);

  return null;
}
