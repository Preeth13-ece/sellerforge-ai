import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import BlogPostsTable from "../../components/admin/BlogPostsTable.jsx";
import Button from "../../components/ui/Button.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { axiosClient } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    axiosClient.get("/blog", { params: { limit: 100 } }).then(({ data }) => setPosts(data.data.posts)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    await axiosClient.delete(`/blog/${id}`);
    showToast("Post deleted", "success");
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Blog posts</h1>
        <Button as={Link} to="/admin/blog/new" className="text-sm px-4 py-2.5">
          <Plus size={15} /> New post
        </Button>
      </div>
      {loading ? <Skeleton className="h-64" /> : <BlogPostsTable posts={posts} onDelete={handleDelete} />}
    </div>
  );
}
