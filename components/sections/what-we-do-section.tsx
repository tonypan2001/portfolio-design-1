import { section } from "@/constants/contents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MonitorSmartphone, Cloud } from "lucide-react";

export function WhatWeDoSection() {
  const items = section.whatWeDoSection?.items ?? [];

  return (
    <section
      id="what-we-do"
      data-fv
      className="scroll-section relative min-h-screen flex items-center justify-center bg-background mb-8 md:mb-0"
    >
      <div className="container px-4">
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
                  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                    <div
                      className="absolute inset-0 bg-center bg-cover opacity-10 group-hover:opacity-30 transition-opacity duration-500 will-change-opacity"
                      style={{ backgroundImage: `url(${it.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : null}
                <CardHeader className="items-center text-center">
                  <CardTitle className="text-xl md:text-2xl">{it.title}</CardTitle>
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
      </div>
    </section>
  );
}
