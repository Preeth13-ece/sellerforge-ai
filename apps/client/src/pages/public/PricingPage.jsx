import SEOHead from "../../components/shared/SEOHead.jsx";
import PricingTable from "../../components/landing/PricingTable.jsx";
import FAQAccordion from "../../components/landing/FAQAccordion.jsx";

export default function PricingPage() {
  return (
    <>
      <SEOHead title="Pricing" description="Simple, transparent pricing for SellerForge AI — start free, upgrade when you're ready." />
      <div className="pt-8">
        <PricingTable />
        <FAQAccordion />
      </div>
    </>
  );
}
