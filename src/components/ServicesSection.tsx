"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Layers } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeService, setActiveService] = useState<ServiceItem>(
    SERVICES_DATA[0]
  );

  const visibleServices =
    selectedFilter === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((srv) => srv.id === selectedFilter);

  const activeIndex = Math.max(
    0,
    visibleServices.findIndex((item) => item.id === activeService.id)
  );
  const currentStep = activeIndex + 1;
  const totalSteps = Math.max(1, visibleServices.length);
  const visualVariantIndex = Math.max(
    0,
    SERVICES_DATA.findIndex((item) => item.id === activeService.id)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-entrance", {
        y: 32,
        opacity: 0,
        duration: 0.72,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedFilter !== "all" || visibleServices.length <= 1) return;

    let ticking = false;
    const handleScrollSpy = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const viewportFocusY = window.innerHeight * 0.45;
        let closestIndex = -1;
        let smallestDistance = Infinity;

        visibleServices.forEach((srv, idx) => {
          const el = cardRefs.current[idx];
          if (!el) return;
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 70 || rect.top > window.innerHeight - 70) return;

          const cardCenterY = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenterY - viewportFocusY);
          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = idx;
          }
        });

        if (closestIndex !== -1 && visibleServices[closestIndex]) {
          setActiveService((prev) =>
            prev.id === visibleServices[closestIndex].id
              ? prev
              : visibleServices[closestIndex]
          );
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [selectedFilter, visibleServices]);

  const formatTwoDigits = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-16 md:py-22 px-6 md:px-12 bg-[#F4F1EA] text-obsidian border-t border-obsidian/15 overflow-hidden"
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

      {/* Gerigi Detail Berputar Pelan (Diposisikan Lebih ke Bawah) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        {/* Gerigi Besar Detail di Kanan Bawah */}
        <svg
          viewBox="0 0 320 320"
          style={{ animation: "gearSpinCW 62s linear infinite" }}
          className="absolute -bottom-24 -right-20 w-[340px] h-[340px] md:w-[440px] md:h-[440px] text-amber-700/[0.11]"
          fill="none"
        >
          <circle
            cx="160"
            cy="160"
            r="122"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            cx="160"
            cy="160"
            r="106"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="4 4"
          />
          <circle
            cx="160"
            cy="160"
            r="74"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            cx="160"
            cy="160"
            r="34"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {Array.from({ length: 36 }).map((_, idx) => {
            const angle = (idx * 360) / 36;
            return (
              <g key={idx} transform={`rotate(${angle} 160 160)`}>
                <rect
                  x="156.5"
                  y="24"
                  width="7"
                  height="13"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.15"
                />
                {idx % 6 === 0 && (
                  <line
                    x1="160"
                    y1="86"
                    x2="160"
                    y2="126"
                    stroke="currentColor"
                    strokeWidth="1.15"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Gerigi Kecil Detail Bertautan di Atas Gerigi Besar */}
        <svg
          viewBox="0 0 180 180"
          style={{ animation: "gearSpinCCW 40s linear infinite" }}
          className="hidden sm:block absolute bottom-44 right-48 md:right-64 w-[150px] h-[150px] md:w-[180px] md:h-[180px] text-amber-800/[0.12]"
          fill="none"
        >
          <circle
            cx="90"
            cy="90"
            r="60"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            cx="90"
            cy="90"
            r="38"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx="90"
            cy="90"
            r="15"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {Array.from({ length: 24 }).map((_, idx) => {
            const angle = (idx * 360) / 24;
            return (
              <g key={idx} transform={`rotate(${angle} 90 90)`}>
                <rect
                  x="87"
                  y="16"
                  width="6"
                  height="11"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.15"
                />
                {idx % 4 === 0 && (
                  <line
                    x1="90"
                    y1="52"
                    x2="90"
                    y2="75"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto">
        {/* Header + Filter Pill Berwarna */}
        <div className="services-entrance section-reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-7 border-b border-obsidian/15">
          <div>
            <p className="font-hand text-lg md:text-xl font-bold text-accent mb-0.5">
              What I Do Best
            </p>
            <h2 className="font-display uppercase text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] leading-[0.9] text-[#141414]">
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
              className={`px-3.5 py-1.5 rounded-full font-sans font-bold text-xs tracking-wide transition-all cursor-pointer ${
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
                  className={`px-3.5 py-1.5 rounded-full font-sans font-bold text-xs tracking-wide border transition-all cursor-pointer ${
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

        {/* Split Interaktif: 01-03 Ringkas di Kiri + Card Kanan Sticky Compact */}
        <div className="services-entrance section-reveal-item mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kiri: Daftar Card Bernomor (Compact agar 1, 2, 3 terlihat jelas) */}
          <div className="lg:col-span-7 space-y-3">
            {visibleServices.map((srv, idx) => {
              const isFocused = activeService.id === srv.id;
              return (
                <button
                  key={srv.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  type="button"
                  onMouseEnter={() => setActiveService(srv)}
                  onClick={() => setActiveService(srv)}
                  style={{
                    borderColor: isFocused
                      ? `${srv.tabColor}70`
                      : "rgba(13,13,13,0.12)",
                  }}
                  className={`group relative w-full text-left rounded-xl p-4 sm:p-5 border transition-all duration-300 flex items-start justify-between gap-3.5 cursor-pointer overflow-hidden ${
                    isFocused
                      ? "bg-white shadow-[0_14px_32px_rgba(13,13,13,0.08)]"
                      : "bg-white/50 hover:bg-white/85"
                  }`}
                >
                  {/* Garis Kilau Emas / Aksen di Sisi Atas Card Aktif */}
                  <span
                    aria-hidden="true"
                    style={{
                      background: isFocused
                        ? `linear-gradient(90deg, ${srv.tabColor}, #F59E0B, transparent)`
                        : "transparent",
                    }}
                    className={`absolute top-0 left-0 right-0 h-[2.5px] transition-opacity duration-300 ${
                      isFocused ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                    <span
                      style={{
                        color: isFocused ? srv.tabColor : "rgba(20,20,20,0.25)",
                      }}
                      className={`font-display text-3xl sm:text-4xl leading-none transition-all duration-300 shrink-0 ${
                        isFocused ? "scale-105" : "group-hover:text-obsidian/50"
                      }`}
                    >
                      {srv.number}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-sans font-extrabold text-base sm:text-lg text-[#141414] tracking-tight">
                          {srv.title}
                        </h3>
                        {isFocused && (
                          <span
                            style={{
                              backgroundColor: `${srv.tabColor}18`,
                              color: srv.tabColor,
                            }}
                            className="font-mono text-[9px] font-extrabold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full"
                          >
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <p className="mt-1 font-sans text-xs text-neutral-700 leading-snug max-w-xl">
                        {srv.description}
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {srv.highlights.map((tag) => (
                          <span
                            key={tag}
                            className={`font-mono text-[9px] font-bold tracking-[0.09em] uppercase px-2 py-0.5 rounded-full border transition-colors duration-200 ${
                              isFocused
                                ? "bg-[#F7F4EC] border-amber-500/30 text-obsidian"
                                : "bg-[#EFECE4]/80 border-obsidian/10 text-obsidian/75"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      backgroundColor: isFocused
                        ? `${srv.tabColor}16`
                        : "transparent",
                      color: isFocused ? srv.tabColor : "rgba(20,20,20,0.35)",
                    }}
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isFocused
                        ? "translate-x-0.5 -translate-y-0.5"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Kanan: Sticky Compact Panel dengan Animasi 01, 02, 03 */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative rounded-2xl bg-[#141414] text-cream p-4 sm:p-5 border border-obsidian/20 shadow-[0_20px_50px_rgba(13,13,13,0.16)] overflow-hidden">
              {/* Garis Kilau Emas Atas */}
              <div
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #F59E0B, #FBBF24, transparent)",
                }}
                className="absolute top-0 inset-x-0 h-[2px] opacity-90"
              />

              {/* Header: SERVICE 01 / 03 + Step Bar */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-amber-300 uppercase">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    SERVICE {formatTwoDigits(currentStep)} /{" "}
                    {formatTwoDigits(totalSteps)}
                  </span>
                </span>

                <div className="flex items-center gap-1.5">
                  {visibleServices.map((item, idx) => {
                    const isActiveBar = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Pilih ${item.title}`}
                        onClick={() => setActiveService(item)}
                        style={{
                          backgroundColor: isActiveBar
                            ? "#FBBF24"
                            : "rgba(255,255,255,0.18)",
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isActiveBar ? "w-5" : "w-2 hover:bg-white/40"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Visual Diagram Dinamis: 01 (Bar + Titik Jatuh), 02 (Kotak Mengelilingi + Cursor), 03 (Emas + Ceklis Hidup + Garis Jatuh) */}
              <div
                key={activeService.id}
                style={{
                  animation: "panelFadeSlide 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className="mt-3.5 rounded-xl bg-white/[0.04] border border-white/10 p-3.5"
              >
                {visualVariantIndex === 0 && (
                  <div className="relative space-y-2">
                    {/* Titik cahaya jatuh dari atas ke PRODUCTION */}
                    <span
                      aria-hidden="true"
                      style={{
                        animation: "dotDropDown 2.2s ease-in-out infinite",
                      }}
                      className="pointer-events-none absolute right-6 top-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] z-20"
                    />

                    {[
                      {
                        label: "ARCHITECTURE",
                        width: "92%",
                        isGreen: false,
                        anim: "barFlowA 3s ease-in-out infinite",
                      },
                      {
                        label: "INTERFACE",
                        width: "78%",
                        isGreen: false,
                        anim: "barFlowB 3.4s ease-in-out infinite",
                      },
                      {
                        label: "PERFORMANCE",
                        width: "64%",
                        isGreen: false,
                        anim: "barFlowC 3.8s ease-in-out infinite",
                      },
                      {
                        label: "PRODUCTION",
                        width: "56%",
                        isGreen: true,
                        anim: "prodBarPulse 2.4s ease-in-out infinite",
                      },
                    ].map((row) => (
                      <div key={row.label} className="space-y-0.5">
                        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.12em] uppercase">
                          <span
                            className={
                              row.isGreen
                                ? "text-amber-300 font-bold"
                                : "text-neutral-400"
                            }
                          >
                            {row.label}
                          </span>
                          <span
                            className={
                              row.isGreen ? "text-emerald-400" : "text-neutral-500"
                            }
                          >
                            {row.width}
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                          <div
                            style={{
                              width: row.width,
                              animation: row.anim,
                              backgroundColor: row.isGreen
                                ? "#10B981"
                                : "rgba(163, 163, 163, 0.55)",
                            }}
                            className="h-full rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {visualVariantIndex === 1 && (
                  <div className="rounded-lg border border-white/10 bg-[#101010] p-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white/25" />
                        <span className="w-2 h-2 rounded-full bg-white/15" />
                        <span className="w-2 h-2 rounded-full bg-white/15" />
                      </div>
                      <span className="font-mono text-[8px] text-neutral-500 uppercase">
                        LIVE BUILD
                      </span>
                    </div>

                    {/* Baris dengan kursor mengetik */}
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2/3 rounded bg-white/15" />
                      <span
                        style={{ animation: "cursorBlink 0.9s steps(1) infinite" }}
                        className="inline-block w-[2px] h-3 bg-amber-300"
                      />
                    </div>
                    <div className="h-2 w-1/2 rounded bg-white/10" />

                    {/* Kotak DEPLOY MODULE dengan border cahaya bergerak mengelilingi */}
                    <div className="pt-1 flex items-center justify-between gap-2">
                      <div className="relative rounded-md p-[1.5px] overflow-hidden">
                        <span
                          aria-hidden="true"
                          style={{
                            animation: "orbitBorderSpin 2.8s linear infinite",
                            background:
                              "conic-gradient(from 0deg, transparent 0%, #FBBF24 22%, #FF4D00 40%, transparent 65%)",
                          }}
                          className="absolute -inset-6 block"
                        />
                        <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-[#1C120B] text-amber-200 font-mono text-[10px] font-bold tracking-wider uppercase">
                          <span>DEPLOY MODULE</span>
                          <ArrowUpRight className="w-3 h-3 text-amber-300" />
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-neutral-400 uppercase">
                        READY • 100%
                      </span>
                    </div>
                  </div>
                )}

                {visualVariantIndex >= 2 && (
                  <div className="relative space-y-2">
                    {/* Garis jatuh tipis di sisi kanan */}
                    <span
                      aria-hidden="true"
                      style={{
                        animation: "lineDropFall 2.4s linear infinite",
                      }}
                      className="pointer-events-none absolute right-1.5 top-0 w-[1.5px] h-6 bg-gradient-to-b from-amber-300 via-amber-400/60 to-transparent z-20"
                    />

                    {activeService.highlights.slice(0, 3).map((point, idx) => (
                      <div
                        key={point}
                        style={{
                          animation: `goldRowPulse 2.7s ease-in-out ${idx * 0.45}s infinite`,
                        }}
                        className="flex items-center justify-between gap-2.5 rounded-lg bg-amber-400/[0.06] border border-amber-400/25 px-2.5 py-1.5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            style={{
                              animation: `checkPopAlive 2.7s ease-in-out ${idx * 0.45}s infinite`,
                            }}
                            className="w-4 h-4 rounded-full bg-amber-400 text-obsidian flex items-center justify-center shrink-0"
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span className="font-mono text-[10px] text-amber-100 truncate">
                            {point}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] font-bold text-amber-300 shrink-0 pr-2">
                          0{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail Judul & Deskripsi Layanan Aktif (Compact) */}
              <div className="mt-3.5 flex items-baseline gap-2.5">
                <span
                  style={{ color: "#FBBF24" }}
                  className="font-display text-3xl sm:text-4xl leading-none"
                >
                  {activeService.number}
                </span>
                <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight leading-snug">
                  {activeService.title}
                </h3>
              </div>

              <p className="mt-1.5 font-sans text-xs text-neutral-300 leading-relaxed">
                {activeService.description}
              </p>

              {/* Highlights / Deliverables Compact */}
              <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                {activeService.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 font-sans text-xs text-neutral-100"
                  >
                    <span
                      style={{ backgroundColor: activeService.tabColor }}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                    >
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gearSpinCW {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gearSpinCCW {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes panelFadeSlide {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotDropDown {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(74px);
            opacity: 0;
          }
        }

        @keyframes barFlowA {
          0%,
          100% {
            transform: scaleX(0.96);
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        @keyframes barFlowB {
          0%,
          100% {
            transform: scaleX(0.92);
            transform-origin: left;
          }
          50% {
            transform: scaleX(1.03);
            transform-origin: left;
          }
        }

        @keyframes barFlowC {
          0%,
          100% {
            transform: scaleX(0.9);
            transform-origin: left;
          }
          50% {
            transform: scaleX(1.05);
            transform-origin: left;
          }
        }

        @keyframes prodBarPulse {
          0%,
          100% {
            transform: scaleX(0.88);
            transform-origin: left;
            box-shadow: 0 0 0 rgba(16, 185, 129, 0);
          }
          50% {
            transform: scaleX(1.06);
            transform-origin: left;
            box-shadow: 0 0 12px rgba(16, 185, 129, 0.55);
          }
        }

        @keyframes cursorBlink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        @keyframes orbitBorderSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes lineDropFall {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(68px);
            opacity: 0;
          }
        }

        @keyframes goldRowPulse {
          0%,
          100% {
            background-color: rgba(251, 191, 36, 0.05);
            border-color: rgba(251, 191, 36, 0.22);
          }
          50% {
            background-color: rgba(251, 191, 36, 0.16);
            border-color: rgba(251, 191, 36, 0.65);
          }
        }

        @keyframes checkPopAlive {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(251, 191, 36, 0);
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
          }
        }
      `}</style>
    </section>
  );
}