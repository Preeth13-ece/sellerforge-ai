import SEOHead from "../../components/shared/SEOHead.jsx";
import AuthLayoutPanel from "../../components/auth/AuthLayoutPanel.jsx";
import LoginForm from "../../components/auth/LoginForm.jsx";

export default function LoginPage() {
  return (
    <>
      <SEOHead title="Log in" />
      <div className="flex min-h-screen">
        <AuthLayoutPanel />
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm">
            <h1 className="font-display text-2xl font-semibold mb-1">Welcome back</h1>
            <p className="text-ink-500 mb-8 text-sm">Log in to your SellerForge AI dashboard.</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
