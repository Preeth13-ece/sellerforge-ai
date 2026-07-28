import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import { authApi } from "../../services/api/authApi.js";
import { getErrorMessage } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function ForgotPasswordForm() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  async function onSubmit({ email }) {
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return <p className="text-sm text-ink-300">If that email exists, a reset link is on its way. Check your inbox.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input label="Email" type="email" {...register("email", { required: true })} />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
