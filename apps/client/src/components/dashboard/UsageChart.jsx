export default function UsageChart({ used, limit }) {
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-ink-300">{used} used</span>
        <span className="text-ink-500">{limit} / month</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-forge-surface2 overflow-hidden">
        <div
          className={`h-full rounded-full ${percent > 85 ? "bg-ember-400" : "bg-emerald-500"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
