// Minimal markdown-ish renderer: paragraphs, headings, and lists, without
// pulling in a full markdown dependency for a single content field.
export default function BlogPostContent({ content }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="prose-content space-y-5 text-ink-100 leading-relaxed">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) return <h3 key={i} className="font-display text-xl font-semibold mt-8">{block.slice(4)}</h3>;
        if (block.startsWith("## ")) return <h2 key={i} className="font-display text-2xl font-semibold mt-10">{block.slice(3)}</h2>;
        if (block.startsWith("- ")) {
          return (
            <ul key={i} className="list-disc list-inside space-y-1">
              {block.split("\n").map((line, j) => (
                <li key={j}>{line.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}
