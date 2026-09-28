import { Star, Trash2 } from "lucide-react";

export default function FavoritesGrid({ favorites, onRemove }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((fav) => (
        <div key={fav._id} className="glass-card p-5">
          <div className="flex items-start justify-between mb-2">
            <Star size={16} className="text-emerald-400 fill-emerald-400" />
            <button onClick={() => onRemove(fav._id)} className="text-ink-500 hover:text-red-400">
              <Trash2 size={14} />
            </button>
          </div>
          <p className="font-medium text-sm mb-1">{fav.label}</p>
          <p className="text-xs text-ink-500 font-mono">{fav.toolId}</p>
        </div>
      ))}
    </div>
  );
}
