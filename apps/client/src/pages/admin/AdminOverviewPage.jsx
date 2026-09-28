import { useEffect, useState } from "react";
import AdminStatsGrid from "../../components/admin/AdminStatsGrid.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { axiosClient } from "../../services/api/axiosClient.js";

export default function AdminOverviewPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axiosClient.get("/admin/overview").then(({ data }) => setSummary(data.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Admin Overview</h1>
      {summary ? <AdminStatsGrid summary={summary} /> : <Skeleton className="h-32" />}

      {summary?.topTools?.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-4">Top tools (30 days)</h3>
          <div className="space-y-3">
            {summary.topTools.map((t) => (
              <div key={t._id} className="flex justify-between text-sm border-b border-forge-border pb-2">
                <span className="font-mono">{t._id}</span>
                <span className="text-ink-500">{t.runs} runs</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
