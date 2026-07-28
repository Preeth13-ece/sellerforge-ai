import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="glass-card p-6 flex flex-col hover:-translate-y-1 transition-transform">
      {post.categoryId?.name && (
        <span className="eyebrow mb-3">{post.categoryId.name}</span>
      )}
      <h3 className="font-display font-semibold text-lg mb-2 flex-1">{post.title}</h3>
      <p className="text-sm text-ink-500 line-clamp-3 mb-4">{post.excerpt}</p>
      <span className="inline-flex items-center gap-1 text-sm text-emerald-400">
        Read more <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
