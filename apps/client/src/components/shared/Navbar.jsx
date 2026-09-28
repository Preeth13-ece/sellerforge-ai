import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Hammer } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import Button from "../ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth.js";

const navLinks = [
  { to: "/tools", label: "Tools" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-forge-border bg-forge-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Hammer size={20} className="text-emerald-400" />
          SellerForge <span className="text-emerald-400">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-emerald-400" : "text-ink-300 hover:text-ink-100"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button as={Link} to="/dashboard" variant="secondary" className="px-5 py-2.5 text-sm">
              Dashboard
            </Button>
          ) : (
            <>
              <Button as={Link} to="/login" variant="secondary" className="px-5 py-2.5 text-sm">
                Log in
              </Button>
              <Button as={Link} to="/signup" className="px-5 py-2.5 text-sm">
                Start free
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden text-ink-100" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-forge-border px-6 py-4 space-y-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm font-medium text-ink-100" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            {isAuthenticated ? (
              <Button as={Link} to="/dashboard" variant="secondary" className="flex-1 text-sm">Dashboard</Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="secondary" className="flex-1 text-sm">Log in</Button>
                <Button as={Link} to="/signup" className="flex-1 text-sm">Start free</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
