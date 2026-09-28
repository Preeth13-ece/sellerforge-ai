import { Zap } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

export default function CreditUsageIndicator({ creditCost }) {
  const { user } = useAuth();
  if (creditCost === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
        <Zap size={12} /> Free — no credits used
      </span>
    );
  }
  const remaining = user ? user.credits.limit - user.credits.used : null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-500">
      <Zap size={12} /> Costs {creditCost} credit{creditCost > 1 ? "s" : ""}
      {remaining !== null && ` · ${remaining} remaining`}
    </span>
  );
}
