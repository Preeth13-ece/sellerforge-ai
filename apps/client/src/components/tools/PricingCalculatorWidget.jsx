export default function PricingCalculatorWidget({ output }) {
  const { suggestedPrice, breakdown } = output;
  return (
    <div className="space-y-5">
      <div className="glass-card p-6 text-center">
        <p className="eyebrow mb-2">Suggested price</p>
        <p className="text-4xl font-display font-semibold text-emerald-400">${suggestedPrice}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {Object.entries(breakdown).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b border-forge-border py-2">
            <span className="text-ink-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            <span className="font-mono">{typeof value === "number" && key.toLowerCase().includes("percent") ? `${value}%` : `$${value}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
