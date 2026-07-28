import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { getErrorMessage } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  async function onSubmit(data) {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Email"
        type="email"
        {...register("email", { required: "Email is required" })}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register("password", { required: "Password is required" })}
        error={errors.password?.message}
      />
      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm text-emerald-400 hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in…" : "Log in"}
      </Button>
      <p className="text-center text-sm text-ink-500">
        No account? <Link to="/signup" className="text-emerald-400 hover:underline">Start free</Link>
      </p>
    </form>
  );
}
