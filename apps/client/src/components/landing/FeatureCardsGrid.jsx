import { Search, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";

const features = [
  { icon: Search, title: "Built for Etsy's algorithm", desc: "Every prompt is tuned to Etsy's actual search behavior, not generic SEO advice." },
  { icon: DollarSign, title: "Pricing you can trust", desc: "Free calculators account for real Etsy fees, so your margins are never a guess." },
  { icon: TrendingUp, title: "Research before you build", desc: "Spot low-competition product ideas and seasonal windows before your competitors do." },
  { icon: ShieldCheck, title: "Your data stays yours", desc: "Secure by default — encrypted passwords, rate-limited endpoints, no shady data sharing." },
];

export default function FeatureCardsGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center mb-14">
        <span className="eyebrow">Why sellers switch</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3">Everything an Etsy shop needs to grow</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="glass-card p-6">
            <f.icon size={22} className="text-emerald-400 mb-4" />
            <h3 className="font-display font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-ink-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
