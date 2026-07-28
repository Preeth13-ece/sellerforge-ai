import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function BlogPostsTable({ posts, onDelete }) {
  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-forge-border text-left text-ink-500">
            <th className="p-4 font-medium">Title</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p._id} className="border-b border-forge-border last:border-0">
              <td className="p-4 font-medium">{p.title}</td>
              <td className="p-4 capitalize text-ink-500">{p.status}</td>
              <td className="p-4 text-right space-x-3">
                <Link to={`/admin/blog/${p._id}/edit`} className="text-ink-500 hover:text-emerald-400 inline-block">
                  <Pencil size={15} />
                </Link>
                <button onClick={() => onDelete(p._id)} className="text-ink-500 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
