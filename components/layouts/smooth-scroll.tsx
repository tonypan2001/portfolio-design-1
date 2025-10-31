"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const animRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // respect user preference

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const isWithinScrollable = (el: EventTarget | null): boolean => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body && node !== document.documentElement) {
        const style = window.getComputedStyle(node);
        const canScroll =
          (/(auto|scroll|overlay)/).test(style.overflowY) && node.scrollHeight > node.clientHeight;
        if (canScroll) return true;
        node = node.parentElement;
      }
      return false;
    };

    targetRef.current = window.scrollY;
    currentRef.current = window.scrollY;

    const step = () => {
      const c = currentRef.current;
      const t = targetRef.current;
      const diff = t - c;
      // ease factor: smaller is slower/smoother
      const eased = c + diff * 0.06;
      currentRef.current = eased;
      window.scrollTo(0, eased);
      if (Math.abs(diff) > 0.5) {
        animRef.current = requestAnimationFrame(step);
      } else {
        animRef.current = null;
        currentRef.current = t;
        window.scrollTo(0, t);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // let Ctrl+wheel (zoom) and trackpad pinch pass through
      if (e.ctrlKey) return;
      if (isWithinScrollable(e.target)) return; // let nested scroll areas work normally
      e.preventDefault();
      const delta = e.deltaY; // positive down, negative up
      const scale = 0.6; // dampen wheel distance for slower feel
      targetRef.current = clamp(targetRef.current + delta * scale, 0, maxScroll());
      if (!animRef.current) animRef.current = requestAnimationFrame(step);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable)
        return;
      if (isWithinScrollable(e.target)) return;

      let delta = 0;
      const page = window.innerHeight * 0.8;
      switch (e.key) {
        case "ArrowDown":
          delta = 40;
          break;
        case "ArrowUp":
          delta = -40;
          break;
        case "PageDown":
          delta = page;
          break;
        case "PageUp":
          delta = -page;
          break;
        case "Home":
          targetRef.current = 0;
          e.preventDefault();
          if (!animRef.current) animRef.current = requestAnimationFrame(step);
          return;
        case "End":
          targetRef.current = maxScroll();
          e.preventDefault();
          if (!animRef.current) animRef.current = requestAnimationFrame(step);
          return;
        case " ": // Space
          delta = e.shiftKey ? -page : page;
          break;
        default:
          return;
      }
      e.preventDefault();
      targetRef.current = clamp(targetRef.current + delta, 0, maxScroll());
      if (!animRef.current) animRef.current = requestAnimationFrame(step);
    };

    const onScroll = () => {
      // In case scroll is changed via keyboard, anchor link, or code
      const y = window.scrollY;
      targetRef.current = y;
      if (!animRef.current) currentRef.current = y;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      targetRef.current = clamp(targetRef.current, 0, maxScroll());
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("keydown", onKeyDown as any);
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize as any);
    };
  }, []);

  return null;
}
