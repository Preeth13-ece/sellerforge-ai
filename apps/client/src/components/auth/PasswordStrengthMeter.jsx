export default function PasswordStrengthMeter({ password = "" }) {
  const score = [password.length >= 8, /\d/.test(password), /[A-Z]/.test(password), /[^A-Za-z0-9]/.test(password)]
    .filter(Boolean).length;
  const labels = ["Too short", "Weak", "Okay", "Good", "Strong"];
  const colors = ["bg-red-500", "bg-red-500", "bg-ember-400", "bg-emerald-500", "bg-emerald-400"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < score ? colors[score] : "bg-forge-surface2"}`} />
        ))}
      </div>
      <p className="mt-1 text-xs text-ink-500">{labels[score]}</p>
    </div>
  );
}
