import { useState } from "react";
import { Star } from "lucide-react";
import { dashboardApi } from "../../services/api/dashboardApi.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { getErrorMessage } from "../../services/api/axiosClient.js";

export default function SaveToFavoritesButton({ toolId, label, data }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  async function handleSave() {
    if (!isAuthenticated) {
      showToast("Log in to save favorites", "info");
      return;
    }
    setLoading(true);
    try {
      await dashboardApi.addFavorite({ toolId, label, data });
      setSaved(true);
      showToast("Saved to favorites", "success");
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-emerald-400 transition-colors disabled:opacity-60"
    >
      <Star size={13} className={saved ? "fill-emerald-400 text-emerald-400" : ""} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
