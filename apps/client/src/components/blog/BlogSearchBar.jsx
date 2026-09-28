import { Search } from "lucide-react";

export default function BlogSearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-md">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles…"
        className="input-field pl-10"
      />
    </div>
  );
}
