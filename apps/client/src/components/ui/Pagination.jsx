export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-ink-500 font-mono px-2">
        {page} / {pages}
      </span>
      <button
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
