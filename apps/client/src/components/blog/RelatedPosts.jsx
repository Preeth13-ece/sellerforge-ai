import BlogCard from "./BlogCard.jsx";

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="mt-16">
      <h3 className="eyebrow mb-4">Related reading</h3>
      <div className="grid gap-6 sm:grid-cols-3">
        {posts.map((p) => <BlogCard key={p._id} post={p} />)}
      </div>
    </div>
  );
}
