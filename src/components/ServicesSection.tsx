"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Layers } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeService, setActiveService] = useState<ServiceItem>(
    SERVICES_DATA[0]
  );

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".services-entrance", {
      y: 38,
      opacity: 0,
      duration: 0.78,
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

  const visibleServices =
    selectedFilter === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((srv) => srv.id === selectedFilter);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 md:px-12 bg-[#F4F1EA] text-obsidian border-t border-obsidian/15 overflow-hidden"
    >
      {/* Grid Halus ala Lembaran Teknis */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(13,13,13,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,13,13,0.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto">
        {/* Header + Filter Pill Berwarna */}
        <div className="services-entrance section-reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-obsidian/15">
          <div>
            <p className="font-hand text-xl md:text-2xl font-bold text-accent mb-1">
              What I Do Best
            </p>
            <h2 className="font-display uppercase text-5xl sm:text-6xl md:text-7xl tracking-[-0.03em] leading-[0.9] text-[#141414]">
              SERVICES
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedFilter("all");
                setActiveService(SERVICES_DATA[0]);
              }}
              className={`px-4 py-2 rounded-full font-sans font-bold text-xs tracking-wide transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-obsidian text-cream shadow-md"
                  : "bg-white/80 text-obsidian/70 hover:text-obsidian border border-obsidian/15"
              }`}
            >
              All Services
            </button>

            {SERVICES_DATA.map((srv) => {
              const isSelected = selectedFilter === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(srv.id);
                    setActiveService(srv);
                  }}
                  style={{
                    backgroundColor: isSelected ? srv.tabColor : undefined,
                    borderColor: srv.tabColor,
                  }}
                  className={`px-4 py-2 rounded-full font-sans font-bold text-xs tracking-wide border transition-all cursor-pointer ${
                    isSelected
                      ? "text-white shadow-md scale-[1.02]"
                      : "bg-white/80 text-obsidian hover:text-white"
                  }`}
                >
                  {srv.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Interaktif: Daftar Bernomor di Kiri + Panel Fokus Aktif di Kanan */}
        <div className="services-entrance section-reveal-item mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kiri: Daftar Layanan Interaktif */}
          <div className="lg:col-span-7 divide-y divide-obsidian/15 border-y border-obsidian/15">
            {visibleServices.map((srv) => {
              const isFocused = activeService.id === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onMouseEnter={() => setActiveService(srv)}
                  onClick={() => setActiveService(srv)}
                  className={`w-full text-left py-6 px-4 sm:px-5 transition-all duration-200 flex items-start justify-between gap-4 cursor-pointer ${
                    isFocused
                      ? "bg-white shadow-sm"
                      : "hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-start gap-5 sm:gap-7">
                    <span
                      style={{
                        color: isFocused ? srv.tabColor : "rgba(20,20,20,0.28)",
                      }}
                      className="font-display text-4xl sm:text-5xl leading-none transition-colors duration-200 shrink-0"
                    >
                      {srv.number}
                    </span>

                    <div>
                      <h3 className="font-sans font-extrabold text-lg sm:text-xl text-[#141414] tracking-tight">
                        {srv.title}
                      </h3>
                      <p className="mt-1.5 font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-xl">
                        {srv.description}
                      </p>

                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {srv.highlights.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[#EFECE4] border border-obsidian/10 text-obsidian/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight
                    style={{
                      color: isFocused ? srv.tabColor : "rgba(20,20,20,0.35)",
                    }}
                    className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-200 ${
                      isFocused ? "translate-x-0.5 -translate-y-0.5" : ""
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Kanan: Sticky Spec Card Layanan yang Sedang Aktif */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-[#141414] text-cream p-6 sm:p-7 border border-obsidian/20 shadow-[0_20px_50px_rgba(13,13,13,0.12)]">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase">
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  <span>ACTIVE CAPABILITY</span>
                </span>
                <span
                  style={{ backgroundColor: activeService.tabColor }}
                  className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold text-white uppercase"
                >
                  {activeService.tabLabel}
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span
                  style={{ color: activeService.tabColor }}
                  className="font-display text-5xl leading-none"
                >
                  {activeService.number}
                </span>
                <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  {activeService.title}
                </h3>
              </div>

              <p className="mt-3 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeService.description}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                {activeService.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 font-sans text-xs sm:text-sm text-neutral-100"
                  >
                    <span
                      style={{ backgroundColor: activeService.tabColor }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}