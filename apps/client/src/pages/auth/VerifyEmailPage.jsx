import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import SEOHead from "../../components/shared/SEOHead.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import Button from "../../components/ui/Button.jsx";
import { authApi } from "../../services/api/authApi.js";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    authApi
      .verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <>
      <SEOHead title="Verify email" />
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        {status === "loading" && <Spinner size={28} className="text-emerald-400" />}
        {status === "success" && (
          <>
            <CheckCircle2 size={40} className="text-emerald-400 mb-4" />
            <h1 className="font-display text-2xl font-semibold mb-2">Email verified</h1>
            <p className="text-ink-500 mb-6">You're all set. Log in to start using your tools.</p>
            <Button as={Link} to="/login">Log in</Button>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle size={40} className="text-red-400 mb-4" />
            <h1 className="font-display text-2xl font-semibold mb-2">Link expired or invalid</h1>
            <p className="text-ink-500 mb-6">Request a new verification email from your account settings.</p>
            <Button as={Link} to="/login">Back to log in</Button>
          </>
        )}
      </div>
    </>
  );
}
