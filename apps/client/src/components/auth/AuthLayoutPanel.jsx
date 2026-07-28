import { Hammer } from "lucide-react";

export default function AuthLayoutPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-1/2 bg-forge-surface p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-ember-glow" />
      <div className="relative z-10 flex items-center gap-2 font-display text-lg font-semibold">
        <Hammer size={20} className="text-emerald-400" />
        SellerForge <span className="text-emerald-400">AI</span>
      </div>
      <div className="relative z-10">
        <p className="eyebrow mb-3">Forged for sellers</p>
        <h2 className="font-display text-3xl font-semibold leading-tight max-w-md">
          Every listing, priced right. Every title, found first.
        </h2>
        <p className="mt-4 text-ink-300 max-w-sm">
          Join thousands of Etsy sellers using AI to write, price, and research faster.
        </p>
      </div>
      <p className="relative z-10 text-xs text-ink-500 font-mono">© {new Date().getFullYear()} SellerForge AI</p>
    </div>
  );
}
