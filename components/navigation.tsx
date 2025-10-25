"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { smoothScrollToElement } from "@/lib/smooth-scroll";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { navigation } from "@/constants/contents";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const rafTick = useRef(false);

  // Throttled scroll handler just for navbar style
  useEffect(() => {
    const onScroll = () => {
      if (rafTick.current) return;
      rafTick.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        rafTick.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver (no layout reads in scroll handler)
  useEffect(() => {
    const navHeight = 80;
    const ids = navigation.menuItems.map((item) => item.href.substring(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          );
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: `-${navHeight + 10}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      const navHeight = 80; // Height of the fixed navbar
      smoothScrollToElement(element, {
        offset: navHeight,
        duration: 850,
        respectReducedMotion: false,
      });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 composite-layer",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-xl md:text-2xl font-bold text-foreground"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
            >
              {navigation.logo}
            </a>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.menuItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative text-sm font-medium transition-colors cursor-pointer",
                  activeSection === item.href.substring(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground rounded-full" />
                )}
              </Button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-[100px] md:w-[120px] border-border/50">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                const mobileMenu = document.getElementById("mobile-menu");
                mobileMenu?.classList.toggle("hidden");
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4">
          <div className="flex flex-col gap-2">
            {navigation.menuItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => {
                  handleNavClick(item.href);
                  document
                    .getElementById("mobile-menu")
                    ?.classList.add("hidden");
                }}
                className={cn(
                  "justify-start text-sm font-medium",
                  activeSection === item.href.substring(1)
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
