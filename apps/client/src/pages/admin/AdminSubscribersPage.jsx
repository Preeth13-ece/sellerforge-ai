import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import SubscribersTable from "../../components/admin/SubscribersTable.jsx";
import BlogSearchBar from "../../components/blog/BlogSearchBar.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import Button from "../../components/ui/Button.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { axiosClient } from "../../services/api/axiosClient.js";
import { useDebounce } from "../../hooks/useDebounce.js";
import { useToast } from "../../context/ToastContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    axiosClient
      .get("/newsletter/subscribers", { params: { page, search: debouncedSearch || undefined } })
      .then(({ data }) => {
        setSubscribers(data.data.subscribers);
        setPages(data.data.pagination.pages);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, [page, debouncedSearch]);

  async function handleDelete(id) {
    await axiosClient.delete(`/newsletter/subscribers/${id}`);
    showToast("Subscriber deleted", "success");
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-2xl font-semibold">Subscribers</h1>
        <div className="flex items-center gap-3">
          <BlogSearchBar value={search} onChange={setSearch} />
          <a href={`${API_BASE}/newsletter/subscribers/export`} target="_blank" rel="noreferrer">
            <Button variant="secondary" className="text-sm px-4 py-2.5">
              <Download size={15} /> Export CSV
            </Button>
          </a>
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-64" />
      ) : (
        <>
          <SubscribersTable subscribers={subscribers} onDelete={handleDelete} />
          <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
