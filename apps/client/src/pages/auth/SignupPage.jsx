import SEOHead from "../../components/shared/SEOHead.jsx";
import AuthLayoutPanel from "../../components/auth/AuthLayoutPanel.jsx";
import SignupForm from "../../components/auth/SignupForm.jsx";

export default function SignupPage() {
  return (
    <>
      <SEOHead title="Sign up" />
      <div className="flex min-h-screen">
        <AuthLayoutPanel />
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm">
            <h1 className="font-display text-2xl font-semibold mb-1">Start free</h1>
            <p className="text-ink-500 mb-8 text-sm">20 credits a month. No card required.</p>
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
