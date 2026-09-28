import { useState } from "react";
import SEOHead from "../../components/shared/SEOHead.jsx";
import Input from "../../components/ui/Input.jsx";
import TextArea from "../../components/ui/TextArea.jsx";
import Select from "../../components/ui/Select.jsx";
import Button from "../../components/ui/Button.jsx";
import { axiosClient, getErrorMessage } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function ContactPage() {
  const [form, setForm] = useState({ email: "", type: "general", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.post("/feedback", form);
      setSent(true);
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEOHead title="Contact" description="Get in touch with the SellerForge AI team." />
      <div className="mx-auto max-w-xl px-6 py-20">
        <span className="eyebrow">Contact</span>
        <h1 className="font-display text-4xl font-semibold mt-3 mb-8">Talk to us</h1>

        {sent ? (
          <p className="text-ink-300">Thanks — we read every message and reply within 1-2 business days.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Select
              label="Topic"
              options={["general", "bug", "feature_request"]}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <TextArea
              label="Message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button type="submit" disabled={loading}>{loading ? "Sending…" : "Send message"}</Button>
          </form>
        )}
      </div>
    </>
  );
}
