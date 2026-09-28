import { useEffect, useState } from "react";
import { History as HistoryIcon } from "lucide-react";
import HistoryTable from "../../components/dashboard/HistoryTable.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import Button from "../../components/ui/Button.jsx";
import { dashboardApi } from "../../services/api/dashboardApi.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function DashboardHistoryPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    dashboardApi
      .history({ page })
      .then(({ data }) => {
        setItems(data.data.items);
        setPages(data.data.pagination.pages);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, [page]);

  async function handleDelete(id) {
    await dashboardApi.deleteHistoryItem(id);
    showToast("Deleted", "success");
    load();
  }

  async function handleClearAll() {
    await dashboardApi.clearHistory();
    showToast("History cleared", "success");
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">History</h1>
        {items.length > 0 && (
          <Button variant="secondary" onClick={handleClearAll} className="text-sm px-4 py-2">
            Clear all
          </Button>
        )}
      </div>

      {loading ? (
        <Skeleton className="h-64" />
      ) : items.length === 0 ? (
        <EmptyState icon={HistoryIcon} title="No history yet" description="Run any tool and it'll show up here automatically." />
      ) : (
        <>
          <HistoryTable items={items} onDelete={handleDelete} />
          <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
