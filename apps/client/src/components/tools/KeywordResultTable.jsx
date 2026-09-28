export default function KeywordResultTable({ output }) {
  return (
    <div className="space-y-6">
      {Object.entries(output).map(([group, items]) => {
        if (!Array.isArray(items) || items.length === 0) return null;
        return (
          <div key={group}>
            <h4 className="eyebrow mb-2 capitalize">{group.replace(/([A-Z])/g, " $1")}</h4>
            <div className="flex flex-wrap gap-2">
              {items.map((kw, i) => (
                <span key={i} className="rounded-full border border-forge-border bg-forge-surface2 px-3 py-1.5 text-xs font-mono">
                  {typeof kw === "string" ? kw : kw.trend || JSON.stringify(kw)}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
