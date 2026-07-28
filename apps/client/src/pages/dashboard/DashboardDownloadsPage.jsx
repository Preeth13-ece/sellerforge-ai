import { useEffect, useState } from "react";
import { Download as DownloadIcon } from "lucide-react";
import DownloadsList from "../../components/dashboard/DownloadsList.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { dashboardApi } from "../../services/api/dashboardApi.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export default function DashboardDownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.downloads().then(({ data }) => setDownloads(data.data.downloads)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Downloads</h1>
      {loading ? (
        <Skeleton className="h-48" />
      ) : downloads.length === 0 ? (
        <EmptyState icon={DownloadIcon} title="No downloads yet" description="Export any result from your History as a CSV." />
      ) : (
        <DownloadsList downloads={downloads} apiBase={API_BASE} />
      )}
    </div>
  );
}
