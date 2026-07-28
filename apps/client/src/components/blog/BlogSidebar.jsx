import NewsletterForm from "../shared/NewsletterForm.jsx";

export default function BlogSidebar() {
  return (
    <aside className="space-y-8">
      <div className="glass-card p-6">
        <h4 className="font-display font-semibold mb-2">Get weekly seller tips</h4>
        <p className="text-sm text-ink-500 mb-4">SEO, pricing, and product research — straight to your inbox.</p>
        <NewsletterForm source="blog" compact />
      </div>
    </aside>
  );
}
