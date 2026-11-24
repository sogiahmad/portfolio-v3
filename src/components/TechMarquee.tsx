"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Database,
  Code2,
  FileCode2,
  Palette,
  BarChart3,
  Award,
  Terminal,
  GitBranch,
  ShieldCheck,
  Server,
  Pause,
  Play,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type TechCategory = "all" | "stack" | "certifications";

interface TechTile {
  id: string;
  label: string;
  category: "stack" | "certifications";
  iconType:
    | "db"
    | "js"
    | "php"
    | "html"
    | "css"
    | "data"
    | "cert"
    | "backend"
    | "git"
    | "security";
  accentClass: string;
}

const TECH_TILES: TechTile[] = [
  {
    id: "mysql",
    label: "MYSQL",
    category: "stack",
    iconType: "db",
    accentClass: "text-sky-400",
  },
  {
    id: "javascript",
    label: "JAVASCRIPT",
    category: "stack",
    iconType: "js",
    accentClass: "text-amber-300",
  },
  {
    id: "php",
    label: "PHP",
    category: "stack",
    iconType: "php",
    accentClass: "text-indigo-400",
  },
  {
    id: "html5",
    label: "HTML5",
    category: "stack",
    iconType: "html",
    accentClass: "text-accent",
  },
  {
    id: "css3",
    label: "CSS3",
    category: "stack",
    iconType: "css",
    accentClass: "text-cyan-400",
  },
  {
    id: "cisco-data",
    label: "CISCO DATA ANALYTICS",
    category: "certifications",
    iconType: "data",
    accentClass: "text-amber-400",
  },
  {
    id: "bnsp",
    label: "BNSP PROGRAMMER",
    category: "certifications",
    iconType: "cert",
    accentClass: "text-emerald-400",
  },
  {
    id: "gdgoc-be",
    label: "GDGOC BACK-END",
    category: "certifications",
    iconType: "backend",
    accentClass: "text-violet-400",
  },
  {
    id: "git-github",
    label: "GIT & GITHUB",
    category: "stack",
    iconType: "git",
    accentClass: "text-orange-400",
  },
  {
    id: "security-audit",
    label: "SECURITY AUDIT",
    category: "certifications",
    iconType: "security",
    accentClass: "text-rose-400",
  },
];

function renderTileIcon(iconType: TechTile["iconType"], accentClass: string) {
  const cls = `w-6 h-6 ${accentClass}`;
  switch (iconType) {
    case "db":
      return <Database className={cls} />;
    case "js":
      return <Terminal className={cls} />;
    case "php":
      return <Code2 className={cls} />;
    case "html":
      return <FileCode2 className={cls} />;
    case "css":
      return <Palette className={cls} />;
    case "data":
      return <BarChart3 className={cls} />;
    case "cert":
      return <Award className={cls} />;
    case "backend":
      return <Server className={cls} />;
    case "git":
      return <GitBranch className={cls} />;
    case "security":
      return <ShieldCheck className={cls} />;
  }
}

