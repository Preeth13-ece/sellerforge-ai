const testimonials = [
  { quote: "Cut my listing time from an hour to ten minutes. The tag generator alone paid for itself.", name: "Maren K.", shop: "Ceramics shop owner" },
  { quote: "The pricing calculator finally made me stop underpricing my work.", name: "Devon R.", shop: "Leather goods seller" },
  { quote: "I found a product niche with the idea generator that I never would've thought of.", name: "Priya S.", shop: "Digital prints shop" },
];

export default function TestimonialsCarousel() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center mb-14">
        <span className="eyebrow">Sellers say</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3">Real shops, real results</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="glass-card p-6">
            <p className="text-sm text-ink-100 mb-6">"{t.quote}"</p>
            <p className="text-sm font-medium">{t.name}</p>
            <p className="text-xs text-ink-500">{t.shop}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
