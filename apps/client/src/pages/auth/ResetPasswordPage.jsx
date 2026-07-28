import SEOHead from "../../components/shared/SEOHead.jsx";
import AuthLayoutPanel from "../../components/auth/AuthLayoutPanel.jsx";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm.jsx";

export default function ResetPasswordPage() {
  return (
    <>
      <SEOHead title="Reset password" />
      <div className="flex min-h-screen">
        <AuthLayoutPanel />
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm">
            <h1 className="font-display text-2xl font-semibold mb-1">Choose a new password</h1>
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
