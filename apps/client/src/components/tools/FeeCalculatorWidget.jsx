export default function FeeCalculatorWidget({ output }) {
  const { grossRevenue, fees, netEarnings, netMarginPercent } = output;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-5 text-center">
          <p className="eyebrow mb-2">Gross revenue</p>
          <p className="text-2xl font-display font-semibold">${grossRevenue}</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="eyebrow mb-2">Net earnings</p>
          <p className="text-2xl font-display font-semibold text-emerald-400">${netEarnings}</p>
          <p className="text-xs text-ink-500 mt-1">{netMarginPercent}% margin</p>
        </div>
      </div>
      <div className="text-sm space-y-2">
        {Object.entries(fees).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b border-forge-border py-2">
            <span className="text-ink-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            <span className="font-mono">${value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
