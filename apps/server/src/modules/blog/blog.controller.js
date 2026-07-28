import { BlogPost } from "./blogPost.model.js";
import { Category } from "./category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const listPosts = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(30, Number(req.query.limit) || 12);
  const { category, search } = req.query;

  const filter = { status: "published" };
  if (category) {
    const cat = await Category.findOne({ slug: category });
    if (cat) filter.categoryId = cat._id;
  }
  if (search) filter.$text = { $search: search };

  const [posts, total] = await Promise.all([
    BlogPost.find(filter)
      .populate("categoryId", "name slug")
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  return new ApiResponse(200, {
    posts,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }).send(res);
});

export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, status: "published" }).populate(
    "categoryId",
    "name slug"
  );
  if (!post) throw ApiError.notFound("Post not found");
  return new ApiResponse(200, { post }).send(res);
});

export const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  return new ApiResponse(200, { categories }).send(res);
});

// ---- Admin ----

export const createPost = asyncHandler(async (req, res) => {
  const body = req.body;
  if (body.status === "published" && !body.publishedAt) body.publishedAt = new Date();
  const post = await BlogPost.create({ ...body, authorId: req.user._id });
  return new ApiResponse(201, { post }, "Post created").send(res);
});

export const updatePost = asyncHandler(async (req, res) => {
  const body = req.body;
  if (body.status === "published" && !body.publishedAt) body.publishedAt = new Date();
  const post = await BlogPost.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!post) throw ApiError.notFound("Post not found");
  return new ApiResponse(200, { post }, "Post updated").send(res);
});

export const deletePost = asyncHandler(async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  return new ApiResponse(200, null, "Post deleted").send(res);
});

export const rssFeed = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find({ status: "published" }).sort({ publishedAt: -1 }).limit(30);
  const items = posts
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(process.env.CLIENT_URL || "")}/blog/${p.slug}</link>
      <guid>${p._id}</guid>
      <pubDate>${new Date(p.publishedAt || p.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>SellerForge AI Blog</title>
  <link>${escapeXml(process.env.CLIENT_URL || "")}/blog</link>
  <description>Etsy SEO, product research, marketing, and AI insights for sellers.</description>
  ${items}
</channel></rss>`;

  res.setHeader("Content-Type", "application/rss+xml");
  res.send(xml);
});

function escapeXml(str = "") {
  return String(str).replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c])
  );
}
