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
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const rafTick = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "th">("en");
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

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Auto-close mobile menu on resize to md and above
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

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
        <div className="grid grid-cols-[auto_1fr_auto] items-center min-h-16 md:min-h-20">
          {/* Logo */}
          <div className="shrink-0">
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
            className="relative hidden md:flex items-center gap-1 justify-center justify-self-center"
          >
            {/* Highlight movable pill */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-0 top-11 -translate-y-1/2",
                "rounded-lg bg-accent ring-1 ring-accent/30",
                "transition-[transform,width,height,opacity] duration-150 ease-out",
                hoverRect.visible ? "opacity-100" : "opacity-0",
              )}
              style={{
                transform: `translate(${hoverRect.x}px, -50%)`,
                width: `${hoverRect.w}px`,
                height: `${hoverRect.h}px`,
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
                    `relative text-sm transition-colors cursor-pointer px-4 py-3`,
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
          <div className="flex items-center gap-2 justify-self-end">
            <Select value={lang} onValueChange={(v) => setLang(v as any)}>
              <SelectTrigger size="sm" className="hidden md:flex w-[120px] px-2 py-1 text-sm border-border/50 justify-center">
                <span className="inline-flex items-center gap-2">
                  <img
                    src={lang === "th" ? "https://flagcdn.com/w40/th.png" : "https://flagcdn.com/w40/us.png"}
                    alt={lang === "th" ? "ไทย" : "English"}
                    className="w-4 h-4 rounded-full object-cover"
                    width={16}
                    height={16}
                    loading="lazy"
                  />
                  {lang === "th" ? "ไทย" : "English"}
                </span>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="en">
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      alt="English"
                      className="w-4 h-4 rounded-full object-cover"
                      width={16}
                      height={16}
                      loading="lazy"
                    />
                    English
                  </span>
                </SelectItem>
                <SelectItem value="th">
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/w40/th.png"
                      alt="ไทย"
                      className="w-4 h-4 rounded-full object-cover"
                      width={16}
                      height={16}
                      loading="lazy"
                    />
                    ไทย
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="lg"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                "relative md:hidden w-12 h-12",
                mobileOpen && "z-70 text-white",
              )}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-9 h-9" /> : <Menu className="w-9 h-9" />}
            </Button>
          </div>
        </div>

        {/* Mobile Fullscreen Menu via Portal (escapes transformed nav) */}
        {mobileOpen &&
          createPortal(
            <div
              id="mobile-menu"
              className="fixed inset-0 z-60 md:hidden text-white bg-primary/70 backdrop-blur-xl backdrop-saturate-150 animate-slide-in-right"
            >
              {/* Close (X) button inside overlay */}
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 text-white/90 hover:text-white hover:bg-white/10 w-12 h-12"
              >
                <X className="w-10 h-10" />
              </Button>

              {/* Centered menu items, full-width hover/active backgrounds */}
              <div className="flex h-full w-full items-center justify-center">
                <nav className="w-full">
                  <ul className="flex flex-col w-full gap-4 text-center">
                    {navigation.menuItems.map((item) => (
                      <li key={item.href} className="w-full">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            handleNavClick(item.href);
                            setMobileOpen(false);
                          }}
                          className={cn(
                            "w-full rounded-none justify-center text-xl text-white/90 hover:text-white hover:bg-white/10 py-8 px-6",
                            activeSection === item.href.substring(1) &&
                              "text-white bg-white/10",
                          )}
                        >
                          {item.label}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </nav>
  );
}
