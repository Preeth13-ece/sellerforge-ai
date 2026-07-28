import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { History, Star, Zap } from "lucide-react";
import StatsCard from "../../components/dashboard/StatsCard.jsx";
import UsageChart from "../../components/dashboard/UsageChart.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { dashboardApi } from "../../services/api/dashboardApi.js";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [historyCount, setHistoryCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    dashboardApi.history({ limit: 1 }).then(({ data }) => setHistoryCount(data.data.pagination.total)).catch(() => {});
    dashboardApi.favorites().then(({ data }) => setFavoritesCount(data.data.favorites.length)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="text-ink-500 mt-1">Here's what's happening with your account.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Plan" value={<span className="capitalize">{user?.plan}</span>} icon={Zap} />
        <StatsCard label="Total generations" value={historyCount} icon={History} />
        <StatsCard label="Favorites" value={favoritesCount} icon={Star} />
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">Credit usage this cycle</h3>
        <UsageChart used={user?.credits?.used || 0} limit={user?.credits?.limit || 20} />
      </div>

      <div className="glass-card p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-display font-semibold mb-1">Ready to generate?</h3>
          <p className="text-sm text-ink-500">Jump back into any of the 11 tools.</p>
        </div>
        <Button as={Link} to="/tools">Browse tools</Button>
      </div>
    </div>
  );
}
