import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import FavoritesGrid from "../../components/dashboard/FavoritesGrid.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { dashboardApi } from "../../services/api/dashboardApi.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function DashboardFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    dashboardApi.favorites().then(({ data }) => setFavorites(data.data.favorites)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleRemove(id) {
    await dashboardApi.removeFavorite(id);
    showToast("Removed", "success");
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Favorites</h1>
      {loading ? (
        <Skeleton className="h-48" />
      ) : favorites.length === 0 ? (
        <EmptyState icon={Star} title="No favorites yet" description="Save results you like while using any tool." />
      ) : (
        <FavoritesGrid favorites={favorites} onRemove={handleRemove} />
      )}
    </div>
  );
}
