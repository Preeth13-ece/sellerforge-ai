export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && <Icon size={36} className="text-ink-500 mb-4" />}
      <h3 className="text-lg font-display font-semibold text-ink-100">{title}</h3>
      {description && <p className="mt-2 text-sm text-ink-500 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
