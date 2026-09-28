import { Link } from "react-router-dom";

export default function BlogCategoryFilter({ categories, activeSlug }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <Link
        to="/blog"
        className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
          !activeSlug ? "border-emerald-500 text-emerald-400" : "border-forge-border text-ink-300 hover:text-ink-100"
        }`}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          to={`/blog/category/${c.slug}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
            activeSlug === c.slug ? "border-emerald-500 text-emerald-400" : "border-forge-border text-ink-300 hover:text-ink-100"
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
