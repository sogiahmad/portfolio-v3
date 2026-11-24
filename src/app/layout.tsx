import type { Metadata } from "next";
import {
  Archivo_Black,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Caveat,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const displayFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sansFont = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const monoFont = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const handFont = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-hand",
});

const serifFont = Playfair_Display({
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Syauqi Ahmad | Information Systems & Full-Stack Portfolio",
  description:
    "Portfolio of Syauqi Ahmad — Information Systems Student at UIN Jakarta, Full-Stack Developer, Security Researcher, and Data Analyst.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} ${handFont.variable} ${serifFont.variable}`}
    >
      <body className="bg-obsidian text-[#F2EFE9] font-sans antialiased selection:bg-accent selection:text-white overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}