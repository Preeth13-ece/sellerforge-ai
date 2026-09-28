import SEOHead from "../../components/shared/SEOHead.jsx";

export default function TermsOfServicePage() {
  return (
    <>
      <SEOHead title="Terms of Service" />
      <div className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-ink-300 leading-relaxed">
        <span className="eyebrow">Legal</span>
        <h1 className="font-display text-4xl font-semibold mt-3 mb-6 text-ink-100">Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Using the service</h2>
        <p>
          SellerForge AI provides AI-generated suggestions for Etsy listings. You are responsible for
          reviewing generated content before publishing it — we do not guarantee search ranking, sales
          outcomes, or factual accuracy of AI-generated text.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Subscriptions</h2>
        <p>
          Paid plans renew monthly until cancelled. You can cancel anytime from your dashboard; access
          continues until the end of the current billing period.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Acceptable use</h2>
        <p>
          Don't use the service to generate misleading, infringing, or illegal listing content, or to abuse
          rate limits through automated scraping.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Limitation of liability</h2>
        <p>
          The service is provided "as is." We are not liable for indirect or consequential damages arising
          from use of AI-generated content or tool outputs.
        </p>
      </div>
    </>
  );
}
