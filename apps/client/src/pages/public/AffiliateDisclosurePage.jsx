import SEOHead from "../../components/shared/SEOHead.jsx";

export default function AffiliateDisclosurePage() {
  return (
    <>
      <SEOHead title="Affiliate Disclosure" />
      <div className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-ink-300 leading-relaxed">
        <span className="eyebrow">Legal</span>
        <h1 className="font-display text-4xl font-semibold mt-3 mb-6 text-ink-100">Affiliate Disclosure</h1>
        <p>
          Some links on SellerForge AI — including links to tools like Creative Fabrica, Canva, Printify,
          Printful, EverBee, Marmalead, eRank, and Hostinger — are affiliate links. If you click one and make
          a purchase, we may earn a commission at no extra cost to you.
        </p>
        <p>
          We only recommend tools we believe are genuinely useful to Etsy sellers. Affiliate relationships
          never influence the AI-generated results you get from our tools.
        </p>
      </div>
    </>
  );
}
