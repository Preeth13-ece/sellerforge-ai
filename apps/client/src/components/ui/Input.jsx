import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, error, className = "", ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-100">{label}</span>}
      <input ref={ref} className={`input-field ${className}`} {...props} />
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
});

export default Input;