import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProgrammes from "@/components/FeaturedProgrammes";
import PremiumCTA from "@/components/PremiumCTA";
import WhyGermany from "@/components/WhyGermany";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturedProgrammes />
      <PremiumCTA />
      <WhyGermany />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}