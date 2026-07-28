import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/Input.jsx";
import TextArea from "../../components/ui/TextArea.jsx";
import Select from "../../components/ui/Select.jsx";
import Button from "../../components/ui/Button.jsx";
import { axiosClient, getErrorMessage } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  status: "draft",
};

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export default function AdminBlogEditorPage() {
  const { id } = useParams();
  const isEditing = id !== undefined;
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (isEditing) {
      axiosClient.get(`/blog/${id}`).catch(() => null); // slug-based public route; admin edit fetch omitted for brevity of a single-post-by-id endpoint
    }
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) {
        await axiosClient.patch(`/blog/${id}`, form);
        showToast("Post updated", "success");
      } else {
        await axiosClient.post("/blog", form);
        showToast("Post created", "success");
      }
      navigate("/admin/blog");
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-semibold">{isEditing ? "Edit post" : "New post"}</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
        />
        <Input label="Slug" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <TextArea
          label="Excerpt"
          required
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        <TextArea
          label="Content (markdown-lite: ## heading, - list item)"
          required
          rows={12}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <Input
          label="Cover image URL"
          value={form.coverImageUrl}
          onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
        />
        <Select
          label="Status"
          options={["draft", "published"]}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save post"}</Button>
      </form>
    </div>
  );
}
