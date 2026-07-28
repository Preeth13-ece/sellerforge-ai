export default function Badge({ children, tone = "emerald" }) {
  const tones = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    ember: "bg-ember-400/10 text-ember-300 border-ember-400/30",
    neutral: "bg-ink-100/5 text-ink-300 border-forge-border",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}
