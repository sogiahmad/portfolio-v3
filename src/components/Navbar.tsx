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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
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
      const y = window.scrollY;
      setIsScrolled(y > 24);

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const ratio =
        maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      setScrollProgress(ratio * 100);

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
        {/* Brand Logo + Cincin Orbit Berputar */}
        <a
          href="#top"
          onClick={() => {
            setActiveId("");
            setMobileOpen(false);
          }}
          className={`relative px-3 py-1.5 font-display text-base md:text-lg tracking-[0.04em] text-white inline-flex items-center group transition-all duration-700 ease-out ${
            navTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* Cincin berputar halus mengelilingi tulisan */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 rounded-full overflow-hidden opacity-65 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span
              style={{
                animation: "brandRingOrbit 5.5s linear infinite",
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(251,191,36,0.55) 18%, rgba(255,77,0,0.9) 34%, transparent 52%, rgba(251,191,36,0.35) 75%, transparent 100%)",
              }}
              className="absolute -inset-6 block"
            />
            <span className="absolute inset-[1.5px] rounded-full bg-obsidian/95" />
          </span>

          <span className="relative z-10 inline-flex items-start">
            <span>{PROFILE_DATA.brand}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mt-0.5 shadow-[0_0_8px_rgba(255,77,0,0.85)] transition-transform duration-300 group-hover:scale-125" />
          </span>
        </a>

        {/* Center Status Pill + Denyut Sonar Ganda */}
        <div
          className={`group/pill hidden md:flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.09] hover:border-emerald-400/40 rounded-full px-4 py-1.5 shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_20px_rgba(16,185,129,0.16)] transition-all duration-500 ease-out ${
            navTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span
              style={{ animation: "sonarPulse 2.4s cubic-bezier(0, 0, 0.2, 1) infinite" }}
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
          <span className="font-sans font-semibold text-[11px] tracking-[0.14em] text-neutral-300 group-hover/pill:text-white uppercase transition-colors">
            {PROFILE_DATA.roleBadge}
          </span>
        </div>

        {/* Desktop Nav Links + Hover Underline Efek Riak Air */}
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
                className={`group/link relative py-1 font-sans font-bold text-[11px] md:text-xs tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-[1px] ${
                  isActive
                    ? "text-amber-300"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {/* Garis bawah dengan efek riak/gelombang mengalir saat hover */}
                <span
                  className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] overflow-hidden rounded-full transition-transform duration-300 origin-left ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover/link:scale-x-100"
                  }`}
                >
                  <span
                    style={{
                      animation: "waterRippleFlow 1.8s linear infinite",
                      background:
                        "linear-gradient(90deg, #FF4D00 0%, #FBBF24 25%, #38BDF8 50%, #FBBF24 75%, #FF4D00 100%)",
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

      {/* Mobile Dropdown dengan Transisi Buka/Tutup Halus */}
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
                onClick={() => setMobileOpen(false)}
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
        @keyframes brandRingOrbit {
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

        @keyframes waterRippleFlow {
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