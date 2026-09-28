export default function BlogTOC({ content }) {
  const headings = content
    .split(/\n\n+/)
    .filter((b) => b.startsWith("## "))
    .map((b) => b.slice(3));

  if (headings.length === 0) return null;

  return (
    <div className="glass-card p-5 mb-8">
      <p className="eyebrow mb-3">In this article</p>
      <ul className="space-y-1.5 text-sm">
        {headings.map((h, i) => (
          <li key={i} className="text-ink-300">{h}</li>
        ))}
      </ul>
    </div>
  );
}
