const stats = [
  { value: "11", label: "AI tools" },
  { value: "20", label: "free credits / mo" },
  { value: "<10s", label: "avg. generation time" },
  { value: "7", label: "blog categories" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-forge-border">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-emerald-400">{s.value}</p>
            <p className="text-xs text-ink-500 mt-1 font-mono uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
