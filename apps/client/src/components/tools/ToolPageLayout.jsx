import Badge from "../ui/Badge.jsx";
import CreditUsageIndicator from "./CreditUsageIndicator.jsx";

export default function ToolPageLayout({ tool, formSlot, outputSlot }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <Badge tone="ember">{tool.category}</Badge>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold">{tool.name}</h1>
        <p className="mt-3 text-ink-300">{tool.description}</p>
        <div className="mt-4">
          <CreditUsageIndicator creditCost={tool.creditCost} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="glass-card p-6 lg:p-8 h-fit">{formSlot}</div>
        <div className="glass-card p-6 lg:p-8">{outputSlot}</div>
      </div>
    </div>
  );
}
