export default function StatsCard({ label, value, icon: Icon, tone = "emerald" }) {
  const toneClass = tone === "ember" ? "text-ember-300" : "text-emerald-400";
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="eyebrow">{label}</span>
        {Icon && <Icon size={16} className={toneClass} />}
      </div>
      <p className="text-2xl font-display font-semibold">{value}</p>
    </div>
  );
}
