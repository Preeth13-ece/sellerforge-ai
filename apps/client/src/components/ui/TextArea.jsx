import { forwardRef } from "react";

const TextArea = forwardRef(function TextArea({ label, error, className = "", rows = 4, ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-100">{label}</span>}
      <textarea ref={ref} rows={rows} className={`input-field resize-y ${className}`} {...props} />
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
});

export default TextArea;