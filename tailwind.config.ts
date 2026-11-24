import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0D0D0D",
        charcoal: "#161616",
        surface: "#1C1C1C",
        cream: "#EBE7E0",
        "cream-dark": "#DCD6CB",
        accent: "#FF4D00",
        "accent-hover": "#FF6A2B",
        cutting: "#165B33",
        cork: "#9E7247",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
        serif: ["var(--font-serif)", "serif"],
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "marquee-left": "marqueeLeft 32s linear infinite",
        "marquee-right": "marqueeRight 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;