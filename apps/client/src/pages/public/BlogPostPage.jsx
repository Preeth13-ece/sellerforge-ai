import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SEOHead from "../../components/shared/SEOHead.jsx";
import BlogPostContent from "../../components/blog/BlogPostContent.jsx";
import BlogTOC from "../../components/blog/BlogTOC.jsx";
import BlogShareButtons from "../../components/blog/BlogShareButtons.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { blogApi } from "../../services/api/blogApi.js";

export default function BlogPostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    blogApi
      .getBySlug(postSlug)
      .then(({ data }) => setPost(data.data.post))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [postSlug]);

  if (notFound) return <Navigate to="/404" replace />;

  return (
    <>
      {post && <SEOHead title={post.seo?.metaTitle || post.title} description={post.seo?.metaDescription || post.excerpt} canonical={post.seo?.canonicalUrl} ogImage={post.coverImageUrl} />}
      <article className="mx-auto max-w-3xl px-6 py-16">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-64" />
          </div>
        ) : post ? (
          <>
            {post.categoryId?.name && <span className="eyebrow">{post.categoryId.name}</span>}
            <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-3 mb-6">{post.title}</h1>
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-forge-border">
              <p className="text-sm text-ink-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
              <BlogShareButtons url={window.location.href} title={post.title} />
            </div>
            <BlogTOC content={post.content} />
            <BlogPostContent content={post.content} />
          </>
        ) : null}
      </article>
    </>
  );
}
