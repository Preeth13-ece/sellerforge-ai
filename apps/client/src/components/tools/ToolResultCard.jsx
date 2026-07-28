export default function ToolResultCard({ children, className = "" }) {
  return <div className={`rounded-xl border border-forge-border bg-forge-surface2/60 p-4 ${className}`}>{children}</div>;
}
