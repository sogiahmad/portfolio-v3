import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import AboutReveal from "@/components/AboutReveal";
import ServicesSection from "@/components/ServicesSection";
import ProjectsStack from "@/components/ProjectsStack";
import BrandBanner from "@/components/BrandBanner";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import Footer from "@/components/Footer";
import JakartaGoldCursor from "@/components/JakartaGoldCursor";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-obsidian text-[#F2EFE9] selection:bg-accent selection:text-white">
      <JakartaGoldCursor />
      <Navbar />
      <Hero />
      <TechMarquee />
      <AboutReveal />
      <ServicesSection />
      <ProjectsStack />
      <BrandBanner />
      <ExperienceShowcase />
      <Footer />
    </main>
  );
}