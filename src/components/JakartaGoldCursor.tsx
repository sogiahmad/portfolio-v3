"use client";

import { useEffect, useRef, useState } from "react";

export default function JakartaGoldCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let targetX = -300;
    let targetY = -300;
    let currentX = -300;
    let currentY = -300;
    let rafId: number;

    const shouldShowGoldGlow = (clientX: number, clientY: number) => {
      const heroEl = document.getElementById("top");
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        if (clientY <= heroRect.bottom) {
          return false;
        }
      }

      const hoveredEl = document.elementFromPoint(clientX, clientY);
      if (hoveredEl) {
        if (
          hoveredEl.closest(
            "#about, img, picture, canvas, video, #projects, [data-no-gold-cursor]"
          )
        ) {
          return false;
        }
      }

      return true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(shouldShowGoldGlow(e.clientX, e.clientY));
    };

    const handleScroll = () => {
      if (targetX > 0 && targetY > 0) {
        setVisible(shouldShowGoldGlow(targetX, targetY));
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 200}px, ${currentY - 200}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block overflow-hidden"
    >
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 w-[400px] h-[400px] rounded-full transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.13) 0%, rgba(255,183,3,0.05) 38%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}