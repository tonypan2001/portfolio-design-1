"use client";

import { useEffect, useRef } from "react";
import { section } from "@/constants/contents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function FeedbackSection() {
  const base = section.feedbackSection?.testimonials ?? [];
  const items = [...base, ...base]; // duplicate for seamless loop

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const oneSetWidthRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const speedRef = useRef(0.5); // px per frame (~30px/s @60fps)

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const measure = () => {
      // Since items are duplicated exactly twice
      oneSetWidthRef.current = track.scrollWidth / 2;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);

    const step = () => {
      if (!draggingRef.current) {
        offsetRef.current -= speedRef.current;
      }
      const w = oneSetWidthRef.current;
      if (w > 0) {
        // Wrap seamlessly when one set has fully scrolled
        if (offsetRef.current <= -w) offsetRef.current += w;
        if (offsetRef.current >= 0) offsetRef.current -= w; // keep negative range for stability
      }
      track.style.transform = `translateX(${offsetRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      startXRef.current = e.clientX;
      startOffsetRef.current = offsetRef.current;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("cursor-grabbing");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      offsetRef.current = startOffsetRef.current + dx;
    };
    const onPointerUp = (e: PointerEvent) => {
      draggingRef.current = false;
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {}
      viewport.classList.remove("cursor-grabbing");
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <section
      id="feedback"
      data-fv
      className="scroll-section relative min-h-screen flex items-center justify-center bg-background"
    >
      {/* Decorative waves */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/wave.svg"
          alt=""
          className="absolute inset-x-0 top-0 w-full h-40 md:h-48 object-cover select-none"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/wave-bottom.svg"
          alt=""
          className="absolute inset-x-0 bottom-0 w-full h-40 md:h-56 object-cover select-none"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="container px-4 relative z-10">
        <h2 className="fv-item text-4xl md:text-5xl font-bold text-center text-foreground">
          {section.feedbackSection.title}
        </h2>
        <p className="fv-item text-center mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground">
          Real words from teams we partnered with.
        </p>

        {/* Carousel */}
        <div
          ref={viewportRef}
          className="mt-8 md:mt-12 max-w-6xl mx-auto overflow-hidden select-none cursor-grab"
        >
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-6 will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {items.map((t, idx) => (
              <Card
                key={`${t.name}-${idx}`}
                className="min-w-[280px] md:min-w-[360px] w-[360px] shrink-0 backdrop-blur-sm bg-card/80 border-border/60 hover:shadow-lg transition-transform duration-300 ease-out hover:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 md:hover:-translate-y-2"
              >
                <CardHeader className="items-center text-center">
                  <img
                    src={t.avatar}
                    alt={`${t.name} avatar`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-border/60"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <CardTitle className="mt-3 text-lg md:text-xl">{t.name}</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    {t.role} • {t.company}
                  </CardDescription>
                  <div className="mt-2 flex items-center gap-1" aria-label={`Rating ${t.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < (t.rating || 0)
                            ? "w-4 h-4 text-foreground"
                            : "w-4 h-4 text-muted-foreground"
                        }
                        fill={i < (t.rating || 0) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-center text-sm md:text-base text-muted-foreground italic">
                    “{t.quote}”
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
