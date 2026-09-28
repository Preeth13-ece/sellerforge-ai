import CopyToClipboardButton from "./CopyToClipboardButton.jsx";
import SaveToFavoritesButton from "./SaveToFavoritesButton.jsx";
import ToolResultCard from "./ToolResultCard.jsx";
import ListingAnalyzerScoreCard from "./ListingAnalyzerScoreCard.jsx";
import PricingCalculatorWidget from "./PricingCalculatorWidget.jsx";
import FeeCalculatorWidget from "./FeeCalculatorWidget.jsx";
import KeywordResultTable from "./KeywordResultTable.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import Spinner from "../ui/Spinner.jsx";
import { Sparkles } from "lucide-react";

function GenericOutput({ output }) {
  // Handles simple arrays (titles, tags, names) and objects with mixed shapes
  // (description generator, product ideas, holiday finder) without needing a
  // bespoke component for every tool.
  if (Array.isArray(output)) {
    return (
      <ul className="space-y-2">
        {output.map((item, i) => (
          <ToolResultCard key={i} className="flex items-center justify-between gap-3">
            <span className="text-sm">{item}</span>
            <CopyToClipboardButton text={item} />
          </ToolResultCard>
        ))}
      </ul>
    );
  }

  if (output && typeof output === "object") {
    return (
      <div className="space-y-5">
        {Object.entries(output).map(([key, value]) => (
          <div key={key}>
            <h4 className="eyebrow mb-2 capitalize">{key.replace(/([A-Z])/g, " $1")}</h4>
            {Array.isArray(value) ? (
              <div className="space-y-2">
                {value.map((item, i) => (
                  <ToolResultCard key={i}>
                    {typeof item === "object" ? (
                      <div className="space-y-1">
                        {Object.entries(item).map(([k, v]) => (
                          <p key={k} className="text-sm">
                            <span className="text-ink-500 capitalize">{k}: </span>
                            {Array.isArray(v) ? v.join(", ") : String(v)}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">{item}</p>
                    )}
                  </ToolResultCard>
                ))}
              </div>
            ) : (
              <ToolResultCard>
                <p className="text-sm whitespace-pre-line">{String(value)}</p>
              </ToolResultCard>
            )}
          </div>
        ))}
      </div>
    );
  }

  return <p className="text-sm text-ink-300">{String(output)}</p>;
}

export default function ToolOutputPanel({ toolId, output, loading, error }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Spinner size={26} className="text-emerald-400" />
        <p className="text-sm text-ink-500">Generating…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-400">{error}</div>
    );
  }

  if (!output) {
    return (
      <EmptyState
        icon={Sparkles}
        title="Your results will appear here"
        description="Fill in the form and generate — outputs are ready in seconds."
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-lg">Results</h3>
        <div className="flex items-center gap-4">
          <SaveToFavoritesButton toolId={toolId} label={`${toolId} result`} data={output} />
          <CopyToClipboardButton text={output} />
        </div>
      </div>

      {toolId === "etsy-listing-analyzer" && <ListingAnalyzerScoreCard output={output} />}
      {toolId === "etsy-pricing-calculator" && <PricingCalculatorWidget output={output} />}
      {toolId === "etsy-fee-calculator" && <FeeCalculatorWidget output={output} />}
      {toolId === "etsy-keyword-generator" && <KeywordResultTable output={output} />}
      {toolId === "holiday-keyword-finder" && <GenericOutput output={output} />}
      {![
        "etsy-listing-analyzer",
        "etsy-pricing-calculator",
        "etsy-fee-calculator",
        "etsy-keyword-generator",
        "holiday-keyword-finder",
      ].includes(toolId) && <GenericOutput output={output} />}
    </div>
  );
}
