"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowUpRight,
  ArrowDown,
  ShieldCheck,
  Sparkles,
  RotateCw,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolio";

type PoseKey = "center" | "left" | "right" | "up" | "smile" | "sakit";

const POSE_SOURCES: Record<PoseKey, string> = {
  center: "/images/pose-center.jpg",
  left: "/images/pose-left.jpg",
  right: "/images/pose-right.jpg",
  up: "/images/pose-up.jpg",
  smile: "/images/pose-smile.jpg",
  sakit: "/images/pose-sakit.jpg",
};

const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=sogiahmad123@gmail.com";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const floatWrapperRef = useRef<HTMLDivElement>(null);
  const cardBodyRef = useRef<HTMLDivElement>(null);
  const aduhBubbleRef = useRef<HTMLDivElement>(null);
  const pullBadgeRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const sparkleLayerRef = useRef<HTMLDivElement>(null);
  const contactTextRef = useRef<HTMLSpanElement>(null);
  const contactArrowRef = useRef<HTMLSpanElement>(null);
  const orbitArrowRef = useRef<HTMLSpanElement>(null);
  const poseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingPoseRef = useRef<PoseKey>("center");

  const [activePose, setActivePose] = useState<PoseKey>("center");
  const [isPhotoHurt, setIsPhotoHurt] = useState(false);
  const [isNewPullVisible, setIsNewPullVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [contactPhase, setContactPhase] = useState<
    "idle" | "sliding" | "orbiting"
  >("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      if (floatWrapperRef.current) {
        gsap.to(floatWrapperRef.current, {
          y: -8,
          rotation: -1.2,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
      if (poseTimerRef.current) clearTimeout(poseTimerRef.current);
      if (contactTimerRef.current) clearTimeout(contactTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isPhotoHurt || !aduhBubbleRef.current) return;
    gsap.fromTo(
      aduhBubbleRef.current,
      { scale: 0.3, opacity: 0, y: 10, rotation: -12 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotation: -6,
        duration: 0.4,
        ease: "back.out(2.2)",
      }
    );
  }, [isPhotoHurt]);

  useEffect(() => {
    if (!isNewPullVisible || !pullBadgeRef.current) return;
    gsap.fromTo(
      pullBadgeRef.current,
      { scale: 0.55, opacity: 0, y: 8, rotation: -6 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotation: 6,
        duration: 0.42,
        ease: "back.out(2.4)",
      }
    );
  }, [isNewPullVisible]);

  const queueSmoothPose = (nextPose: PoseKey) => {
    if (pendingPoseRef.current === nextPose) return;
    pendingPoseRef.current = nextPose;

    if (poseTimerRef.current) {
      clearTimeout(poseTimerRef.current);
    }

    poseTimerRef.current = setTimeout(() => {
      setActivePose(nextPose);
    }, 90);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPhotoHurt || isSpinning) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const u = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const normX = u * 2 - 1;
    const normY = v * 2 - 1;

    gsap.to(cardBodyRef.current, {
      rotateX: Number((-normY * 10).toFixed(2)),
      rotateY: Number((normX * 12).toFixed(2)),
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (v < 0.26) {
      queueSmoothPose("up");
    } else if (u < 0.34) {
      queueSmoothPose("left");
    } else if (u > 0.66) {
      queueSmoothPose("right");
    } else {
      queueSmoothPose("smile");
    }
  };

  const handlePhotoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (poseTimerRef.current) clearTimeout(poseTimerRef.current);
    setIsPhotoHurt((prev) => !prev);
  };

  const triggerCardSpinPull = () => {
    if (poseTimerRef.current) clearTimeout(poseTimerRef.current);

    setIsNewPullVisible(true);
    setIsSpinning(true);

    if (shimmerRef.current) {
      gsap.killTweensOf(shimmerRef.current);
      gsap.fromTo(
        shimmerRef.current,
        { xPercent: -155, opacity: 0.95 },
        {
          xPercent: 155,
          opacity: 0,
          duration: 1.05,
          ease: "power2.inOut",
        }
      );
    }

    if (sparkleLayerRef.current) {
      gsap.killTweensOf(sparkleLayerRef.current);
      gsap.fromTo(
        sparkleLayerRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1.04,
          duration: 0.55,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        }
      );
    }

    if (cardBodyRef.current) {
      gsap.killTweensOf(cardBodyRef.current);
      gsap.fromTo(
        cardBodyRef.current,
        { rotateY: 0, rotateX: 0, scale: 0.95 },
        {
          rotateY: 360,
          rotateX: 3,
          scale: 1,
          duration: 1.05,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(cardBodyRef.current, { rotateY: 0, rotateX: 0 });
            setIsSpinning(false);
          },
        }
      );
    } else {
      setTimeout(() => setIsSpinning(false), 1050);
    }
  };

  const handleCardMouseLeave = () => {
    if (poseTimerRef.current) clearTimeout(poseTimerRef.current);
    pendingPoseRef.current = "center";
    setIsPhotoHurt(false);
    setIsNewPullVisible(false);
    setIsSpinning(false);
    setActivePose("center");

    if (!isSpinning && cardBodyRef.current) {
      gsap.to(cardBodyRef.current, {
        rotateX: 0,
        rotateY: -2,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (contactPhase !== "idle") return;

    setContactPhase("sliding");

    if (contactTextRef.current) {
      gsap.killTweensOf(contactTextRef.current);
      gsap.fromTo(
        contactTextRef.current,
        { x: 0, opacity: 1 },
        {
          x: 42,
          opacity: 0.45,
          duration: 4,
          ease: "power1.inOut",
        }
      );
    }

    if (contactArrowRef.current) {
      gsap.killTweensOf(contactArrowRef.current);
      gsap.fromTo(
        contactArrowRef.current,
        { x: 0, opacity: 1 },
        {
          x: 44,
          opacity: 0.35,
          duration: 4,
          ease: "power1.inOut",
        }
      );
    }

    if (contactTimerRef.current) clearTimeout(contactTimerRef.current);
    contactTimerRef.current = setTimeout(() => {
      setContactPhase("orbiting");

      setTimeout(() => {
        const opened = window.open(
          GMAIL_COMPOSE_URL,
          "_blank",
          "noopener,noreferrer"
        );
        if (!opened) {
          window.location.href = "mailto:sogiahmad123@gmail.com";
        }

        if (contactTextRef.current) {
          gsap.killTweensOf(contactTextRef.current);
          gsap.set(contactTextRef.current, { x: 0, opacity: 1 });
        }
        if (contactArrowRef.current) {
          gsap.killTweensOf(contactArrowRef.current);
          gsap.set(contactArrowRef.current, { x: 0, opacity: 1 });
        }
        setContactPhase("idle");
      }, 1150);
    }, 4000);
  };

  const currentPose: PoseKey = isPhotoHurt ? "sakit" : activePose;

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen bg-obsidian pt-24 pb-12 px-6 md:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Latar Gelap Jakarta Skyline 1 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <img
          src="/images/jakarta-skyline1.jpg"
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="w-full h-full object-cover object-center opacity-[0.16] grayscale contrast-125 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/55 to-obsidian" />
      </div>

      {/* DKV Decorative Cutting Mat Corner Strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-24 w-72 h-72 cutting-mat-bg opacity-20 rotate-12 rounded-xl border border-emerald-400/30 hidden lg:block z-0"
      />

      {/* Top Meta Bar */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-1 hero-stagger">
        <span className="font-sans font-semibold text-[11px] md:text-xs tracking-[0.18em] text-neutral-400 uppercase">
          {PROFILE_DATA.location}
        </span>
      </div>

      {/* Main Headline + Interactive 3D Spin DKV Lanyard ID Card */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center Massive Headline */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="hero-stagger inline-block mb-3 relative">
            <div className="masking-tape w-16 h-4 absolute -top-2 left-6 -rotate-3 z-10" />
            <div className="torn-strip bg-cream text-obsidian px-4 py-1.5 font-hand text-lg md:text-xl font-bold tracking-wide shadow-md -rotate-1">
              UIN Jakarta • Information Systems &apos;23
            </div>
          </div>

          <h1 className="hero-stagger font-display uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(3.3rem,10.2vw,9rem)] select-none">
            <span className="block heading-metallic">HI, I&apos;M</span>
            <span className="block text-accent">{PROFILE_DATA.brand}</span>
          </h1>
        </div>

        {/* Right Interactive DKV Lanyard ID Card */}
        <div
          className="lg:col-span-4 xl:col-span-3 flex flex-col items-start lg:items-end hero-stagger"
          style={{ perspective: "1200px" }}
        >
          <div ref={floatWrapperRef} className="relative">
            {isPhotoHurt && (
              <div
                ref={aduhBubbleRef}
                aria-live="polite"
                className="pointer-events-none absolute -top-12 -left-12 z-30 select-none"
              >
                <div className="relative bg-white text-obsidian border-[3px] border-obsidian rounded-[999px] px-4 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.65)]">
                  <span className="absolute -top-2.5 left-3 w-4 h-4 rounded-full bg-white border-t-[3px] border-l-[3px] border-obsidian" />
                  <span className="absolute -top-3 right-4 w-5 h-5 rounded-full bg-white border-t-[3px] border-r-[3px] border-obsidian" />
                  <span className="relative z-10 font-display text-base tracking-wider text-accent uppercase drop-shadow-[1px_1px_0px_#0D0D0D]">
                    ADUH!
                  </span>
                  <span className="absolute -bottom-2.5 right-4 w-3 h-3 rounded-full bg-white border-2 border-obsidian" />
                  <span className="absolute -bottom-4 right-2 w-2 h-2 rounded-full bg-white border-2 border-obsidian" />
                </div>
              </div>
            )}

            {isNewPullVisible && (
              <div
                ref={pullBadgeRef}
                className="pointer-events-none absolute -top-5 -right-5 z-30 select-none inline-flex items-center gap-1 rounded-full bg-accent text-white border-2 border-white/85 px-2.5 py-1 font-mono text-[10px] font-extrabold tracking-wider uppercase shadow-lg rotate-6"
              >
                <Sparkles className="w-3 h-3" />
                <span>NEW PULL!</span>
              </div>
            )}

            <div
              ref={cardBodyRef}
              role="button"
              tabIndex={0}
              aria-label="Spin kartu 360 derajat"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={triggerCardSpinPull}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  triggerCardSpinPull();
                }
              }}
              onDragStart={(e) => e.preventDefault()}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-64 bg-[#F5F2EB] text-obsidian rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-2 border-white/85 cursor-pointer select-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <div
                ref={shimmerRef}
                aria-hidden="true"
                style={{ opacity: 0 }}
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-accent/45 via-amber-300/80 to-white/95 z-30 mix-blend-screen"
              />

              <div
                ref={sparkleLayerRef}
                aria-hidden="true"
                style={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 z-20"
              >
                <span className="absolute top-12 left-6 w-2.5 h-2.5 rotate-45 bg-amber-300 shadow-[0_0_12px_#FF4D00]" />
                <span className="absolute top-20 right-7 w-3 h-3 rotate-45 bg-white shadow-[0_0_14px_#F59E0B]" />
                <span className="absolute bottom-24 left-10 w-2 h-2 rotate-45 bg-accent shadow-[0_0_10px_#FF4D00]" />
                <span className="absolute bottom-16 right-9 w-2.5 h-2.5 rotate-45 bg-amber-200 shadow-[0_0_12px_#FFFFFF]" />
              </div>

              <div className="mx-auto -mt-7 mb-2 w-12 h-5 bg-neutral-300 rounded-t-md border border-neutral-400 flex items-center justify-center shadow">
                <div className="w-6 h-1.5 bg-obsidian rounded-full" />
              </div>

              <div className="bg-[#1D5BC6] text-white rounded-t-xl px-3 py-2 text-center">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-extrabold">
                  HELLO
                </p>
                <p className="font-hand text-sm leading-none">my name is</p>
              </div>

              <div
                onClick={handlePhotoClick}
                onDragStart={(e) => e.preventDefault()}
                title="Klik foto untuk ekspresi ADUH!"
                className="relative bg-[#151515] border-x border-neutral-300 h-52 overflow-hidden select-none"
              >
                {(Object.keys(POSE_SOURCES) as PoseKey[]).map((key) => {
                  const isCurrent = currentPose === key;
                  return (
                    <img
                      key={key}
                      src={POSE_SOURCES[key]}
                      alt={`${PROFILE_DATA.fullName} - ${key}`}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      style={{
                        transitionProperty: "opacity, transform",
                        transitionDuration: isPhotoHurt ? "260ms" : "700ms",
                        transitionTimingFunction:
                          "cubic-bezier(0.25, 0.1, 0.25, 1)",
                      }}
                      className={`absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none will-change-[opacity,transform] ${
                        isCurrent
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-[1.015] z-0"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="bg-white border-x border-b border-neutral-300 rounded-b-xl px-3 py-2.5 text-center relative">
                <p className="font-display text-lg tracking-tight text-obsidian leading-tight">
                  {PROFILE_DATA.fullName}
                </p>
                <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] font-sans font-bold text-emerald-800 bg-emerald-100 rounded-full px-2.5 py-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>BNSP &amp; CISCO CERTIFIED</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerCardSpinPull();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-accent border border-white/15 hover:border-accent text-neutral-200 hover:text-white font-mono text-[10px] font-bold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer"
              >
                <RotateCw
                  className={`w-3 h-3 ${isSpinning ? "animate-spin" : ""}`}
                />
                <span>SPIN 360° PULL</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Row */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 hero-stagger">
        <p className="font-sans font-medium text-xs md:text-[13px] leading-relaxed tracking-[0.08em] text-neutral-300 max-w-md uppercase">
          {PROFILE_DATA.heroTagline}
        </p>

        <a
          href="#marquee"
          className="hidden md:flex flex-col items-center gap-1 font-sans font-semibold text-[10px] tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
        >
          <span>SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-accent" />
        </a>

        <div className="relative inline-flex items-center justify-center">
          <button
            type="button"
            onClick={handleContactClick}
            disabled={contactPhase !== "idle"}
            className="group relative overflow-hidden inline-flex items-center justify-center min-w-[215px] bg-accent hover:bg-accent-hover disabled:opacity-95 text-white font-sans text-xs md:text-sm font-bold tracking-[0.12em] uppercase px-7 py-4 rounded-full shadow-[0_0_30px_rgba(255,77,0,0.4)] hover:shadow-[0_0_45px_rgba(255,77,0,0.65)] transition-all duration-300 cursor-pointer"
          >
            <span className="inline-flex items-center gap-2.5">
              <span ref={contactTextRef} className="inline-block">
                CONTACT ME
              </span>
              <span ref={contactArrowRef} className="inline-flex items-center">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>

            {contactPhase === "sliding" && (
              <span
                aria-hidden="true"
                style={{
                  animation: "contactSlide4s 4s linear forwards",
                }}
                className="absolute bottom-0 left-0 h-1 bg-amber-300"
              />
            )}
          </button>

          {contactPhase === "orbiting" && (
            <span
              ref={orbitArrowRef}
              aria-hidden="true"
              style={{
                animation: "orbitAroundButton 1.15s linear forwards",
              }}
              className="pointer-events-none absolute inset-0 flex items-center justify-end pr-2 z-20"
            >
              <span className="w-7 h-7 rounded-full bg-amber-300 text-obsidian flex items-center justify-center shadow-lg">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </span>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes contactSlide4s {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes orbitAroundButton {
          0% {
            transform: rotate(0deg);
          }
          45% {
            transform: rotate(-180deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}