import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEOHead from "../../components/shared/SEOHead.jsx";
import BlogGrid from "../../components/blog/BlogGrid.jsx";
import BlogCategoryFilter from "../../components/blog/BlogCategoryFilter.jsx";
import BlogSearchBar from "../../components/blog/BlogSearchBar.jsx";
import BlogSidebar from "../../components/blog/BlogSidebar.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { blogApi } from "../../services/api/blogApi.js";
import { useDebounce } from "../../hooks/useDebounce.js";

export default function BlogIndexPage() {
  const { categorySlug } = useParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    blogApi.categories().then(({ data }) => setCategories(data.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    blogApi
      .list({ page, category: categorySlug, search: debouncedSearch || undefined })
      .then(({ data }) => {
        setPosts(data.data.posts);
        setPages(data.data.pagination.pages);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [page, categorySlug, debouncedSearch]);

  return (
    <>
      <SEOHead title="Blog" description="Etsy SEO, product research, marketing, and AI insights for sellers." />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-10">
          <span className="eyebrow">The blog</span>
          <h1 className="font-display text-4xl font-semibold mt-3">Etsy seller insights</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <BlogCategoryFilter categories={categories} activeSlug={categorySlug} />
          <BlogSearchBar value={search} onChange={setSearch} />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48" />)}
              </div>
            ) : (
              <>
                <BlogGrid posts={posts} />
                <Pagination page={page} pages={pages} onChange={setPage} />
              </>
            )}
          </div>
          <BlogSidebar />
        </div>
      </div>
    </>
  );
}
