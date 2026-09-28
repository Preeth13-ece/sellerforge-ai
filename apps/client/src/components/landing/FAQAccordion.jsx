import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Is SellerForge AI affiliated with Etsy?", a: "No — we're an independent toolkit built for Etsy sellers. We are not affiliated with, endorsed by, or sponsored by Etsy, Inc." },
  { q: "How do credits work?", a: "AI-powered tools use 1-2 credits per generation depending on complexity. The pricing and fee calculators are free and unlimited since they don't call the AI model." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel your subscription anytime from your dashboard — no phone calls, no retention maze." },
  { q: "Do you store my listing data?", a: "We store your tool inputs/outputs in your History so you can revisit them. You can delete any item, or your whole account, at any time." },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center mb-14">
        <span className="eyebrow">FAQ</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3">Questions, answered</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.q} className="glass-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-medium text-sm">{faq.q}</span>
              <ChevronDown size={16} className={`text-ink-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            {openIndex === i && <p className="px-5 pb-5 text-sm text-ink-500">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
