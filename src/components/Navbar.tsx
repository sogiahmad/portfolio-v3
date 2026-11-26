"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [navTextVisible, setNavTextVisible] = useState<boolean>(false);
  const manualClickTimerRef = useRef<number | null>(null);
  const isManualSelectingRef = useRef<boolean>(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setNavTextVisible(true);
    }, 750);

    return () => {
      window.clearTimeout(showTimer);
      if (manualClickTimerRef.current) {
        window.clearTimeout(manualClickTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const ratio =
        maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      setScrollProgress(ratio * 100);

      if (isManualSelectingRef.current) return;

      if (y < 120) {
        setActiveId("");
        return;
      }

      const currentPos = y + 180;
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

  const handleNavClick = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    isManualSelectingRef.current = true;
    if (manualClickTimerRef.current) {
      window.clearTimeout(manualClickTimerRef.current);
    }
    manualClickTimerRef.current = window.setTimeout(() => {
      isManualSelectingRef.current = false;
    }, 900);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "bg-obsidian/95 border-b border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          : "bg-obsidian/80 border-b border-white/[0.06]"
      }`}
    >
      <div
        className={`max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between transition-[height] duration-300 ${
          isScrolled ? "h-14 md:h-[68px]" : "h-16 md:h-20"
        }`}
      >
        {/* Brand Logo + Garis Hidup ~2/8 Mengelilingi Tulisan */}
        <a
          href="#top"
          onClick={() => {
            handleNavClick("");
          }}
          className={`relative px-3.5 py-1.5 font-display text-base md:text-lg tracking-[0.04em] text-white inline-flex items-center group transition-all duration-700 ease-out ${
            navTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* SVG orbit ~2/8 keliling (90 deg arc) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 120 44"
            preserveAspectRatio="none"
            style={{ animation: "navArcSpin 5.2s linear infinite" }}
            className="pointer-events-none absolute -inset-x-1 -inset-y-0.5 w-[calc(100%+8px)] h-[calc(100%+4px)] opacity-75 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ellipse
              cx="60"
              cy="22"
              rx="57"
              ry="19"
              fill="none"
              stroke="url(#brandTwoEighthsGrad)"
              strokeWidth="1.4"
              strokeDasharray="68 204"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="brandTwoEighthsGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FF4D00" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>

          <span className="relative z-10 inline-flex items-start">
            <span>{PROFILE_DATA.brand}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mt-0.5 transition-transform duration-300 group-hover:scale-125" />
          </span>
        </a>

        {/* Center Status Pill + Garis Hidup ~3/8 + Hover Hijau */}
        <div
          className={`group/pill relative hidden md:flex items-center gap-2.5 bg-white/[0.04] hover:bg-emerald-500/[0.06] border border-white/[0.09] hover:border-emerald-400/35 rounded-full px-4 py-1.5 transition-all duration-500 ease-out ${
            navTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* Garis hidup ~3/8 keliling (135 deg arc), menyala hijau saat hover */}
          <svg
            aria-hidden="true"
            viewBox="0 0 260 40"
            preserveAspectRatio="none"
            style={{ animation: "navArcSpin 6s linear infinite" }}
            className="pointer-events-none absolute -inset-x-1 -inset-y-0.5 w-[calc(100%+8px)] h-[calc(100%+4px)] text-emerald-400/45 group-hover/pill:text-emerald-400 transition-colors duration-300"
          >
            <rect
              x="2"
              y="2"
              width="256"
              height="36"
              rx="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="195 325"
              strokeLinecap="round"
            />
          </svg>

          <span className="relative z-10 flex h-2.5 w-2.5 items-center justify-center">
            <span
              style={{
                animation: "sonarPulse 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/75"
            />
            <span
              style={{
                animation:
                  "sonarPulse 2.4s cubic-bezier(0, 0, 0.2, 1) 1.2s infinite",
              }}
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-300/60"
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_10px_#34d399] transition-transform duration-300 group-hover/pill:scale-125" />
          </span>
          <span className="relative z-10 font-sans font-semibold text-[11px] tracking-[0.14em] text-neutral-300 group-hover/pill:text-emerald-200 uppercase transition-colors">
            {PROFILE_DATA.roleBadge}
          </span>
        </div>

        {/* Desktop Nav Links + Underline Warna Tema + Riak */}
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
                onClick={() => handleNavClick(item.id)}
                className={`group/link relative py-1 font-sans font-bold text-[11px] md:text-xs tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-[1px] ${
                  isActive
                    ? "text-amber-300"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] overflow-hidden rounded-full transition-transform duration-300 origin-left ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover/link:scale-x-100"
                  }`}
                >
                  <span
                    style={{
                      animation: "themeRippleFlow 1.9s linear infinite",
                      background:
                        "linear-gradient(90deg, #FF4D00 0%, #FBBF24 45%, #FF8A00 75%, #FF4D00 100%)",
                      backgroundSize: "200% 100%",
                    }}
                    className="block w-full h-full"
                  />
                </span>
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
      <div
        className={`sm:hidden overflow-hidden bg-[#121212] transition-all duration-300 ease-out ${
          mobileOpen
            ? "max-h-72 opacity-100 border-t border-white/10"
            : "max-h-0 opacity-0 border-t border-transparent pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-emerald-400 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PROFILE_DATA.roleBadge}</span>
          </div>
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className="py-2.5 font-sans font-bold text-xs tracking-[0.14em] text-neutral-200 hover:text-accent uppercase transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Progress Line */}
      <div className="w-full h-[2px] bg-white/[0.04]">
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-accent via-amber-400 to-accent transition-[width] duration-150"
        />
      </div>

      <style jsx>{`
        @keyframes navArcSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sonarPulse {
          0% {
            transform: scale(0.9);
            opacity: 0.85;
          }
          70% {
            transform: scale(2.5);
            opacity: 0;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes themeRippleFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </header>
  );
}