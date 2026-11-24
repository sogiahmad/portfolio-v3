"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, X, Layers } from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type ProjectFilter = "all" | "fullstack" | "security";

const STRIP_ITEMS = [
  "NEXT.JS & PRISMA ORM",
  "CVSS 7.5 SECURITY AUDIT",
  "PYTHON FLASK & MYSQL",
  "RBAC & BCRYPT AUTH",
  "RSPJ · MEGA BAJA · DIMSKUY",
];

const FALLBACK_THREE_DOTS = ["#10B981", "#FBBF24", "#FF4D00"];

function matchesProjectFilter(
  project: ProjectItem,
  filter: ProjectFilter
): boolean {
  if (filter === "all") return true;
  const cat = project.category.toUpperCase();
  if (filter === "security") {
    return cat.includes("SECURITY") || cat.includes("CYBER");
  }
  return !cat.includes("SECURITY") && !cat.includes("CYBER");
}

function getThreeDistinctDots(palette?: string[]): string[] {
  const base = Array.isArray(palette) ? palette.filter(Boolean) : [];
  const result = [...base];
  for (const fb of FALLBACK_THREE_DOTS) {
    if (result.length >= 3) break;
    if (!result.includes(fb)) {
      result.push(fb);
    }
  }
  return result.slice(0, 3);
}

