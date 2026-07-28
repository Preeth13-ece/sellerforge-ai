export default function ListingAnalyzerScoreCard({ output }) {
  const scores = [
    { label: "Overall", value: output.overallScore },
    { label: "SEO", value: output.seoScore },
    { label: "Conversion", value: output.conversionScore },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {scores.map((s) => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className="text-3xl font-display font-semibold text-emerald-400">{s.value}</p>
            <p className="text-xs text-ink-500 mt-1">{s.label} / 100</p>
          </div>
        ))}
      </div>

      {["strengths", "issues", "recommendations"].map((key) => (
        <div key={key}>
          <h4 className="eyebrow mb-2 capitalize">{key}</h4>
          <ul className="space-y-2">
            {(output[key] || []).map((item, i) => (
              <li key={i} className="text-sm text-ink-100 flex gap-2">
                <span className="text-emerald-400">—</span> {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
