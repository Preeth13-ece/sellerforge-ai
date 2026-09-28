import { NavLink } from "react-router-dom";
import { LayoutDashboard, History, Star, Download, User, Gauge, CreditCard, Hammer } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/history", label: "History", icon: History },
  { to: "/dashboard/favorites", label: "Favorites", icon: Star },
  { to: "/dashboard/downloads", label: "Downloads", icon: Download },
  { to: "/dashboard/api-usage", label: "API Usage", icon: Gauge },
  { to: "/dashboard/subscription", label: "Subscription", icon: CreditCard },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-forge-border p-6">
      <div className="flex items-center gap-2 font-display text-lg font-semibold mb-10">
        <Hammer size={20} className="text-emerald-400" />
        SellerForge <span className="text-emerald-400">AI</span>
      </div>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-emerald-500/10 text-emerald-400" : "text-ink-300 hover:bg-forge-surface2 hover:text-ink-100"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