export default function ProjectsStack() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [filterAnimTick, setFilterAnimTick] = useState(0);
  const [cardSpotlights, setCardSpotlights] = useState<
    Record<string, { x: number; y: number; active: boolean }>
  >({});

  const visibleProjects = PROJECTS_DATA.filter((proj) =>
    matchesProjectFilter(proj, activeFilter)
  );
  const listToRender =
    visibleProjects.length > 0 ? visibleProjects : PROJECTS_DATA;
  const safeActiveIdx = Math.min(activeCardIdx, listToRender.length - 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header-entrance", {
        y: 36,
        opacity: 0,
        duration: 0.78,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
      });

      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 45%",
          onEnter: () => setActiveCardIdx(index),
          onEnterBack: () => setActiveCardIdx(index),
        });

        if (index === cards.length - 1) return;
        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.94,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 82%",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    projectId: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)
    );

    setCardSpotlights((prev) => ({
      ...prev,
      [projectId]: { x, y, active: true },
    }));
  };

  const handleCardMouseLeave = (projectId: string) => {
    setCardSpotlights((prev) => ({
      ...prev,
      [projectId]: {
        x: prev[projectId]?.x ?? 50,
        y: prev[projectId]?.y ?? 20,
        active: false,
      },
    }));
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="section-curve -mt-10 relative z-20 pt-20 pb-28 md:pt-28 md:pb-36 px-6 md:px-12 bg-obsidian border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.65)] overflow-x-clip"
    >
      {/* Latar Jakarta Skyline 3 Diam (Fixed) Tanpa Celah & Tanpa Mematikan Sticky Cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 [clip-path:inset(0_round_2.25rem_2.25rem_0_0)] md:[clip-path:inset(0_round_3.5rem_3.5rem_0_0)]"
      >
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.14] grayscale contrast-125"
          style={{ backgroundImage: "url('/images/jakarta-skyline3.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/50 to-obsidian/90" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-[1180px] mx-auto">
        <div className="projects-header-entrance section-reveal-item text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 font-sans font-bold text-[11px] tracking-[0.2em] text-neutral-400 uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>SELECTED WORK · V.3</span>
            <span
              key={`counter-${activeFilter}-${safeActiveIdx}`}
              style={{ animation: "counterPop 0.28s ease-out" }}
              className="text-amber-400 font-mono"
            >
              · 0{safeActiveIdx + 1} / 0{listToRender.length}
            </span>
          </div>
          <h2 className="font-display uppercase text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.03em] heading-metallic">
            PROJECTS
          </h2>

          {/* v.3 Quick Category Filter */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2">
            {(
              [
                { key: "all", label: "All Projects" },
                { key: "fullstack", label: "Full-Stack & Systems" },
                { key: "security", label: "Security Audit" },
              ] as const
            ).map((tab) => {
              const isSelected = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.key);
                    setActiveCardIdx(0);
                    setFilterAnimTick((prev) => prev + 1);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[10px] font-bold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 text-obsidian shadow-[0_0_18px_rgba(251,191,36,0.3)] scale-[1.02]"
                      : "bg-white/[0.04] text-neutral-300 hover:text-amber-300 border border-white/10"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Container Kartu Ramping di Tengah */}
      <div
        key={`list-${activeFilter}-${filterAnimTick}`}
        className="relative z-10 max-w-[920px] mx-auto"
      >
        <div className="relative space-y-10 md:space-y-14 pb-8">
          {listToRender.map((project, index) => {
            const topOffset = 88 + index * 20;
            const isCurrentCard = index === safeActiveIdx;
            const spot = cardSpotlights[project.id];
            const threeDots = getThreeDistinctDots(project.palette);

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onMouseMove={(e) => handleCardMouseMove(e, project.id)}
                onMouseLeave={() => handleCardMouseLeave(project.id)}
                style={{
                  top: `${topOffset}px`,
                  animation: `projectCardReveal 0.48s cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(index * 0.08, 0.24)}s both`,
                }}
                className={`group/card relative sticky rounded-[1.75rem] bg-[#141414] border p-6 sm:p-8 md:p-9 shadow-[0_-18px_50px_rgba(0,0,0,0.85)] transition-colors duration-300 will-change-transform overflow-hidden ${
                  isCurrentCard
                    ? "border-amber-400/40"
                    : "border-white/[0.12] hover:border-white/25"
                }`}
              >
                {/* Garis Kilau Emas / Oranye Tipis di Tepi Atas Card Aktif */}
                <div
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #FBBF24, #FF4D00, transparent)",
                  }}
                  className={`pointer-events-none absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300 ${
                    isCurrentCard
                      ? "opacity-90"
                      : "opacity-0 group-hover/card:opacity-60"
                  }`}
                />

                {/* Spotlight Cahaya Halus Mengikuti Kursor di Dalam Card */}
                <div
                  aria-hidden="true"
                  style={{
                    opacity: spot?.active ? 1 : 0,
                    background: `radial-gradient(360px circle at ${spot?.x ?? 50}% ${spot?.y ?? 20}%, rgba(251, 191, 36, 0.09), rgba(255, 77, 0, 0.04) 40%, transparent 72%)`,
                  }}
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
                />

                {/* Compact Precision Header */}
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-start sm:items-center gap-5 md:gap-6">
                    <span
                      className={`font-display text-5xl sm:text-6xl md:text-7xl leading-none select-none shrink-0 transition-all duration-300 ${
                        isCurrentCard
                          ? "text-amber-400/85 scale-[1.03]"
                          : "text-[#3D3D3D] group-hover/card:text-amber-300/50"
                      }`}
                    >
                      {project.number}
                    </span>

                    <div>
                      <p className="font-sans font-bold text-[11px] tracking-[0.18em] text-accent uppercase">
                        {project.category} · {project.year}
                      </p>
                      <h3 className="mt-1 font-sans font-extrabold text-lg sm:text-xl md:text-2xl text-white tracking-tight uppercase">
                        {project.title}
                      </h3>

                      {/* Sub / Tags dengan Animasi Gerak Seperti About & Services */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tag}
                            style={{
                              animation: `subTagMotion 3.2s ease-in-out ${tIdx * 0.35}s infinite`,
                            }}
                            className="relative overflow-hidden font-mono font-bold text-[10px] tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-amber-400/25 text-amber-100/90 hover:text-amber-300 hover:border-amber-400/65 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                animation: `subTagShimmer 3.6s ease-in-out ${tIdx * 0.45}s infinite`,
                              }}
                              className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-amber-300/25 to-transparent"
                            />
                            <span className="relative z-10">{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: 3 Titik Beda Warna Gonta-Ganti + Tombol CASE DETAILS */}
                  <div className="flex items-center gap-3.5 self-start lg:self-center shrink-0">
                    {/* 3 Titik Berbeda Warna dengan Gerakan & Gonta-Ganti Warna */}
                    <div
                      title="Color Cycle Indicators"
                      className="hidden sm:flex items-center gap-2 mr-0.5"
                    >
                      {threeDots.map((hex, dIdx) => (
                        <span
                          key={`${project.id}-dot-${dIdx}`}
                          style={{
                            backgroundColor: hex,
                            boxShadow: `0 0 8px ${hex}66`,
                            animation: `threeDotWave 2.2s ease-in-out ${dIdx * 0.32}s infinite, dotHueCycle 6.6s linear ${dIdx * 1.1}s infinite`,
                          }}
                          className="w-2.5 h-2.5 rounded-full border border-white/25"
                        />
                      ))}
                    </div>

                    {/* Tombol CASE DETAILS dengan Efek Border Berputar Mengelilingi (seperti DEPLOY MODULE) */}
                    <div className="relative rounded-full p-[1.5px] overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.14)] hover:shadow-[0_0_28px_rgba(255,77,0,0.35)] transition-shadow duration-300">
                      <span
                        aria-hidden="true"
                        style={{
                          animation: "caseOrbitSpin 2.8s linear infinite",
                          background:
                            "conic-gradient(from 0deg, transparent 0%, #FBBF24 22%, #FF4D00 42%, transparent 66%)",
                        }}
                        className="pointer-events-none absolute -inset-8 block"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="group relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#151210] hover:bg-accent text-white font-sans font-bold text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 cursor-pointer"
                      >
                        <span>CASE DETAILS</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2-Column Pure Image Tanpa Bezel Hitam, Fit Sesuai Rasio Asli & Rounded */}
                <div className="relative z-10 mt-7 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {project.images.map((imgSrc, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => setSelectedProject(project)}
                      className="relative rounded-2xl border border-white/10 overflow-hidden group cursor-pointer hover:border-accent/60 transition-colors"
                    >
                      <div className="masking-tape w-12 h-3 absolute -top-1 left-5 -rotate-3 opacity-75 z-10 pointer-events-none" />

                      <img
                        src={imgSrc}
                        alt={project.slotLabels[sIdx] || project.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.endsWith(".jpg")) {
                            target.src = target.src.replace(/\.jpg$/, ".jpeg");
                          }
                        }}
                        className={`w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                          isCurrentCard ? "scale-[1.012]" : "scale-100"
                        }`}
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-sans font-semibold text-[10px] tracking-[0.14em] text-neutral-200 uppercase">
                          {project.slotLabels[sIdx]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Strip Marquee Kecil di Bagian Bawah Section (Pause saat Hover) */}
        <div className="group/marquee mt-10 rounded-full bg-white/[0.03] hover:border-amber-400/25 border border-white/10 py-2.5 overflow-hidden select-none transition-colors">
          <div className="flex w-max animate-marquee-left group-hover/marquee:[animation-play-state:paused] items-center">
            {[...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS].map(
              (item, idx) => (
                <div key={idx} className="flex items-center gap-5 pr-5 shrink-0">
                  <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-neutral-300 uppercase">
                    {item}
                  </span>
                  <span className="text-amber-400 text-[10px]">▲</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{ animation: "modalBackdropFade 0.22s ease-out forwards" }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              animation:
                "modalCardPop 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#161616] border border-white/15 p-6 sm:p-9 text-white shadow-2xl overflow-hidden"
          >
            <div
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #FBBF24, #FF4D00, transparent)",
              }}
              className="absolute top-0 inset-x-0 h-[2px] opacity-85"
            />

            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-accent flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans font-bold text-xs tracking-[0.18em] text-accent uppercase">
              PROJECT {selectedProject.number} · {selectedProject.year}
            </span>
            <h3 className="mt-2 font-sans font-extrabold text-2xl sm:text-3xl uppercase">
              {selectedProject.title}
            </h3>
            <p className="mt-1 font-sans text-xs text-neutral-400">
              {selectedProject.subtitle}
            </p>

            <p className="mt-5 font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
              {selectedProject.summary}
            </p>

            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="font-sans font-bold text-xs tracking-[0.15em] text-neutral-400 uppercase mb-3">
                KEY ENGINEERING &amp; SECURITY IMPACT
              </h4>
              <ul className="space-y-2.5">
                {selectedProject.impact.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-neutral-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="font-sans font-semibold text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
              >
                <span>VIEW PROFILE / REPO</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes projectCardReveal {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes counterPop {
          0% {
            opacity: 0.35;
            transform: translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes subTagMotion {
          0%,
          100% {
            transform: translateY(0px);
            border-color: rgba(251, 191, 36, 0.22);
          }
          50% {
            transform: translateY(-2px);
            border-color: rgba(251, 191, 36, 0.58);
          }
        }

        @keyframes subTagShimmer {
          0% {
            transform: translateX(0%) skewX(-12deg);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          100% {
            transform: translateX(340%) skewX(-12deg);
            opacity: 0;
          }
        }

        @keyframes threeDotWave {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.25);
          }
        }

        @keyframes dotHueCycle {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(95deg);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }

        @keyframes caseOrbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes modalBackdropFade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes modalCardPop {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}