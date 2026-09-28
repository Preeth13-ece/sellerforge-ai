import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import { authApi } from "../../services/api/authApi.js";
import { getErrorMessage } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function ResetPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function onSubmit({ password }) {
    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      showToast("Password updated — please log in.", "success");
      navigate("/login");
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="New password"
        type="password"
        {...register("password", { required: true, minLength: 8 })}
        error={errors.password && "At least 8 characters"}
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
