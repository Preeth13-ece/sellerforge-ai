import { forwardRef } from "react";

const Select = forwardRef(function Select({ label, options = [], className = "", ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-100">{label}</span>}
      <select ref={ref} className={`input-field ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
});

export default Select;