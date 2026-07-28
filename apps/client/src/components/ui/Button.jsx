export default function Button({ children, variant = "primary", className = "", as: As = "button", ...props }) {
  const base = variant === "primary" ? "btn-primary" : variant === "secondary" ? "btn-secondary" : "";
  return (
    <As className={`${base} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
      {children}
    </As>
  );
}
