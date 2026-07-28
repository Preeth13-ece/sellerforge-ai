import { useEffect, useState } from "react";
import AffiliateClicksChart from "../../components/admin/AffiliateClicksChart.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { axiosClient } from "../../services/api/axiosClient.js";

export default function AdminAffiliateClicksPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axiosClient.get("/affiliate/clicks").then(({ data }) => setSummary(data.data.summary)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Affiliate Clicks</h1>
      {summary ? (
        summary.length > 0 ? <AffiliateClicksChart summary={summary} /> : <p className="text-ink-500">No clicks logged yet.</p>
      ) : (
        <Skeleton className="h-48" />
      )}
    </div>
  );
}
