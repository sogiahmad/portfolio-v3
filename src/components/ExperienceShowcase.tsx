"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Code2,
  Shield,
  BarChart3,
  Camera,
  Pin,
  FileText,
  CheckCircle2,
  MapPin,
  Filter,
} from "lucide-react";
import { EXPERIENCE_DATA, ExperienceItem } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type ViewMode = "corkboard" | "editorial";
type ExperienceFilter = "all" | "work" | "leadership" | "community";

function matchesFilter(item: ExperienceItem, filter: ExperienceFilter): boolean {
  if (filter === "all") return true;
  const chapter = item.chapter.toUpperCase();
  if (filter === "work") return chapter.includes("WORK");
  if (filter === "community") return chapter.includes("DEVELOPER");
  return (
    chapter.includes("SENATE") ||
    chapter.includes("LEADERSHIP") ||
    chapter.includes("OPERATIONS")
  );
}

export default function ExperienceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("corkboard");
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const [hoveredItem, setHoveredItem] = useState<ExperienceItem | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const editorialContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = EXPERIENCE_DATA.filter((item) =>
    matchesFilter(item, activeFilter)
  );
  const displayList = filteredItems.length > 0 ? filteredItems : EXPERIENCE_DATA;
  const safeIndex = Math.min(activeIndex, displayList.length - 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-entrance", {
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

  useEffect(() => {
    if (viewMode !== "corkboard" || isPaused || displayList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayList.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused, viewMode, displayList.length]);

  const handleFilterChange = (nextFilter: ExperienceFilter) => {
    setActiveFilter(nextFilter);
    setActiveIndex(0);
    setHoveredItem(null);
  };

  const handleEditorialMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorialContainerRef.current) return;
    const rect = editorialContainerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const current = displayList[safeIndex];
  const hasValidImage = Boolean(current.image && !failedImages[current.id]);
  const progressPercent = ((safeIndex + 1) / displayList.length) * 100;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-curve -mt-8 relative z-30 py-20 md:py-24 px-6 md:px-12 bg-obsidian text-[#F2EFE9] border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.8)] overflow-x-clip"
    >
      {/* Grid Teknis Halus Tema Hitam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto">
        {/* Top Statement Header + View Mode Switcher */}
        <div className="exp-entrance section-reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-amber-400 uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>EXPERIENCE · JAKARTA TIMUR &amp; UIN JAKARTA</span>
              </div>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F2EFE9] tracking-tight leading-[1.1] max-w-xl">
                Shipped from years of{" "}
                <span className="text-amber-400">curiosity</span>, code &amp;{" "}
                <span className="text-accent">leadership</span>.
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/15 flex items-center justify-center text-amber-300 transition-transform duration-300 hover:-translate-y-0.5">
                <Code2 className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/15 flex items-center justify-center text-neutral-300 transition-transform duration-300 hover:-translate-y-0.5">
                <Shield className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/15 flex items-center justify-center text-neutral-300 transition-transform duration-300 hover:-translate-y-0.5">
                <BarChart3 className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:items-end gap-3">
            <div
              role="group"
              aria-label="Switch experience layout mode"
              className="inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/15 self-start lg:self-end"
            >
              <button
                type="button"
                onClick={() => {
                  setViewMode("corkboard");
                  setHoveredItem(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-bold text-[10px] tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === "corkboard"
                    ? "bg-accent text-white shadow-[0_0_20px_rgba(255,77,0,0.4)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Pin className="w-3 h-3" />
                <span>Spotlight View</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("editorial")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-bold text-[10px] tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === "editorial"
                    ? "bg-accent text-white shadow-[0_0_20px_rgba(255,77,0,0.4)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Detail &amp; Hover Reveal</span>
              </button>
            </div>

            <div className="lg:text-right">
              <p className="font-sans font-bold text-[10px] tracking-[0.18em] text-neutral-400 uppercase leading-relaxed">
                WE DON&apos;T JUST WRITE CODE
                <br />
                WE ENGINEER RELIABLE SYSTEMS
              </p>
              <div className="mt-2.5 flex flex-wrap lg:justify-end gap-2">
                {["SECURE", "DATA-DRIVEN", "LEADERSHIP"].map((pill, i) => (
                  <span
                    key={pill}
                    className={`font-sans font-bold text-[10px] tracking-[0.14em] px-3 py-1 rounded-full border transition-colors ${
                      i === 0
                        ? "border-amber-400/35 text-amber-300 bg-amber-400/10"
                        : "border-white/15 text-neutral-300 bg-white/[0.02]"
                    }`}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* v.3 Category Filter Bar + Live Index Counter */}
        <div className="exp-entrance section-reveal-item mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-neutral-300 uppercase">
            <Filter className="w-3.5 h-3.5 text-accent" />
            <span>FILTER TRACK RECORD ({displayList.length})</span>
            <span className="text-amber-400 font-bold">
              · 0{safeIndex + 1} / 0{displayList.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: "all", label: "All Entries" },
                { key: "work", label: "Work Internships" },
                { key: "leadership", label: "Senate & Events" },
                { key: "community", label: "GDGOC Community" },
              ] as const
            ).map((tab) => {
              const selected = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleFilterChange(tab.key)}
                  className={`px-3.5 py-1.5 rounded-full font-sans font-bold text-[10px] tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                    selected
                      ? "bg-amber-400 text-obsidian shadow-[0_0_16px_rgba(251,191,36,0.28)]"
                      : "bg-[#141414] text-neutral-300 hover:text-amber-300 border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* MODE 1: OBSIDIAN SPOTLIGHT CARD + NUMBERED LIST */}
        {viewMode === "corkboard" && (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="exp-entrance section-reveal-item mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
          >
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {displayList.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Select ${item.title}`}
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsPaused(true);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === safeIndex
                          ? "w-8 bg-accent"
                          : "w-2 bg-white/25 hover:bg-amber-300/60"
                      }`}
                    />
                  ))}
                </div>

                <div className="relative rounded-2xl bg-[#141414] border border-white/[0.12] hover:border-amber-400/40 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-colors duration-300">
                  <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10 font-mono text-[10px] tracking-[0.16em] text-neutral-400 uppercase">
                    <span className="inline-flex items-center gap-2 font-bold text-amber-400">
                      <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span>
                        0{safeIndex + 1} · {current.chapter}
                      </span>
                    </span>
                    <span className="text-neutral-300">{current.period}</span>
                  </div>

                  {hasValidImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-white/10 mb-4 bg-black select-none group/img">
                      <div className="masking-tape w-14 h-3.5 absolute top-2 left-4 -rotate-3 opacity-80 z-10 pointer-events-none" />
                      <img
                        src={current.image}
                        alt={current.slotLabel || current.title}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [current.id]: true,
                          }))
                        }
                        className="w-full h-44 sm:h-48 object-cover block transition-transform duration-500 group-hover/img:scale-[1.03] select-none pointer-events-none"
                      />
                    </div>
                  ) : (
                    <div className="h-44 sm:h-48 rounded-xl bg-white/[0.03] border border-dashed border-white/15 flex flex-col items-center justify-center p-4 text-center mb-4">
                      <Camera className="w-7 h-7 text-amber-400/75 mb-1.5" />
                      <span className="font-sans text-[10px] font-bold tracking-wider text-neutral-200 uppercase">
                        {current.slotLabel}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-500 mt-0.5">
                        Empty slot — add photo later
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-neutral-400">
                      <MapPin className="w-3 h-3 text-accent" />
                      {current.location}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/35 text-accent font-mono text-[9px] font-extrabold tracking-[0.12em] uppercase">
                      {current.badge}
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-sans font-extrabold text-lg sm:text-xl text-white leading-snug">
                    {current.role}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {current.summary}
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-white/10 flex items-start gap-2 font-sans font-bold text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                    <span>{current.metrics}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2.5 font-sans font-bold text-[10px] tracking-[0.18em] text-neutral-500 uppercase">
                  <span>DESIGN WITH INTENT. BUILD WITH SOUL.</span>
                  <span className="text-amber-400">
                    0{safeIndex + 1} / 0{displayList.length}
                  </span>
                </div>
                <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden mb-1">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="h-full bg-gradient-to-r from-amber-400 to-accent transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between divide-y divide-white/10 border-b border-white/10">
                {displayList.map((item, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => {
                        setActiveIndex(idx);
                        setIsPaused(true);
                      }}
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsPaused(true);
                      }}
                      className={`w-full text-left py-2.5 sm:py-3 px-3 flex items-center justify-between gap-4 transition-all duration-200 group cursor-pointer ${
                        isActive
                          ? "bg-white/[0.04] border-l-2 border-accent"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className={`font-display text-2xl sm:text-3xl leading-none shrink-0 transition-colors duration-200 ${
                            isActive
                              ? "text-amber-400"
                              : "text-neutral-600 group-hover:text-amber-300/75"
                          }`}
                        >
                          0{idx + 1}
                        </span>

                        <div className="min-w-0">
                          <span
                            className={`block font-sans font-bold text-[9px] sm:text-[10px] tracking-[0.16em] uppercase mb-0.5 transition-colors ${
                              isActive ? "text-accent" : "text-neutral-500"
                            }`}
                          >
                            {item.chapter} ({item.period})
                          </span>
                          <span
                            className={`font-sans font-extrabold text-base sm:text-xl md:text-2xl tracking-tight leading-tight transition-all duration-200 truncate block ${
                              isActive
                                ? "text-white translate-x-1.5"
                                : "text-neutral-500 group-hover:text-neutral-200"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={`w-5 h-5 shrink-0 transition-all duration-200 ${
                          isActive
                            ? "opacity-100 text-accent translate-x-0"
                            : "opacity-0 -translate-x-2 text-neutral-500"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: DETAIL & HOVER REVEAL */}
        {viewMode === "editorial" && (
          <div
            ref={editorialContainerRef}
            onMouseMove={handleEditorialMouseMove}
            onMouseLeave={() => setHoveredItem(null)}
            className="exp-entrance section-reveal-item relative mt-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 font-mono text-[10px] tracking-[0.16em] text-neutral-400 uppercase">
              <span>
                CHAPTER 02 · EXPERIENCE ARCHIVE (01–0{displayList.length})
              </span>
              <span className="text-amber-400/90">
                HOVER OR TAP ANY ENTRY TO REVEAL PHOTO
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {displayList.map((item, idx) => {
                const isHovered = hoveredItem?.id === item.id;
                const itemHasValidImg = Boolean(
                  item.image && !failedImages[item.id]
                );

                return (
                  <article
                    key={item.id}
                    tabIndex={0}
                    onMouseEnter={() => setHoveredItem(item)}
                    onFocus={() => setHoveredItem(item)}
                    onClick={() =>
                      setHoveredItem((prev) =>
                        prev?.id === item.id ? null : item
                      )
                    }
                    className={`group relative py-4 sm:py-5 px-3 sm:px-4 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent ${
                      isHovered
                        ? "bg-white/[0.04] border border-white/10"
                        : "hover:bg-white/[0.025]"
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-start">
                      <div className="lg:col-span-4 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`font-display text-2xl sm:text-[26px] leading-none transition-colors duration-200 ${
                              isHovered
                                ? "text-amber-400"
                                : "text-neutral-500 group-hover:text-amber-400"
                            }`}
                          >
                            {idx + 1}.
                          </span>
                          <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-neutral-400 uppercase">
                            {item.period}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-block px-2 py-0.5 rounded bg-accent/15 border border-accent/30 text-accent font-sans font-extrabold text-[9px] tracking-[0.12em] uppercase">
                            {item.badge}
                          </span>
                          <span className="inline-flex items-center gap-1 font-sans text-[11px] text-neutral-400">
                            <MapPin className="w-3 h-3 text-accent" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <div className="lg:col-span-8">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3
                              className={`font-sans font-extrabold text-lg sm:text-xl tracking-tight leading-snug transition-colors duration-200 ${
                                isHovered
                                  ? "text-amber-300"
                                  : "text-[#F2EFE9] group-hover:text-white"
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p className="font-sans font-bold text-xs text-accent">
                              {item.role}
                            </p>
                          </div>

                          <ArrowUpRight
                            className={`w-4 h-4 shrink-0 mt-1 transition-all duration-200 ${
                              isHovered
                                ? "text-amber-400 translate-x-0.5 -translate-y-0.5"
                                : "text-neutral-600 group-hover:text-amber-400"
                            }`}
                          />
                        </div>

                        <p className="mt-1.5 font-sans text-xs sm:text-[13px] text-neutral-300 leading-snug max-w-3xl">
                          {item.summary}
                        </p>

                        <div className="mt-2 pt-2 border-t border-white/[0.08] flex items-center gap-1.5 font-sans font-bold text-[11px] sm:text-xs text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                          <span>{item.metrics}</span>
                        </div>

                        {isHovered && (
                          <div className="mt-3 lg:hidden rounded-xl overflow-hidden border border-white/15 bg-[#161616] p-2 select-none">
                            {itemHasValidImg ? (
                              <img
                                src={item.image}
                                alt={item.slotLabel || item.title}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                onError={() =>
                                  setFailedImages((prev) => ({
                                    ...prev,
                                    [item.id]: true,
                                  }))
                                }
                                className="w-full h-44 object-cover rounded-lg block select-none pointer-events-none"
                              />
                            ) : (
                              <div className="h-36 rounded-lg bg-white/[0.03] border border-dashed border-white/15 flex flex-col items-center justify-center p-3 text-center">
                                <Camera className="w-5 h-5 text-amber-400 mb-1" />
                                <span className="font-sans text-[10px] font-bold tracking-wider text-neutral-300 uppercase">
                                  {item.slotLabel}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {hoveredItem && (
              <div
                aria-hidden="true"
                style={{
                  transform: `translate3d(${Math.min(
                    Math.max(cursorPos.x + 24, 12),
                    Math.max(
                      (editorialContainerRef.current?.clientWidth ?? 1120) - 340,
                      12
                    )
                  )}px, ${Math.max(cursorPos.y - 110, 12)}px, 0)`,
                }}
                className="pointer-events-none hidden lg:block absolute top-0 left-0 z-40 w-80 rounded-2xl bg-[#161616]/95 backdrop-blur-md border border-amber-400/30 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-transform duration-150 ease-out select-none"
              >
                {hoveredItem.image && !failedImages[hoveredItem.id] ? (
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src={hoveredItem.image}
                      alt={hoveredItem.slotLabel || hoveredItem.title}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [hoveredItem.id]: true,
                        }))
                      }
                      className="w-full h-44 object-cover block select-none pointer-events-none"
                    />
                  </div>
                ) : (
                  <div className="h-44 rounded-xl bg-white/[0.04] border border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-center">
                    <Camera className="w-6 h-6 text-amber-400 mb-1.5" />
                    <span className="font-sans text-[10px] font-bold tracking-wider text-neutral-200 uppercase">
                      {hoveredItem.slotLabel}
                    </span>
                  </div>
                )}

                <div className="mt-2.5 px-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] tracking-[0.14em] text-amber-400 uppercase truncate">
                    {hoveredItem.slotLabel}
                  </span>
                  <span className="font-sans font-bold text-[9px] text-neutral-400 shrink-0">
                    {hoveredItem.period}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}