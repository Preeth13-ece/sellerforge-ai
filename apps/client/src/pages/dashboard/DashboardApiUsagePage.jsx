import UsageChart from "../../components/dashboard/UsageChart.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export default function DashboardApiUsagePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">API / Credit Usage</h1>
      <div className="glass-card p-6 max-w-lg">
        <UsageChart used={user?.credits?.used || 0} limit={user?.credits?.limit || 20} />
        <p className="text-sm text-ink-500 mt-4">
          Credits reset at the start of each billing cycle. AI-powered tools use 1-2 credits per run;
          the pricing and fee calculators are always free.
        </p>
      </div>
    </div>
  );
}
