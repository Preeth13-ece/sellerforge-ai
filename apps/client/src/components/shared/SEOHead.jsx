import { Helmet } from "react-helmet-async";

export default function SEOHead({ title, description, canonical, ogImage }) {
  const fullTitle = title ? `${title} | SellerForge AI` : "SellerForge AI — AI Tools for Etsy Sellers";
  const desc =
    description ||
    "AI-powered SEO titles, tags, descriptions, pricing, and trend research for Etsy sellers who want to grow faster.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
