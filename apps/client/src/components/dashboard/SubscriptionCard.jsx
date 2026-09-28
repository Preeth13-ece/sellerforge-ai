import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";

export default function SubscriptionCard({ plan, status, onUpgrade, onCancel }) {
  return (
    <div className="glass-card p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold capitalize">{plan} plan</h3>
        <Badge tone={status === "active" ? "emerald" : "neutral"}>{status}</Badge>
      </div>
      <div className="flex gap-3">
        {plan === "free" ? (
          <Button onClick={onUpgrade}>Upgrade plan</Button>
        ) : (
          <Button variant="secondary" onClick={onCancel}>Cancel subscription</Button>
        )}
      </div>
    </div>
  );
}
