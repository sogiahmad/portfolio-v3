"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolio";

const NAV_ITEMS = [
  { label: "WORK", href: "#projects", id: "projects" },
  { label: "SERVICES", href: "#services", id: "services" },
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [navTextVisible, setNavTextVisible] = useState<boolean>(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setNavTextVisible(true);
    }, 750);

    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const ratio =
        maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      setScrollProgress(ratio * 100);

      const currentPos = window.scrollY + 180;
      let matched = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= currentPos) {
          matched = item.id;
        }
      }
      setActiveId(matched);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={() => {
            setActiveId("");
            setMobileOpen(false);
          }}
          className={`font-display text-base md:text-lg tracking-[0.04em] text-white inline-flex items-start group transition-all duration-700 ease-out ${
            navTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <span>{PROFILE_DATA.brand}</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mt-0.5 transition-transform duration-300 group-hover:scale-125" />
        </a>

        {/* Center Status Pill */}
        <div
          className={`hidden md:flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.09] rounded-full px-4 py-1.5 transition-all duration-700 delay-75 ease-out ${
            navTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-sans font-semibold text-[11px] tracking-[0.14em] text-neutral-300 uppercase">
            {PROFILE_DATA.roleBadge}
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav
          className={`hidden sm:flex items-center gap-6 md:gap-8 transition-all duration-700 delay-100 ease-out ${
            navTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative py-1 font-sans font-bold text-[11px] md:text-xs tracking-[0.14em] uppercase transition-colors ${
                  isActive
                    ? "text-amber-300"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-accent transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 text-neutral-200 hover:text-white cursor-pointer transition-opacity duration-700 ${
            navTextVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {mobileOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-[#121212] border-t border-white/10 px-6 py-4 space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-emerald-400 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{PROFILE_DATA.roleBadge}</span>
          </div>
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 font-sans font-bold text-xs tracking-[0.14em] text-neutral-200 hover:text-accent uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Scroll Progress Line */}
      <div className="w-full h-[2px] bg-white/[0.04]">
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-accent via-amber-400 to-accent transition-[width] duration-150"
        />
      </div>
    </header>
  );
}