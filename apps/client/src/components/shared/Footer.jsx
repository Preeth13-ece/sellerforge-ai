import { Link } from "react-router-dom";
import { Hammer } from "lucide-react";
import NewsletterForm from "./NewsletterForm.jsx";

const columns = [
  {
    title: "Tools",
    links: [
      { to: "/tools/etsy-seo-title-generator", label: "Title Generator" },
      { to: "/tools/etsy-tag-generator", label: "Tag Generator" },
      { to: "/tools/etsy-pricing-calculator", label: "Pricing Calculator" },
      { to: "/tools", label: "All tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-of-service", label: "Terms of Service" },
      { to: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-forge-border mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
              <Hammer size={20} className="text-emerald-400" />
              SellerForge <span className="text-emerald-400">AI</span>
            </Link>
            <p className="mt-4 text-sm text-ink-500 max-w-xs">
              AI tools that help Etsy sellers write better listings, price with confidence, and find their next product.
            </p>
            <div className="mt-6 max-w-sm">
              <NewsletterForm source="footer" />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-ink-300 hover:text-emerald-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="seam-divider my-10" />
        <p className="text-xs text-ink-500 font-mono">
          © {new Date().getFullYear()} SellerForge AI. Not affiliated with Etsy, Inc.
        </p>
      </div>
    </footer>
  );
}
