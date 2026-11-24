"use client";

import { useState } from "react";
import { ArrowUp, Newspaper, Sparkles, Copy, Check } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolio";

type BannerMode = "embossed" | "broadsheet";

export default function Footer() {
  const [mode, setMode] = useState<BannerMode>("embossed");
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
      className={`relative border-t transition-colors duration-300 overflow-hidden ${
        mode === "embossed"
          ? "bg-obsidian text-cream border-white/10 pt-12 pb-10 px-6 md:px-12"
          : "bg-[#F4F1EA] text-obsidian border-obsidian/15 pt-10 pb-10 px-6 md:px-12"
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Bar + Mode Switcher + Quick Copy Email */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-5 border-b ${
            mode === "embossed" ? "border-white/10" : "border-obsidian/20"
          }`}
        >
          <div className="flex flex-wrap items-center gap-3">
            {/* <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-amber-400">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>
                {mode === "embossed"
                  ? "ARCHIVE MONUMENT · EMBOSSED EDITION V.3"
                  : "VOL. 2026 · EDITORIAL PRINT EDITION · JAKARTA"}
              </span>
            </span> */}

            <button
              type="button"
              onClick={handleCopyEmail}
              title="Copy email address"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] font-bold tracking-[0.12em] uppercase border transition-all cursor-pointer ${
                mode === "embossed"
                  ? "bg-white/[0.04] border-white/15 text-neutral-300 hover:border-amber-400/50 hover:text-amber-300"
                  : "bg-white/85 border-obsidian/15 text-obsidian/75 hover:border-accent hover:text-accent"
              }`}
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

          <div
            role="group"
            aria-label="Switch footer monument style"
            className={`inline-flex items-center p-1 rounded-full border ${
              mode === "embossed"
                ? "bg-white/[0.04] border-white/15"
                : "bg-white/80 border-obsidian/15"
            }`}
          >
            <button
              type="button"
              onClick={() => setMode("embossed")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] font-bold tracking-[0.12em] uppercase transition-all cursor-pointer ${
                mode === "embossed"
                  ? "bg-accent text-white shadow"
                  : "text-obsidian/65 hover:text-obsidian"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Dark Embossed</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("broadsheet")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] font-bold tracking-[0.12em] uppercase transition-all cursor-pointer ${
                mode === "broadsheet"
                  ? "bg-obsidian text-cream shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Newspaper className="w-3 h-3" />
              <span>Editorial Print</span>
            </button>
          </div>
        </div>

        {/* Mode 1: Dark Embossed */}
        {mode === "embossed" && (
          <div className="py-8 md:py-12 select-none w-full overflow-hidden group">
            <h2
              style={{
                textShadow:
                  "0px 2px 3px rgba(255,255,255,0.08), 0px -2px 4px rgba(0,0,0,0.95)",
              }}
              className="w-full font-display font-extrabold uppercase text-[#141414] group-hover:text-[#191919] tracking-[-0.04em] leading-[0.82] text-[22vw] text-center transition-colors duration-300"
            >
              {monumentWord}
            </h2>
          </div>
        )}

        {/* Mode 2: Editorial Print */}
        {mode === "broadsheet" && (
          <div className="py-7 md:py-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-obsidian/20">
              <div className="lg:col-span-7">
                <span className="inline-block px-2.5 py-0.5 rounded bg-accent text-white font-mono text-[10px] font-bold tracking-[0.16em] uppercase mb-2">
                  INFORMATION SYSTEMS · PORTFOLIO
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-obsidian/80 leading-snug max-w-xl">
                  “Crafted with structured engineering, security awareness, and
                  data-driven clarity.”
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-3 gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-obsidian/15 lg:pl-6">
                {PROFILE_DATA.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="font-display text-xl sm:text-2xl text-obsidian leading-none">
                      {metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] tracking-[0.1em] text-obsidian/60 uppercase leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 select-none w-full overflow-hidden">
              <h2 className="w-full font-serif font-black uppercase text-obsidian tracking-[-0.04em] leading-[0.82] text-[22vw] text-center">
                {monumentWord}
              </h2>
            </div>
          </div>
        )}

        {/* Bottom Copyright, Social Links & Back To Top */}
        <div
          className={`mt-6 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] uppercase ${
            mode === "embossed"
              ? "border-white/10 text-neutral-400"
              : "border-obsidian/20 text-obsidian/75"
          }`}
        >
          <div>2026 SYAUQI AHMAD</div>

          <nav
            aria-label="Social and contact links"
            className="flex flex-wrap items-center justify-center gap-5 md:gap-7"
          >
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={
                mode === "embossed"
                  ? "hover:text-amber-300 transition-colors"
                  : "hover:text-accent transition-colors"
              }
            >
              LINKEDIN
            </a>
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className={
                mode === "embossed"
                  ? "hover:text-amber-300 transition-colors"
                  : "hover:text-accent transition-colors"
              }
            >
              GITHUB
            </a>
            <a
              href={PROFILE_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                mode === "embossed"
                  ? "hover:text-amber-300 transition-colors"
                  : "hover:text-accent transition-colors"
              }
            >
              WHATSAPP
            </a>
            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className={
                mode === "embossed"
                  ? "hover:text-amber-300 transition-colors"
                  : "hover:text-accent transition-colors"
              }
            >
              EMAIL
            </a>
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className={`group inline-flex items-center gap-1.5 transition-colors uppercase cursor-pointer ${
              mode === "embossed"
                ? "hover:text-amber-300"
                : "hover:text-accent"
            }`}
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}