import { Link } from "react-router-dom";
import { LogOut, Wrench } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export default function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-forge-border px-6 lg:px-10 py-4">
      <Link to="/tools" className="flex items-center gap-2 text-sm font-medium text-ink-300 hover:text-emerald-400">
        <Wrench size={16} /> Browse tools
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="hidden sm:block text-sm text-ink-300">{user?.name}</span>
        <button onClick={logout} className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-red-400">
          <LogOut size={15} /> Log out
        </button>
      </div>
    </header>
  );
}
