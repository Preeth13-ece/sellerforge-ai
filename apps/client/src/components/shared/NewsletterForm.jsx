import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { newsletterApi } from "../../services/api/newsletterApi.js";
import { useToast } from "../../context/ToastContext.jsx";
import { getErrorMessage } from "../../services/api/axiosClient.js";

export default function NewsletterForm({ source = "footer", compact = false }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await newsletterApi.subscribe({ email, source });
      showToast("Subscribed! Check your inbox.", "success");
      setEmail("");
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex ${compact ? "flex-row" : "flex-col sm:flex-row"} gap-3`}>
      <div className="relative flex-1">
        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="input-field pl-10"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap">
        {loading ? "Subscribing…" : "Subscribe"} <ArrowRight size={15} />
      </button>
    </form>
  );
}
