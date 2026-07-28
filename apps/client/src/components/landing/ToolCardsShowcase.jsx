import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { tools } from "../../config/toolsConfig.js";

export default function ToolCardsShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center mb-14">
        <span className="eyebrow">The toolkit</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3">11 tools, forged for one job each</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => {
          const Icon = Icons[tool.icon] || Icons.Wrench;
          return (
            <Link
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className="glass-card p-6 hover:-translate-y-1 transition-transform group"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={22} className="text-emerald-400" />
                <span className="font-mono text-xs text-ink-500">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display font-semibold mb-1 group-hover:text-emerald-400 transition-colors">{tool.name}</h3>
              <p className="text-sm text-ink-500">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
