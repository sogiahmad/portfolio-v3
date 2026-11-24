"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Plus, ArrowRight } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_BAND_ITEMS = [
  "SYAUQI AHMAD",
  "FULL-STACK & SECURITY",
  "INFORMATION SYSTEMS '23",
  "JAKARTA, INDONESIA",
];

const SECONDARY_BAND_ITEMS = [
  "NEXT.JS · PRISMA · MYSQL",
  "CVSS 7.5 SECURITY AUDIT",
  "BNSP & CISCO CERTIFIED",
  "BUILT IN JAKARTA",
];

export default function BrandBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [goldBurst, setGoldBurst] = useState<{
    x: number;
    y: number;
    key: number;
  } | null>(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".banner-entrance", {
      y: 42,
      opacity: 0,
      duration: 0.82,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGoldBurst({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      key: Date.now(),
    });
  };

  const parallaxOffsetX = spotlight.active ? ((spotlight.x - 50) / 50) * 8 : 0;
  const parallaxOffsetY = spotlight.active ? ((spotlight.y - 50) / 50) * 6 : 0;

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleSectionClick}
      className="section-curve -mt-10 relative z-30 pt-14 pb-24 md:pt-20 md:pb-32 bg-obsidian border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* === LATAR SILUET KOTA JAKARTA + GOLD SPOTLIGHT REVEAL === */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <img
          src="/images/jakarta-skyline.jpg"
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="w-full h-full object-cover object-center opacity-[0.13] grayscale contrast-125 select-none pointer-events-none"
        />

        <img
          src="/images/jakarta-skyline.jpg"
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          style={{
            opacity: spotlight.active ? 0.42 : 0,
            WebkitMaskImage: `radial-gradient(340px circle at ${spotlight.x}% ${spotlight.y}%, #000 0%, rgba(0,0,0,0.45) 45%, transparent 75%)`,
            maskImage: `radial-gradient(340px circle at ${spotlight.x}% ${spotlight.y}%, #000 0%, rgba(0,0,0,0.45) 45%, transparent 75%)`,
          }}
          className="absolute inset-0 w-full h-full object-cover object-center sepia-[0.55] saturate-150 transition-opacity duration-300 select-none pointer-events-none"
        />

        <div
          style={{
            opacity: spotlight.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, rgba(245,158,11,0.22), rgba(255,77,0,0.08) 45%, transparent 75%)`,
          }}
          className="absolute inset-0 transition-opacity duration-300"
        />

        {goldBurst && (
          <span
            key={goldBurst.key}
            style={{ left: goldBurst.x, top: goldBurst.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-amber-400/25 blur-2xl animate-ping"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/35 to-obsidian" />
      </div>

      {/* 1. Giant Full-Width Wordmark */}
      <div className="banner-entrance section-reveal-item relative z-10 max-w-[1340px] mx-auto px-6 md:px-12">
        <div
          style={{
            transform: `translate3d(${parallaxOffsetX * -0.4}px, ${
              parallaxOffsetY * -0.35
            }px, 0)`,
          }}
          className="overflow-hidden select-none transition-transform duration-300 ease-out"
        >
          <h2 className="font-display lowercase text-center text-[clamp(4.2rem,17.5vw,16.5rem)] leading-[0.82] tracking-[-0.04em] heading-metallic">
            {PROFILE_DATA.brandLower}
          </h2>
        </div>
      </div>

      {/* 2. Middle Micro-Metadata Strip */}
      <div className="banner-entrance section-reveal-item relative z-10 max-w-[1340px] mx-auto px-6 md:px-12 mt-6">
        <div className="pt-2 pb-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-3 flex items-center justify-between pr-4">
            <ul className="font-sans font-bold text-[10px] tracking-[0.16em] text-neutral-300 uppercase space-y-1">
              <li>NEXT.JS · PRISMA</li>
              <li>PYTHON · FLASK · MYSQL</li>
              <li>SECURITY AUDIT</li>
            </ul>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400/70 hidden md:block" />
          </div>

          <div className="md:col-span-6 flex items-center justify-between gap-4">
            <div>
              <span className="inline-block font-mono text-[10px] tracking-[0.16em] text-amber-400 uppercase mb-1.5">
                JAKARTA METROPOLIS EDITION · 6°12&apos;S 106°50&apos;E
              </span>
              <p className="font-sans font-bold text-[10px] md:text-[11px] leading-relaxed tracking-[0.14em] text-neutral-200 uppercase max-w-md">
                BUILDING SECURE, SCALABLE AND DATA-DRIVEN WEB SYSTEMS WITH CLEAN
                ARCHITECTURE AND A SHARP EYE FOR DETAIL.
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400/70 hidden md:block shrink-0" />
          </div>

          <div className="md:col-span-3 flex md:justify-end">
            <ul className="font-sans font-bold text-[10px] tracking-[0.16em] text-neutral-300 uppercase space-y-1">
              <li>
                <a
                  href="#projects"
                  className="hover:text-accent transition-colors"
                >
                  WORK
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-accent transition-colors"
                >
                  SERVICES
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-accent transition-colors"
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-accent transition-colors"
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Crossed Marquee Ribbons */}
      <div className="banner-entrance section-reveal-item relative z-10 my-10 md:my-14 h-36 sm:h-44 flex items-center justify-center select-none overflow-hidden">
        <div className="absolute w-[112%] -left-[6%] rotate-[2.8deg] bg-[#161616]/95 border-y border-amber-400/45 py-3 md:py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
          <div className="flex w-max animate-marquee-right items-center">
            {[
              ...SECONDARY_BAND_ITEMS,
              ...SECONDARY_BAND_ITEMS,
              ...SECONDARY_BAND_ITEMS,
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-6 pr-6 shrink-0">
                <span className="font-mono font-bold text-xs sm:text-sm md:text-base tracking-[0.18em] text-[#F2EFE9] uppercase">
                  {text}
                </span>
                <span className="text-amber-400 text-sm">✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-[112%] -left-[6%] -rotate-[2.8deg] bg-accent text-obsidian border-y-2 border-obsidian py-3.5 md:py-4 shadow-[0_14px_40px_rgba(255,77,0,0.35)]">
          <div className="flex w-max animate-marquee-left items-center">
            {[
              ...PRIMARY_BAND_ITEMS,
              ...PRIMARY_BAND_ITEMS,
              ...PRIMARY_BAND_ITEMS,
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-7 pr-7 shrink-0">
                <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-[-0.02em] uppercase leading-none">
                  {text}
                </span>
                <span className="font-sans font-black text-lg text-obsidian">
                  ✸
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Asymmetric Split */}
      <div className="banner-entrance section-reveal-item relative z-10 max-w-[1340px] mx-auto px-6 md:px-12 mt-8 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4 font-sans font-bold text-[10px] tracking-[0.2em] text-amber-400/80 uppercase mb-4">
            <span>01</span>
            <span className="w-10 h-px bg-amber-400/40 inline-block" />
            <span>JAKARTA STUDIO · INTRO</span>
          </div>

          <h3 className="font-display uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            <span className="block text-[#E5E2DC]">BUILT FOR</span>
            <span className="block text-accent">THE WEB</span>
          </h3>

          <p className="mt-5 font-sans text-sm md:text-base text-neutral-300 leading-relaxed max-w-md">
            Browse systems engineered for security, accessibility and data
            clarity — crafted in Jakarta to solve real institutional needs.
          </p>

          <div className="mt-7">
            <a
              href="#experience"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-black/50 hover:bg-amber-500/15 border border-amber-400/45 text-white font-sans font-bold text-xs tracking-wide transition-all duration-300 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>View Experience</span>
            </a>
          </div>
        </div>

        <div
          style={{
            transform: `translate3d(${parallaxOffsetX * 0.45}px, ${
              parallaxOffsetY * 0.35
            }px, 0)`,
          }}
          className="lg:col-span-5 flex flex-col lg:items-end lg:text-right space-y-6 transition-transform duration-300 ease-out"
        >
          <div>
            <span className="block font-sans font-bold text-[10px] tracking-[0.18em] text-neutral-400 uppercase">
              FEATURED AUDIT
            </span>
            <p className="mt-1 font-sans font-semibold text-sm text-neutral-100">
              Information Disclosure (CVSS 7.5)
            </p>
            <p className="font-sans text-xs text-neutral-400">
              Government Domain, 2025
            </p>
          </div>

          <div>
            <span className="block font-sans font-bold text-[10px] tracking-[0.18em] text-neutral-400 uppercase">
              ASPIRATIONS MANAGED
            </span>
            <p className="mt-0.5 font-sans font-extrabold text-xl text-white">
              500+
            </p>
          </div>

          <div>
            <span className="block font-sans font-bold text-[10px] tracking-[0.18em] text-neutral-400 uppercase">
              ACADEMIC GPA
            </span>
            <p className="mt-0.5 font-sans font-extrabold text-xl text-amber-400">
              3.47 / 4.00
            </p>
          </div>

          <a
            href="#experience"
            className="group inline-flex items-center gap-3 pt-2"
          >
            <span className="w-9 h-9 rounded-full border border-white/25 group-hover:border-amber-400 group-hover:bg-amber-500 flex items-center justify-center transition-colors">
              <Plus className="w-4 h-4 text-white group-hover:text-obsidian" />
            </span>
            <span className="font-sans font-bold text-[10px] tracking-[0.18em] text-neutral-200 group-hover:text-amber-300 uppercase">
              VIEW EXPERIENCE
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}