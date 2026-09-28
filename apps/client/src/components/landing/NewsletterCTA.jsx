import NewsletterForm from "../shared/NewsletterForm.jsx";

export default function NewsletterCTA() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <span className="eyebrow">Stay sharp</span>
      <h2 className="font-display text-3xl font-semibold mt-3 mb-4">Weekly Etsy SEO tips, no fluff</h2>
      <p className="text-ink-500 mb-8">Join sellers getting one actionable tip a week — unsubscribe anytime.</p>
      <div className="max-w-md mx-auto">
        <NewsletterForm source="home" />
      </div>
    </section>
  );
}
