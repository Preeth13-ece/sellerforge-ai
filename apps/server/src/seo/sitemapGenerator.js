import { BlogPost } from "../modules/blog/blogPost.model.js";
import { env } from "../config/env.js";

const STATIC_ROUTES = [
  "/", "/tools", "/pricing", "/blog", "/about", "/contact", "/faq",
  "/privacy-policy", "/terms-of-service", "/affiliate-disclosure",
  "/tools/etsy-seo-title-generator", "/tools/etsy-tag-generator",
  "/tools/etsy-description-generator", "/tools/etsy-keyword-generator",
  "/tools/etsy-listing-analyzer", "/tools/etsy-pricing-calculator",
  "/tools/etsy-fee-calculator", "/tools/etsy-shop-name-generator",
  "/tools/etsy-product-idea-generator", "/tools/holiday-keyword-finder",
  "/tools/etsy-trend-explorer",
];

export async function generateSitemap() {
  const posts = await BlogPost.find({ status: "published" }).select("slug updatedAt").lean();

  const staticUrls = STATIC_ROUTES.map(
    (route) => `<url><loc>${env.clientUrl}${route}</loc></url>`
  ).join("");

  const postUrls = posts
    .map(
      (p) =>
        `<url><loc>${env.clientUrl}/blog/${p.slug}</loc><lastmod>${new Date(
          p.updatedAt
        ).toISOString()}</lastmod></url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${postUrls}</urlset>`;
}
