import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogosMarquee from "@/components/LogosMarquee";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import PromptShowcase from "@/components/PromptShowcase";
import VideoShowcase from "@/components/VideoShowcase";
import UseCases from "@/components/UseCases";
import Comparison from "@/components/Comparison";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <LogosMarquee />
      <Stats />
      <Features />
      <HowItWorks />
      <PromptShowcase />
      <VideoShowcase />
      <UseCases />
      <Comparison />
      <Integrations />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
