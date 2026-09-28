import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import PasswordStrengthMeter from "./PasswordStrengthMeter.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { getErrorMessage } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function SignupForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const password = watch("password", "");

  async function onSubmit(data) {
    setLoading(true);
    try {
      await signup(data);
      showToast("Account created — check your email to verify it.", "success");
      navigate("/login");
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input label="Name" {...register("name", { required: "Name is required" })} error={errors.name?.message} />
      <Input
        label="Email"
        type="email"
        {...register("email", { required: "Email is required" })}
        error={errors.email?.message}
      />
      <div>
        <Input
          label="Password"
          type="password"
          {...register("password", { required: "Password is required", minLength: { value: 8, message: "At least 8 characters" } })}
          error={errors.password?.message}
        />
        <PasswordStrengthMeter password={password} />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account…" : "Create free account"}
      </Button>
      <p className="text-center text-sm text-ink-500">
        Already have an account? <Link to="/login" className="text-emerald-400 hover:underline">Log in</Link>
      </p>
    </form>
  );
}
