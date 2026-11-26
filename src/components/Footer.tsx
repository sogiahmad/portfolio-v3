"use client";

import { useState } from "react";
import { ArrowUp, Copy, Check } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolio";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  const monumentWord = PROFILE_DATA.brand.toUpperCase();

  return (
    <footer
      id="contact"
      className="relative bg-obsidian text-cream border-t border-white/10 pt-10 pb-8 px-6 md:px-12 overflow-hidden"
    >
      <span
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.55), rgba(255, 77, 0, 0.55), transparent)",
          animation: "footerHairlineSweep 5s ease-in-out infinite",
        }}
        className="pointer-events-none absolute top-0 inset-x-0 h-[1px]"
      />

      <div className="relative z-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-9 border-b border-white/10">
          <div className="md:col-span-6 space-y-3">
            <div className="font-display text-xl tracking-tight uppercase text-white">
              {monumentWord}
            </div>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Information Systems student at UIN Syarif Hidayatullah Jakarta
              with business management coursework, building practical web
              applications and data-driven solutions.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Salin alamat email"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] font-bold tracking-[0.12em] uppercase border bg-white/[0.04] border-white/15 text-neutral-300 hover:border-amber-400/50 hover:text-amber-300 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>COPIED · {PROFILE_DATA.contact.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{PROFILE_DATA.contact.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-amber-400/90">
              Navigation
            </div>
            <ul className="space-y-1.5 font-sans text-xs text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Work
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-amber-400/90">
              Connect
            </div>
            <ul className="space-y-1.5 font-sans text-xs text-neutral-400">
              <li>
                <a
                  href={PROFILE_DATA.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_DATA.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE_DATA.contact.email}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          data-no-gold-cursor
          className="relative pt-6 pb-2 select-none w-full overflow-hidden group"
        >
          <h2
            data-no-gold-cursor
            style={{
              textShadow:
                "0px -1px 0px rgba(255,255,255,0.11), 0px 4px 10px rgba(0,0,0,0.9), 0px 14px 28px rgba(0,0,0,0.75)",
            }}
            className="relative w-full font-display font-extrabold uppercase text-[#151515] group-hover:text-[#1A1A1A] tracking-[-0.04em] leading-[0.84] text-[22.5vw] text-center transition-colors duration-300"
          >
            {monumentWord}
          </h2>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-400">
          <div>2026 SYAUQI AHMAD</div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors uppercase cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes footerHairlineSweep {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </footer>
  );
}