export default function CoreTechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<TechCategory>("all");
  const [isPaused, setIsPaused] = useState(false);
  const [filterTick, setFilterTick] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".marquee-entrance", {
        y: 36,
        opacity: 0,
        duration: 0.75,
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

  const filtered =
    filter === "all"
      ? TECH_TILES
      : TECH_TILES.filter((item) => item.category === filter);

  const baseList = filtered.length > 0 ? filtered : TECH_TILES;
  const topRowItems = [...baseList, ...baseList, ...baseList];
  const bottomRowItems = [
    ...baseList.slice().reverse(),
    ...baseList.slice().reverse(),
    ...baseList.slice().reverse(),
  ];

  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-obsidian border-t border-white/10 overflow-hidden"
    >
      {/* Grid Teknis Samar ala Referensi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="marquee-entrance section-reveal-item flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-400 uppercase">
            CORE TECH STACK &amp; CERTIFICATIONS
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: "all", label: "ALL" },
                { key: "stack", label: "TECH STACK" },
                { key: "certifications", label: "CERTIFICATIONS" },
              ] as const
            ).map((tab) => {
              const isSelected = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setFilter(tab.key);
                    setFilterTick((prev) => prev + 1);
                  }}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-accent text-white shadow-[0_0_18px_rgba(255,77,0,0.45)]"
                      : "bg-white/[0.04] text-neutral-400 hover:text-amber-300 hover:border-amber-400/50 hover:bg-amber-400/10 hover:shadow-[0_0_14px_rgba(251,191,36,0.28)] border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Resume marquee" : "Pause marquee"}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-amber-400/10 hover:text-amber-300 hover:border-amber-400/50 hover:shadow-[0_0_14px_rgba(251,191,36,0.28)] border border-white/15 font-mono text-[10px] font-bold tracking-[0.14em] text-neutral-300 uppercase transition-all duration-200 cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-accent" />
                  <span>PLAY</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-accent" />
                  <span>PAUSE</span>
                </>
              )}
            </button>

            <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-neutral-400 uppercase">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isPaused ? "bg-neutral-500" : "bg-accent animate-pulse"
                }`}
              />
              <span>2022 TO 2026</span>
            </span>
          </div>
        </div>
      </div>

      {/* Jalur 1: Bergerak ke Kiri */}
      <div
        key={`top-track-${filter}-${filterTick}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ animation: "trackFadeIn 0.35s ease-out" }}
        className="marquee-entrance section-reveal-item relative z-10 overflow-hidden py-2"
      >
        <div
          style={{
            animation: "marqueeLeft 28s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
          className="flex w-max gap-4 px-6"
        >
          {topRowItems.map((tile, i) => {
            const isCert = tile.category === "certifications";
            return (
              <div
                key={`top-${tile.id}-${i}`}
                className="w-56 sm:w-64 shrink-0 rounded-2xl bg-[#141414]/90 border border-white/10 p-5 flex flex-col items-center justify-center gap-3"
              >
                {/* Badge dengan border setengah saja (bagian atas & kanan) */}
                <span
                  className={`relative self-end -mt-2 -mr-1 font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-0.5 rounded-full overflow-hidden ${
                    isCert
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-white/[0.04] text-neutral-300"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      animation: `halfBadgeSweep 3.2s ease-in-out ${(i % 4) * 0.35}s infinite`,
                    }}
                    className="pointer-events-none absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full border-t border-r border-amber-300/80"
                  />
                  <span className="relative z-10">
                    {isCert ? "CERT" : "STACK"}
                  </span>
                </span>

                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {renderTileIcon(tile.iconType, tile.accentClass)}
                </div>

                <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-neutral-200 uppercase text-center">
                  {tile.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Jalur 2: Bergerak ke Kanan (Berlawanan Arah) */}
      <div
        key={`bottom-track-${filter}-${filterTick}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ animation: "trackFadeIn 0.35s ease-out" }}
        className="marquee-entrance section-reveal-item relative z-10 overflow-hidden py-2 mt-2"
      >
        <div
          style={{
            animation: "marqueeRight 32s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
          className="flex w-max gap-4 px-6"
        >
          {bottomRowItems.map((tile, i) => {
            const isCert = tile.category === "certifications";
            return (
              <div
                key={`bottom-${tile.id}-${i}`}
                className="w-56 sm:w-64 shrink-0 rounded-2xl bg-[#141414]/90 border border-white/10 p-5 flex flex-col items-center justify-center gap-3"
              >
                {/* Badge dengan border setengah saja (bagian atas & kanan) */}
                <span
                  className={`relative self-end -mt-2 -mr-1 font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-0.5 rounded-full overflow-hidden ${
                    isCert
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-white/[0.04] text-neutral-300"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      animation: `halfBadgeSweep 3.2s ease-in-out ${(i % 4) * 0.35}s infinite`,
                    }}
                    className="pointer-events-none absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full border-t border-r border-amber-300/80"
                  />
                  <span className="relative z-10">
                    {isCert ? "CERT" : "STACK"}
                  </span>
                </span>

                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {renderTileIcon(tile.iconType, tile.accentClass)}
                </div>

                <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-neutral-200 uppercase text-center">
                  {tile.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translate3d(-33.333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes trackFadeIn {
          0% {
            opacity: 0.4;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes halfBadgeSweep {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.04);
          }
        }
      `}</style>
    </section>
  );
}