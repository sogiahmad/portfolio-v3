"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT_TOKENS = new Set([
  "Syauqi",
  "Ahmad,",
  "UIN",
  "Syarif",
  "Hidayatullah",
  "Jakarta",
  "Rumah",
  "Sakit",
  "Pertamina",
  "Jaya.",
  "(CVSS",
  "7.5),",
]);

export default function AboutReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = PROFILE_DATA.aboutParagraph.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-entrance", {
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%",
    toggleActions: "play reverse play reverse",
  },
});

      const validWords = wordsRef.current.filter(Boolean);

      gsap.set(validWords, { opacity: 0.14 });

      gsap.to(validWords, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: textBoxRef.current,
          start: "top 65%",
          end: "bottom 58%",
          scrub: 0.7,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-curve -mt-6 relative z-10 py-24 md:py-36 px-6 md:px-12 bg-obsidian border-t border-white/[0.12] overflow-hidden"
    >
      {/* Latar Jakarta Skyline 2 Digelapkan Senada dengan Section Lain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/images/jakarta-skyline2.jpg"
          alt=""
          className="w-full h-full object-cover object-top opacity-[0.13] grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/65 to-obsidian" />
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto">
        {/* Section Eyebrow + Massive Heading */}
        <div className="about-entrance section-reveal-item text-center mb-12 md:mb-16">
          <h2 className="font-display uppercase text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.03em] heading-metallic">
            ABOUT ME
          </h2>
        </div>

        {/* Kotak Transparan Ramping */}
        <div
          ref={textBoxRef}
          className="about-entrance section-reveal-item relative max-w-3xl mx-auto px-6 sm:px-10 md:px-12 py-8 md:py-10 rounded-3xl bg-transparent border border-white/[0.12]"
        >
          <div className="masking-tape w-20 h-5 absolute -top-2.5 left-8 -rotate-6 opacity-80" />
          <div className="masking-tape w-20 h-5 absolute -top-2.5 right-8 rotate-6 opacity-80" />

          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/[0.08] text-[10px] font-mono tracking-[0.14em] text-neutral-400 uppercase">
            <span className="inline-flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              JAKARTA, INDONESIA
            </span>
          </div>

          <p className="font-sans text-left sm:text-center text-base sm:text-lg md:text-[21px] font-semibold leading-[1.6] tracking-[-0.01em]">
            {words.map((word, index) => {
              const isHighlight = HIGHLIGHT_TOKENS.has(word);
              return (
                <span
                  key={index}
                  ref={(el) => {
                    wordsRef.current[index] = el;
                  }}
                  style={{ opacity: 0.14 }}
                  className={`inline-block mr-[0.28em] will-change-[opacity] ${
                    isHighlight ? "text-amber-300" : "text-[#F5F3EF]"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* 3 Key Metrics Cards */}
        <div className="about-entrance section-reveal-item mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {PROFILE_DATA.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-black/45 border border-white/[0.1] px-6 py-5 text-center hover:border-amber-400/40 transition-colors"
            >
              <span className="block font-display text-3xl md:text-4xl text-accent tracking-tight">
                {metric.value}
              </span>
              <span className="mt-1.5 block font-sans font-semibold text-[10px] tracking-[0.16em] text-neutral-300 uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Education Snapshot Cards */}
        <div className="about-entrance section-reveal-item mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {PROFILE_DATA.education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-black/45 border border-white/[0.1] p-5 flex items-start gap-4 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.16em] text-amber-400/90 uppercase">
                  {edu.period}
                </span>
                <h3 className="mt-0.5 font-sans font-extrabold text-sm md:text-base text-white">
                  {edu.institution}
                </h3>
                <p className="font-sans font-semibold text-xs text-neutral-300 mt-0.5">
                  {edu.degree}
                </p>
                <p className="font-sans text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {edu.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}