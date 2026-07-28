import SEOHead from "../../components/shared/SEOHead.jsx";

export default function AboutPage() {
  return (
    <>
      <SEOHead title="About" description="SellerForge AI is an independent toolkit built to help Etsy sellers grow with AI." />
      <div className="mx-auto max-w-3xl px-6 py-20">
        <span className="eyebrow">About</span>
        <h1 className="font-display text-4xl font-semibold mt-3 mb-6">Built by sellers, for sellers</h1>
        <div className="space-y-5 text-ink-300 leading-relaxed">
          <p>
            SellerForge AI started as a simple idea: Etsy sellers spend hours writing titles, tags, and
            descriptions by hand — often guessing at what actually ranks. We built a toolkit that takes
            that guesswork out, using AI tuned specifically for how buyers search on Etsy.
          </p>
          <p>
            We're not affiliated with Etsy, Inc. We're an independent product built to sit alongside your
            existing workflow — whether you're listing your first product or managing hundreds.
          </p>
          <p>
            Every tool in the toolkit is built around one job done well: a title generator that writes
            titles, a pricing calculator that accounts for real Etsy fees, a trend explorer that gives
            directional insight rather than vague hype.
          </p>
        </div>
      </div>
    </>
  );
}
