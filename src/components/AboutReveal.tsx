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

function BlueprintGearSvg({
  teeth,
  spokes,
  sizePx,
  phaseOffsetDeg = 0,
  spinAnim,
  className,
  style,
}: {
  teeth: number;
  spokes: number;
  sizePx: number;
  phaseOffsetDeg?: number;
  spinAnim: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cx = 160;
  const cy = 160;
  const rootR = 114;
  const tipR = 125;
  const outerRimInnerR = 98;
  const hubOuterR = 44;
  const hubInnerR = 32;
  const boreR = 14;

  const stepDeg = 360 / teeth;
  const topHalf = (stepDeg * 0.24 * Math.PI) / 180;
  const baseHalf = (stepDeg * 0.34 * Math.PI) / 180;

  const toothPaths = Array.from({ length: teeth }).map((_, idx) => {
    const rad = ((idx * stepDeg - 90) * Math.PI) / 180;
    const x1 = cx + rootR * Math.cos(rad - baseHalf);
    const y1 = cy + rootR * Math.sin(rad - baseHalf);
    const x2 = cx + tipR * Math.cos(rad - topHalf);
    const y2 = cy + tipR * Math.sin(rad - topHalf);
    const x3 = cx + tipR * Math.cos(rad + topHalf);
    const y3 = cy + tipR * Math.sin(rad + topHalf);
    const x4 = cx + rootR * Math.cos(rad + baseHalf);
    const y4 = cy + rootR * Math.sin(rad + baseHalf);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} L ${x4.toFixed(2)} ${y4.toFixed(2)}`;
  });

  const spokeGapDeg = 360 / spokes;
  const spokeHalfDeg = Math.min(9, spokeGapDeg * 0.16);

  return (
    <div
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          transform: `rotate(${phaseOffsetDeg}deg)`,
        }}
        className="w-full h-full"
      >
        <svg
          viewBox="0 0 320 320"
          style={{ animation: spinAnim }}
          className="w-full h-full block"
          fill="none"
        >
          <circle
            cx={cx}
            cy={cy}
            r={rootR}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            cx={cx}
            cy={cy}
            r={rootR - 5}
            stroke="currentColor"
            strokeWidth="0.65"
            strokeOpacity="0.65"
          />
          <circle
            cx={cx}
            cy={cy}
            r={outerRimInnerR}
            stroke="currentColor"
            strokeWidth="1.15"
          />
          <circle
            cx={cx}
            cy={cy}
            r={outerRimInnerR - 4}
            stroke="currentColor"
            strokeWidth="0.65"
            strokeDasharray="3 4"
            strokeOpacity="0.7"
          />

          {toothPaths.map((d, idx) => (
            <path
              key={`tooth-${idx}`}
              d={d}
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />
          ))}

          {Array.from({ length: spokes }).map((_, idx) => {
            const centerAngle = idx * spokeGapDeg;
            return (
              <g
                key={`spoke-${idx}`}
                transform={`rotate(${centerAngle} ${cx} ${cy})`}
              >
                <line
                  x1={cx - 6}
                  y1={cy - hubOuterR + 1}
                  x2={cx - 5}
                  y2={cy - outerRimInnerR - 1}
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <line
                  x1={cx + 6}
                  y1={cy - hubOuterR + 1}
                  x2={cx + 5}
                  y2={cy - outerRimInnerR - 1}
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <line
                  x1={cx}
                  y1={cy - hubOuterR - 4}
                  x2={cx}
                  y2={cy - outerRimInnerR + 4}
                  stroke="currentColor"
                  strokeWidth="0.55"
                  strokeDasharray="2 3"
                  strokeOpacity="0.65"
                />
                <line
                  x1={cx}
                  y1={cy - tipR - 2}
                  x2={cx}
                  y2={cy - tipR - 9}
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeOpacity="0.7"
                  transform={`rotate(${spokeHalfDeg * 2.2} ${cx} ${cy})`}
                />
              </g>
            );
          })}

          <circle
            cx={cx}
            cy={cy}
            r={hubOuterR}
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <circle
            cx={cx}
            cy={cy}
            r={hubInnerR}
            stroke="currentColor"
            strokeWidth="0.85"
          />
          <circle
            cx={cx}
            cy={cy}
            r={boreR}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1={cx - boreR * 0.65}
            y1={cy - boreR * 0.65}
            x2={cx + boreR * 0.65}
            y2={cy + boreR * 0.65}
            stroke="currentColor"
            strokeWidth="0.85"
          />
          <line
            x1={cx + boreR * 0.65}
            y1={cy - boreR * 0.65}
            x2={cx - boreR * 0.65}
            y2={cy + boreR * 0.65}
            stroke="currentColor"
            strokeWidth="0.85"
          />
        </svg>
      </div>
    </div>
  );
}

function getZeroInitialMetric(value: string): string {
  const match = value.match(/^([^\d.-]*)([\d,.]+)([^\d]*)$/);
  if (!match) return value;
  const [, prefix, numRaw, suffix] = match;
  const cleanNumStr = numRaw.replace(/,/g, "");
  const decimalPart = cleanNumStr.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  const zeroStr = decimals > 0 ? (0).toFixed(decimals) : "0";
  return `${prefix}${zeroStr}${suffix}`;
}

function renderColoredMetricText(text: string) {
  return Array.from(text).map((ch, idx) => {
    const isNumber = /^[0-9]$/.test(ch);
    return (
      <span
        key={`${idx}-${ch}`}
        className={isNumber ? "text-accent" : "text-amber-300"}
      >
        {ch}
      </span>
    );
  });
}

function MetricCountUpValue({
  value,
  countTick,
}: {
  value: string;
  countTick: number;
}) {
  const [displayText, setDisplayText] = useState<string>(() =>
    getZeroInitialMetric(value)
  );

  useEffect(() => {
    const zeroInitial = getZeroInitialMetric(value);

    if (countTick === 0) {
      setDisplayText(zeroInitial);
      return;
    }

    const match = value.match(/^([^\d.-]*)([\d,.]+)([^\d]*)$/);
    if (!match) {
      setDisplayText(value);
      return;
    }

    const [, prefix, numRaw, suffix] = match;
    const cleanNumStr = numRaw.replace(/,/g, "");
    const targetNum = parseFloat(cleanNumStr);
    if (Number.isNaN(targetNum)) {
      setDisplayText(value);
      return;
    }

    const decimalPart = cleanNumStr.split(".")[1];
    const decimals = decimalPart ? decimalPart.length : 0;
    const duration = 1850;
    const startTime = performance.now();
    let frameId = 0;

    setDisplayText(zeroInitial);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 2.3);
      const currentVal = targetNum * eased;

      const formatted =
        decimals > 0
          ? currentVal.toFixed(decimals)
          : String(Math.round(currentVal));

      setDisplayText(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayText(value);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value, countTick]);

  return (
    <span className="inline-flex items-baseline justify-center font-display text-3xl md:text-4xl tracking-tight tabular-nums">
      {renderColoredMetricText(displayText)}
    </span>
  );
}

export default function AboutReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsBoxRef = useRef<HTMLDivElement>(null);
  const eduBoxRef = useRef<HTMLDivElement>(null);
  const eduCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [cardCountTicks, setCardCountTicks] = useState<number[]>(() =>
    PROFILE_DATA.metrics.map(() => 0)
  );
  const [hoveredMetricIdx, setHoveredMetricIdx] = useState<number | null>(null);
  const [hoveredEduIdx, setHoveredEduIdx] = useState<number | null>(null);
  const [boxSpotlight, setBoxSpotlight] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({ x: 50, y: 20, active: false });

  const words = PROFILE_DATA.aboutParagraph.split(" ");

  const triggerAllMetricsCount = () => {
    setCardCountTicks((prev) => prev.map((t) => t + 1));
  };

  const triggerSingleMetricCount = (targetIdx: number) => {
    setCardCountTicks((prev) =>
      prev.map((t, idx) => (idx === targetIdx ? t + 1 : t))
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-entrance", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 84%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (metricsBoxRef.current) {
        ScrollTrigger.create({
          trigger: metricsBoxRef.current,
          start: "top 86%",
          onEnter: () => triggerAllMetricsCount(),
          onEnterBack: () => triggerAllMetricsCount(),
        });
      }

      const validEduCards = eduCardsRef.current.filter(Boolean);
      if (validEduCards.length > 0 && eduBoxRef.current) {
        validEduCards.forEach((card, i) => {
          const fromX = i === 0 ? -25 : 25;
          gsap.fromTo(
            card,
            { x: fromX, y: 12, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.95,
              delay: i * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: eduBoxRef.current,
                start: "top 88%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
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
          scrub: 0.85,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTextBoxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)
    );
    setBoxSpotlight({ x, y, active: true });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-curve -mt-6 relative z-10 py-16 md:py-24 px-6 md:px-12 bg-obsidian border-t border-white/[0.12] overflow-hidden"
    >
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none"
      >
        <div className="hidden sm:block absolute -top-20 -right-20 w-[385px] h-[335px]">
          <BlueprintGearSvg
            teeth={52}
            spokes={6}
            sizePx={285}
            phaseOffsetDeg={0}
            spinAnim="aboutGearCW 64s linear infinite"
            className="absolute top-0 right-0 text-amber-400/[0.1]"
          />
          <BlueprintGearSvg
            teeth={28}
            spokes={5}
            sizePx={152}
            phaseOffsetDeg={6.4}
            spinAnim="aboutGearCCW 34.4s linear infinite"
            className="absolute top-[160px] right-[185px] text-amber-300/[0.1]"
          />
        </div>

        <div className="hidden md:block absolute -bottom-20 -left-20 w-[420px] h-[340px]">
          <BlueprintGearSvg
            teeth={44}
            spokes={6}
            sizePx={230}
            phaseOffsetDeg={0}
            spinAnim="aboutGearCCW 54s linear infinite"
            className="absolute bottom-0 left-0 text-amber-400/[0.1]"
          />
          <BlueprintGearSvg
            teeth={28}
            spokes={5}
            sizePx={150}
            phaseOffsetDeg={6.4}
            spinAnim="aboutGearCW 34.4s linear infinite"
            className="absolute bottom-[4px] left-[162px] text-amber-300/[0.1]"
          />
          <BlueprintGearSvg
            teeth={22}
            spokes={4}
            sizePx={112}
            phaseOffsetDeg={8.2}
            spinAnim="aboutGearCCW 27s linear infinite"
            className="absolute bottom-[162px] left-[98px] text-amber-200/[0.095]"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto">
        <div className="about-entrance section-reveal-item text-center mb-8 md:mb-10">
          <h2 className="font-display uppercase text-[clamp(3rem,8.5vw,7rem)] leading-[0.92] tracking-[-0.03em] heading-metallic">
            ABOUT ME
          </h2>
        </div>

        <div
          ref={textBoxRef}
          onMouseMove={handleTextBoxMouseMove}
          onMouseLeave={() =>
            setBoxSpotlight((prev) => ({ ...prev, active: false }))
          }
          className="about-entrance section-reveal-item relative max-w-3xl mx-auto px-6 sm:px-9 md:px-11 py-6 md:py-8 rounded-3xl bg-black/20 border border-white/[0.12] overflow-hidden"
        >
          <span
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, transparent, #FBBF24, #FF4D00, transparent)",
              animation: "aboutTopSweep 4.5s ease-in-out infinite",
            }}
            className="pointer-events-none absolute top-0 inset-x-0 h-[1.5px] opacity-75"
          />

          <div
            aria-hidden="true"
            style={{
              opacity: boxSpotlight.active ? 1 : 0,
              background: `radial-gradient(320px circle at ${boxSpotlight.x}% ${boxSpotlight.y}%, rgba(251, 191, 36, 0.08), transparent 70%)`,
            }}
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          />

          <div className="masking-tape w-20 h-5 absolute -top-2.5 left-8 -rotate-6 opacity-80" />
          <div className="masking-tape w-20 h-5 absolute -top-2.5 right-8 rotate-6 opacity-80" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.08] text-[10px] font-mono tracking-[0.14em] text-neutral-400 uppercase">
            <span className="inline-flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              JAKARTA, INDONESIA
            </span>
          </div>

          <p className="relative z-10 font-sans text-left sm:text-center text-base sm:text-lg md:text-[20px] font-semibold leading-[1.58] tracking-[-0.01em]">
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
                  triggerSingleMetricCount(idx);
                }}
                onMouseLeave={() => setHoveredMetricIdx(null)}
                className="group relative rounded-2xl bg-black/50 border border-white/[0.1] px-5 py-4 text-center hover:border-amber-400/45 transition-all duration-500 ease-out overflow-hidden cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #FBBF24, #FF4D00, transparent)",
                  }}
                  className={`absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300 ${
                    isHovered
                      ? "opacity-100"
                      : "opacity-35 group-hover:opacity-80"
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

                <MetricCountUpValue
                  value={metric.value}
                  countTick={cardCountTicks[idx] ?? 0}
                />

                <span className="mt-1 block font-sans font-semibold text-[10px] tracking-[0.15em] text-neutral-300 uppercase">
                  {metric.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Education Snapshot Cards - Warna Permukaan Disamakan dengan Card Angka */}
        <div
          ref={eduBoxRef}
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          {PROFILE_DATA.education.map((edu, idx) => {
            const isEduHovered = hoveredEduIdx === idx;
            return (
              <div
                key={idx}
                ref={(el) => {
                  eduCardsRef.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredEduIdx(idx)}
                onMouseLeave={() => setHoveredEduIdx(null)}
                className="group relative rounded-2xl p-[1.5px] overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-0.5 will-change-transform"
              >
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
                  className="pointer-events-none absolute -inset-24 block transition-opacity duration-300 opacity-100"
                />

                <div className="relative z-10 h-full rounded-[15px] bg-black/50 border border-white/[0.1] group-hover:border-amber-400/45 p-4 sm:p-5 flex items-start gap-4 overflow-hidden transition-colors duration-500 ease-out">
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
        @keyframes aboutGearCW {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes aboutGearCCW {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes aboutTopSweep {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.95;
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