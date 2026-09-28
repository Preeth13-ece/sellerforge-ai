import { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import SEOHead from "../../components/shared/SEOHead.jsx";
import { tools, toolCategories } from "../../config/toolsConfig.js";

export default function ToolsHubPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const filtered = activeCategory ? tools.filter((t) => t.category === activeCategory) : tools;

  return (
    <>
      <SEOHead title="All Tools" description="Browse all 11 AI-powered tools for Etsy sellers — SEO, pricing, branding, and research." />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <span className="eyebrow">The full toolkit</span>
          <h1 className="font-display text-4xl font-semibold mt-3">Every tool your shop needs</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${!activeCategory ? "border-emerald-500 text-emerald-400" : "border-forge-border text-ink-300"}`}
          >
            All
          </button>
          {toolCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${activeCategory === cat ? "border-emerald-500 text-emerald-400" : "border-forge-border text-ink-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => {
            const Icon = Icons[tool.icon] || Icons.Wrench;
            return (
              <Link key={tool.id} to={`/tools/${tool.slug}`} className="glass-card p-6 hover:-translate-y-1 transition-transform">
                <Icon size={22} className="text-emerald-400 mb-4" />
                <h3 className="font-display font-semibold mb-1">{tool.name}</h3>
                <p className="text-sm text-ink-500">{tool.description}</p>
                {tool.creditCost === 0 && <span className="mt-3 inline-block text-xs font-mono text-emerald-400">Free tool</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
