export default function Card({ children, className = "", hover = false }) {
  return (
    <div className={`glass-card p-6 ${hover ? "transition-transform hover:-translate-y-1" : ""} ${className}`}>
      {children}
    </div>
  );
}
