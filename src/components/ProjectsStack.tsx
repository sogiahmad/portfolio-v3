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

export default function ProjectsStack() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [activeCardIdx, setActiveCardIdx] = useState(0);

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
            <span className="text-amber-400 font-mono">
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
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[10px] font-bold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 text-obsidian shadow-[0_0_18px_rgba(251,191,36,0.3)]"
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
      <div className="relative z-10 max-w-[920px] mx-auto">
        <div className="relative space-y-10 md:space-y-14 pb-8">
          {listToRender.map((project, index) => {
            const topOffset = 88 + index * 20;
            const isCurrentCard = index === safeActiveIdx;
            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                style={{ top: `${topOffset}px` }}
                className={`sticky rounded-[1.75rem] bg-[#141414] border p-6 sm:p-8 md:p-9 shadow-[0_-18px_50px_rgba(0,0,0,0.85)] transition-colors duration-300 will-change-transform ${
                  isCurrentCard
                    ? "border-amber-400/35"
                    : "border-white/[0.12] hover:border-white/25"
                }`}
              >
                {/* Compact Precision Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-start sm:items-center gap-5 md:gap-6">
                    <span
                      className={`font-display text-5xl sm:text-6xl md:text-7xl leading-none select-none shrink-0 transition-colors duration-300 ${
                        isCurrentCard ? "text-amber-400/80" : "text-[#3D3D3D]"
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
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-sans font-semibold text-[10px] tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                    <div
                      title="Project Color Swatch"
                      className="hidden sm:flex items-center gap-1 mr-1"
                    >
                      {project.palette.map((hex) => (
                        <span
                          key={hex}
                          className="w-2.5 h-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-accent hover:bg-accent text-white font-sans font-bold text-[11px] tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>CASE DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>

                {/* 2-Column Pure Image Tanpa Bezel Hitam, Fit Sesuai Rasio Asli & Rounded */}
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
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
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
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

        {/* Strip Marquee Kecil di Bagian Bawah Section (Ala Referensi Video) */}
        <div className="mt-10 rounded-full bg-white/[0.03] border border-white/10 py-2.5 overflow-hidden select-none">
          <div className="flex w-max animate-marquee-left items-center">
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-[#161616] border border-white/15 p-6 sm:p-9 text-white shadow-2xl"
          >
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
    </section>
  );
}