"use client";

import { useEffect, useRef, useState } from "react";
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

function SlotDigitChar({
  char,
  rollTick,
  digitIndex,
}: {
  char: string;
  rollTick: number;
  digitIndex: number;
}) {
  const isDigit = /^[0-9]$/.test(char);
  const [displayChar, setDisplayChar] = useState<string>(char);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    if (!isDigit) {
      setDisplayChar(char);
      return;
    }

    if (rollTick === 0) {
      setDisplayChar(char);
      return;
    }

    let interval: ReturnType<typeof setInterval> | null = null;
    const totalSteps = 8 + (digitIndex % 2) * 2;
    const startDelay = digitIndex * 120;

    const startTimeout = setTimeout(() => {
      setIsRolling(true);
      let step = 0;

      interval = setInterval(() => {
        step += 1;
        if (step >= totalSteps) {
          if (interval) clearInterval(interval);
          setDisplayChar(char);
          setIsRolling(false);
        } else {
          const nextDigit = String(
            (Number(char) + step * 3 + digitIndex) % 10
          );
          setDisplayChar(nextDigit);
        }
      }, 95);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [char, isDigit, rollTick, digitIndex]);

  if (!isDigit) {
    return <span className="inline-block text-amber-300/90">{char}</span>;
  }

  return (
    <span className="relative inline-block overflow-hidden align-baseline leading-none">
      <span
        style={{
          animation: isRolling
            ? "slotDigitRoll 0.26s ease-in-out infinite"
            : "slotSettlePop 0.35s ease-out",
        }}
        className={`inline-block will-change-transform ${
          isRolling ? "text-amber-300" : "text-accent"
        }`}
      >
        {displayChar}
      </span>
    </span>
  );
}

function MetricSlotValue({
  value,
  rollTick,
}: {
  value: string;
  rollTick: number;
}) {
  const chars = Array.from(value);
  let digitCounter = 0;

  return (
    <span className="inline-flex items-baseline justify-center font-display text-3xl md:text-4xl tracking-tight">
      {chars.map((ch, idx) => {
        const isNum = /^[0-9]$/.test(ch);
        const currentDigitIdx = isNum ? digitCounter++ : 0;
        return (
          <SlotDigitChar
            key={`${idx}-${ch}`}
            char={ch}
            rollTick={rollTick}
            digitIndex={currentDigitIdx}
          />
        );
      })}
    </span>
  );
}

export default function AboutReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsBoxRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // State mandiri untuk tiap kartu metrik agar tidak ikut bergerak semua saat hover 1 kartu
  const [cardRollTicks, setCardRollTicks] = useState<number[]>(() =>
    PROFILE_DATA.metrics.map(() => 0)
  );
  const [hoveredMetricIdx, setHoveredMetricIdx] = useState<number | null>(null);
  const [hoveredEduIdx, setHoveredEduIdx] = useState<number | null>(null);

  const words = PROFILE_DATA.aboutParagraph.split(" ");

  const triggerAllMetricsRoll = () => {
    setCardRollTicks((prev) => prev.map((t) => t + 1));
  };

  const triggerSingleMetricRoll = (targetIdx: number) => {
    setCardRollTicks((prev) =>
      prev.map((t, idx) => (idx === targetIdx ? t + 1 : t))
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-entrance", {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (metricsBoxRef.current) {
        ScrollTrigger.create({
          trigger: metricsBoxRef.current,
          start: "top 85%",
          onEnter: () => triggerAllMetricsRoll(),
          onEnterBack: () => triggerAllMetricsRoll(),
        });
      }

      const validWords = wordsRef.current.filter(Boolean);
      gsap.set(validWords, { opacity: 0.14 });

      gsap.to(validWords, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: textBoxRef.current,
          start: "top 68%",
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
      className="section-curve -mt-6 relative z-10 py-16 md:py-24 px-6 md:px-12 bg-obsidian border-t border-white/[0.12] overflow-hidden"
    >
      {/* Latar Jakarta Skyline 2 Digelapkan Senada dengan Section Lain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src="/images/jakarta-skyline2.jpg"
          alt=""
          className="w-full h-full object-cover object-top opacity-[0.13] grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/65 to-obsidian" />
      </div>

      {/* Garis Telemetry Halus untuk Mengisi Ruang Samping Secara Seimbang */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-12 left-6 xl:left-12 hidden md:flex flex-col justify-between items-center z-[1] opacity-30"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] text-amber-300/80 -rotate-90 origin-center">
          SYS.02
        </span>
        <span className="w-[1px] flex-1 my-6 bg-gradient-to-b from-transparent via-amber-400/35 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-12 right-6 xl:right-12 hidden md:flex flex-col justify-between items-center z-[1] opacity-30"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
        <span className="w-[1px] flex-1 my-6 bg-gradient-to-b from-transparent via-amber-400/35 to-transparent" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-amber-300/80 rotate-90 origin-center">
          IDX.23
        </span>
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto">
        {/* Section Heading */}
        <div className="about-entrance section-reveal-item text-center mb-8 md:mb-10">
          <h2 className="font-display uppercase text-[clamp(3rem,8.5vw,7rem)] leading-[0.92] tracking-[-0.03em] heading-metallic">
            ABOUT ME
          </h2>
        </div>

        {/* Kotak Transparan Ramping */}
        <div
          ref={textBoxRef}
          className="about-entrance section-reveal-item relative max-w-3xl mx-auto px-6 sm:px-9 md:px-11 py-6 md:py-8 rounded-3xl bg-transparent border border-white/[0.12]"
        >
          <div className="masking-tape w-20 h-5 absolute -top-2.5 left-8 -rotate-6 opacity-80" />
          <div className="masking-tape w-20 h-5 absolute -top-2.5 right-8 rotate-6 opacity-80" />

          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.08] text-[10px] font-mono tracking-[0.14em] text-neutral-400 uppercase">
            <span className="inline-flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              JAKARTA, INDONESIA
            </span>
          </div>

          <p className="font-sans text-left sm:text-center text-base sm:text-lg md:text-[20px] font-semibold leading-[1.58] tracking-[-0.01em]">
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

        {/* 3 Key Metrics Cards - Masing-Masing Berdiri Sendiri */}
        <div
          ref={metricsBoxRef}
          className="about-entrance section-reveal-item mt-7 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {PROFILE_DATA.metrics.map((metric, idx) => {
            const isHovered = hoveredMetricIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => {
                  setHoveredMetricIdx(idx);
                  triggerSingleMetricRoll(idx);
                }}
                onMouseLeave={() => setHoveredMetricIdx(null)}
                className="group relative rounded-2xl bg-black/50 border border-white/[0.1] px-5 py-4 text-center hover:border-amber-400/45 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #FBBF24, #FF4D00, transparent)",
                  }}
                  className={`absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-35 group-hover:opacity-80"
                  }`}
                />

                <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.16em] text-neutral-400 mb-1.5">
                  <span>0{idx + 1}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-amber-300 transition-transform duration-300 ${
                      isHovered
                        ? "scale-125 shadow-[0_0_8px_#FBBF24]"
                        : "opacity-75"
                    }`}
                  />
                </div>

                <MetricSlotValue
                  value={metric.value}
                  rollTick={cardRollTicks[idx] ?? 0}
                />

                <span className="mt-1 block font-sans font-semibold text-[10px] tracking-[0.15em] text-neutral-300 uppercase">
                  {metric.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Education Snapshot Cards dengan Efek Border Mengelilingi + Gelembung saat Hover */}
        <div className="about-entrance section-reveal-item mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {PROFILE_DATA.education.map((edu, idx) => {
            const isEduHovered = hoveredEduIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredEduIdx(idx)}
                onMouseLeave={() => setHoveredEduIdx(null)}
                className="group relative rounded-2xl p-[1.5px] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
              >
                {/* Border Cahaya Emas Berputar Mengelilingi Card saat Hover (seperti DEPLOY MODULE) */}
                <span
                  aria-hidden="true"
                  style={{
                    animation: isEduHovered
                      ? "eduOrbitBorder 3.2s linear infinite"
                      : undefined,
                    background: isEduHovered
                      ? "conic-gradient(from 0deg, transparent 0%, #FBBF24 20%, #FF4D00 38%, transparent 62%)"
                      : "rgba(255, 255, 255, 0.1)",
                  }}
                  className={`pointer-events-none absolute -inset-24 block transition-opacity duration-300 ${
                    isEduHovered ? "opacity-100" : "opacity-100"
                  }`}
                />

                {/* Isi Card Pendidikan */}
                <div className="relative z-10 h-full rounded-[15px] bg-[#0F0F12]/95 p-4 sm:p-5 flex items-start gap-4 overflow-hidden">
                  {/* Gelembung-Gelembung Cahaya Naik saat Hover */}
                  {isEduHovered && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden"
                    >
                      <span
                        style={{
                          animation: "eduBubbleFloat 2.1s ease-out infinite",
                        }}
                        className="absolute bottom-2 left-8 w-2 h-2 rounded-full bg-amber-300/60 blur-[0.5px]"
                      />
                      <span
                        style={{
                          animation:
                            "eduBubbleFloat 2.6s ease-out 0.45s infinite",
                        }}
                        className="absolute bottom-1 left-24 w-3 h-3 rounded-full border border-amber-300/50 bg-amber-400/15"
                      />
                      <span
                        style={{
                          animation:
                            "eduBubbleFloat 2.3s ease-out 0.85s infinite",
                        }}
                        className="absolute bottom-2 right-16 w-2 h-2 rounded-full bg-orange-400/55"
                      />
                      <span
                        style={{
                          animation:
                            "eduBubbleFloat 2.8s ease-out 1.2s infinite",
                        }}
                        className="absolute bottom-1 right-6 w-2.5 h-2.5 rounded-full border border-amber-200/45 bg-amber-300/15"
                      />
                    </div>
                  )}

                  <div className="relative z-10 w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-300/50">
                    <GraduationCap className="w-5 h-5 text-accent group-hover:text-amber-300 transition-colors" />
                  </div>

                  <div className="relative z-10">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-amber-400/90 uppercase">
                      {edu.period}
                    </span>
                    <h3 className="mt-0.5 font-sans font-extrabold text-sm md:text-base text-white">
                      {edu.institution}
                    </h3>
                    <p className="font-sans font-semibold text-xs text-neutral-300 mt-0.5">
                      {edu.degree}
                    </p>
                    <p className="font-sans text-xs text-neutral-400 mt-1 leading-relaxed">
                      {edu.note}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slotDigitRoll {
          0% {
            transform: translateY(-30%);
            opacity: 0.65;
          }
          50% {
            transform: translateY(0%);
            opacity: 1;
          }
          100% {
            transform: translateY(30%);
            opacity: 0.65;
          }
        }

        @keyframes slotSettlePop {
          0% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes eduOrbitBorder {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes eduBubbleFloat {
          0% {
            transform: translateY(0px) scale(0.75);
            opacity: 0;
          }
          25% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-76px) scale(1.15);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}