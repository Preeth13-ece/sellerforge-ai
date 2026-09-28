export default function AffiliateClicksChart({ summary }) {
  const max = Math.max(...summary.map((s) => s.totalClicks), 1);
  return (
    <div className="glass-card p-6 space-y-4">
      {summary.map((s) => (
        <div key={s._id}>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="capitalize">{s._id}</span>
            <span className="text-ink-500 font-mono">{s.totalClicks}</span>
          </div>
          <div className="h-2 rounded-full bg-forge-surface2 overflow-hidden">
            <div className="h-full bg-ember-400 rounded-full" style={{ width: `${(s.totalClicks / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
