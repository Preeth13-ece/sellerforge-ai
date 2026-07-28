import { Link } from "react-router-dom";
import { tools } from "../../config/toolsConfig.js";

export default function ToolRelatedList({ currentSlug, category }) {
  const related = tools.filter((t) => t.category === category && t.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16">
      <h3 className="eyebrow mb-4">More in {category}</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((t) => (
          <Link key={t.slug} to={`/tools/${t.slug}`} className="glass-card p-5 hover:-translate-y-1 transition-transform">
            <p className="font-medium text-sm">{t.name}</p>
            <p className="text-xs text-ink-500 mt-1 line-clamp-2">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
