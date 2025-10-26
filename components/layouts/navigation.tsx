"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { smoothScrollToElement } from "@/lib/smooth-scroll";
import { Button } from "@/components/ui/button";
import { useHoverHighlight } from "@/hooks/useHoverHighlight";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { navigation } from "@/constants/contents";
import Link from "next/link";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const rafTick = useRef(false);
  const {
    menuRef,
    rect: hoverRect,
    moveTo,
    hide,
  } = useHoverHighlight({
    stickToActive: true,
    autoHideOnLeave: true,
    transitionMs: 300,
    getActiveEl: () => {
      // หา Button ที่ active จาก label/href ของคุณ
      // สมมติคุณแปะ data-href ให้ปุ่มแต่ละอันด้านล่าง
      const selector = `[data-href="#${activeSection}"]`;
      return (menuRef.current?.querySelector(selector) as HTMLElement) || null;
    },
  });

  // Keep highlight in sync with the active section (click/scroll)
  useEffect(() => {
    const el = document.querySelector(
      `[data-href="#${activeSection}"]`,
    ) as HTMLElement | null;
    if (el) moveTo(el);
  }, [activeSection, moveTo]);

  // removed separate scroll handler to avoid race conditions with highlight updates

  // Stable active section detection (no jitter):
  // pick the last section whose top is above the navbar offset.
  useEffect(() => {
    const navHeight = 80;
    const ids = navigation.menuItems.map((item) => item.href.substring(1));

    const onScrollStable = () => {
      if (rafTick.current) return;
      rafTick.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);

        let current = ids[0] || "home";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top - navHeight <= 1) {
            current = id;
          } else {
            break;
          }
        }
        setActiveSection((prev) => (prev === current ? prev : current));
        rafTick.current = false;
      });
    };

    window.addEventListener("scroll", onScrollStable, { passive: true });
    // Initialize on mount
    onScrollStable();
    return () => window.removeEventListener("scroll", onScrollStable);
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
          <div
            ref={menuRef}
            className="relative hidden md:flex items-center gap-1"
          >
            {/* Highlight movable pill */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute",
                "rounded-lg bg-accent ring-1 ring-accent/30",
                "transition-[transform,width,height,opacity] duration-150 ease-out",
                hoverRect.visible ? "opacity-100" : "opacity-0",
              )}
              style={{
                transform: `translateX(${hoverRect.x}px)`,
                width: `${hoverRect.w}px`,
                height: `${Math.max(hoverRect.h - 20, 40)}px`,
                zIndex: 0,
              }}
            />

            {/* เมนูจริง */}
            <div className="relative z-10 flex items-center gap-1">
              {navigation.menuItems.map((item) => (
                <Link
                  key={item.href}
                  data-href={item.href} // ⬅️ ใช้จับ active element
                  href={item.href}
                  onMouseEnter={(e) => moveTo(e.currentTarget)}
                  onClick={(e) => {
                    // Prevent default hash navigation; we control scroll
                    e.preventDefault();
                    // Set active immediately and move highlight
                    setActiveSection(item.href.substring(1));
                    moveTo(e.currentTarget);
                    // Smooth scroll to section
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "relative text-xl font-light transition-colors cursor-pointer px-4 py-3",
                    activeSection === item.href.substring(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
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
