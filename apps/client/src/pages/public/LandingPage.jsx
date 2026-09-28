import SEOHead from "../../components/shared/SEOHead.jsx";
import HeroSection from "../../components/landing/HeroSection.jsx";
import TrustBar from "../../components/landing/TrustBar.jsx";
import FeatureCardsGrid from "../../components/landing/FeatureCardsGrid.jsx";
import ToolCardsShowcase from "../../components/landing/ToolCardsShowcase.jsx";
import HowItWorksSteps from "../../components/landing/HowItWorksSteps.jsx";
import TestimonialsCarousel from "../../components/landing/TestimonialsCarousel.jsx";
import PricingTable from "../../components/landing/PricingTable.jsx";
import FAQAccordion from "../../components/landing/FAQAccordion.jsx";
import NewsletterCTA from "../../components/landing/NewsletterCTA.jsx";
import FinalCTASection from "../../components/landing/FinalCTASection.jsx";

export default function LandingPage() {
  return (
    <>
      <SEOHead
        title="AI Tools for Etsy Sellers"
        description="Generate SEO titles, tags, descriptions, pricing, and product ideas for your Etsy shop with AI — free to start."
      />
      <HeroSection />
      <TrustBar />
      <FeatureCardsGrid />
      <ToolCardsShowcase />
      <HowItWorksSteps />
      <TestimonialsCarousel />
      <PricingTable />
      <FAQAccordion />
      <NewsletterCTA />
      <FinalCTASection />
    </>
  );
}
