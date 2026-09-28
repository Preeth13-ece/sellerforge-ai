import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Users, Mail, FileText, MessageSquare, Link2, ArrowLeft } from "lucide-react";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/admin/affiliate-clicks", label: "Affiliate Clicks", icon: Link2 },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-forge-border p-6">
      <span className="eyebrow mb-8">Admin</span>
      <nav className="space-y-1 flex-1">
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
      <Link to="/dashboard" className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-100">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
    </aside>
  );
}
