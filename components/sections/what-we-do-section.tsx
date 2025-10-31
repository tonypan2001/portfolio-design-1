import { section } from "@/constants/contents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, MonitorSmartphone, Cloud } from "lucide-react";

export function WhatWeDoSection() {
  const items = section.whatWeDoSection?.items ?? [];

  return (
    <section
      id="what-we-do"
      data-fv
      className="scroll-section relative min-h-screen flex items-center justify-center bg-background mb-8 md:mb-0"
    >
      {/* Decorative wave at the top (full-width image) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/wave.svg"
          alt=""
          className="absolute inset-x-0 top-0 w-full h-40 md:h-48 object-cover select-none"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 top-0 h-40 md:h-48" />
      </div>
      <div className="container relative z-10 px-4 pt-16 md:pt-24 mt-24">
        <h2 className="fv-item text-4xl md:text-5xl font-bold text-center text-foreground">
          {section.whatWeDoSection.title}
        </h2>
        <p className="fv-item text-center mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground">
          We help you ship delightful, performant products end‑to‑end.
        </p>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto items-stretch justify-items-stretch">
          {items.map((it) => {
            const title = it.title.toLowerCase();
            const Icon = title.includes("responsive")
              ? MonitorSmartphone
              : title.includes("deploy") || title.includes("hosting")
                ? Cloud
                : Globe; // default for Create Website
            return (
              <Card
                key={it.title}
                className="fv-item group relative overflow-hidden w-full backdrop-blur-sm bg-card/80 border-border/60 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg"
              >
                {/* Hover background image layer */}
                {it.imageUrl ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10"
                  >
                    <div
                      className="absolute inset-0 bg-center bg-cover opacity-10 group-hover:opacity-30 transition-opacity duration-500 will-change-opacity"
                      style={{ backgroundImage: `url(${it.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : null}
                <CardHeader className="items-center text-center">
                  <CardTitle className="text-xl md:text-2xl">
                    {it.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base max-w-prose">
                    {it.detail}
                  </CardDescription>
                </CardHeader>
                {/* Icon after header */}
                <div className="flex justify-center -mt-2 mb-2">
                  <Icon className="w-12 h-12 text-foreground/80" />
                </div>
                <CardContent className="text-center">
                  {/* Room for future bullets or links */}
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* About subsection merged under What We Do (no header) */}
        <div id="about" className="mt-12 md:mt-16">
          <p className="fv-item text-center max-w-2xl mx-auto text-muted-foreground">
            {section.aboutSection.content}
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {section.aboutSection.tools.map((t) => (
              <li
                key={t}
                className="fv-item px-3 py-1 rounded-full bg-primary/5 text-foreground/80 text-sm ring-1 ring-primary/10 transition-transform duration-200 ease-out hover:scale-105 hover:bg-primary/10 hover:ring-primary/20 hover:shadow-sm active:scale-95"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
            {section.aboutSection.stats.map((x) => (
              <div key={x.label} className="fv-item">
                <div className="text-3xl font-semibold tabular-nums text-foreground">
                  {x.value}
                </div>
                <div className="text-muted-foreground text-sm">{x.label}</div>
              </div>
            ))}
          </div>
          <blockquote className="fv-item mt-8 text-center text-muted-foreground italic">
            {section.aboutSection.quote}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
