import { useEffect, useState } from "react";
import FeedbackTable from "../../components/admin/FeedbackTable.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { axiosClient } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    axiosClient.get("/feedback").then(({ data }) => setFeedback(data.data.feedback)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleStatusChange(id, status) {
    await axiosClient.patch(`/feedback/${id}`, { status });
    showToast("Status updated", "success");
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Feedback</h1>
      {loading ? <Skeleton className="h-64" /> : <FeedbackTable feedback={feedback} onStatusChange={handleStatusChange} />}
    </div>
  );
}
