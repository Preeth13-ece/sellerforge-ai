import BlogCard from "./BlogCard.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import { FileText } from "lucide-react";

export default function BlogGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return <EmptyState icon={FileText} title="No posts yet" description="Check back soon — we publish weekly." />;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
