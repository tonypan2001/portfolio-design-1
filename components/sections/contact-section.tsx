"use client";

import { section } from "@/constants/contents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const emailHref = `mailto:${section.contactSection.email}`;
  const platforms = section.contactSection.platform;

  const iconFor = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("github")) return Github;
    if (l.includes("twitter") || l.includes("x")) return Twitter;
    if (l.includes("linkedin")) return Linkedin;
    return undefined;
  };

  return (
    <section
      id="contact"
      className="scroll-section relative min-h-screen flex items-center justify-center bg-primary"
    >
      <div className="container px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white">
          {section.contactSection.title}
        </h2>
        <p className="text-center mt-4 max-w-2xl mx-auto text-white/80">
          {section.contactSection.content}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Email card */}
          <Card className="md:col-span-2 backdrop-blur-sm bg-card/80 border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl">Get in touch</CardTitle>
              <CardDescription>Prefer email? I’ll get back soon.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button asChild className="w-full sm:w-auto">
                <a href={emailHref}>
                  <Mail className="mr-2 h-4 w-4" />
                  {section.contactSection.email}
                </a>
              </Button>
              <span className="text-xs text-muted-foreground">or connect on</span>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => {
                  const Icon = iconFor(p.label);
                  const isDisabled = !p.href;
                  return (
                    <Button
                      key={p.label}
                      variant="outline"
                      asChild={!isDisabled}
                      className={cn("gap-2", isDisabled && "pointer-events-none opacity-50")}
                    >
                      {isDisabled ? (
                        <span className="inline-flex items-center">
                          {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                          {p.label}
                        </span>
                      ) : (
                        <a href={p.href!} target="_blank" rel="noopener noreferrer">
                          {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                          {p.label}
                        </a>
                      )}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick blurb card */}
          <Card className="backdrop-blur-sm bg-card/80 border-border/60">
            <CardHeader>
              <CardTitle className="text-xl">Availability</CardTitle>
              <CardDescription>Freelance & collaboration friendly</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Open to frontend projects, UI/UX polish, and interactive web
                experiences. Let’s build something delightful.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
