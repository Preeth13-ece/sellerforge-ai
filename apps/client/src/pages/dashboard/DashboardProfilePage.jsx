import { useState } from "react";
import ProfileForm from "../../components/dashboard/ProfileForm.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { dashboardApi } from "../../services/api/dashboardApi.js";
import { useToast } from "../../context/ToastContext.jsx";
import { getErrorMessage } from "../../services/api/axiosClient.js";

export default function DashboardProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwSaving, setPwSaving] = useState(false);

  async function handleSave(payload) {
    setSaving(true);
    try {
      await dashboardApi.updateProfile(payload);
      await refreshUser();
      showToast("Profile updated", "success");
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPwSaving(true);
    try {
      await dashboardApi.updatePassword(pwForm);
      showToast("Password changed — please log in again.", "success");
      await logout();
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    } finally {
      setPwSaving(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold mb-6">Profile</h1>
        <ProfileForm user={user} onSave={handleSave} saving={saving} />
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold mb-6">Change password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
          <Input
            label="Current password"
            type="password"
            required
            value={pwForm.currentPassword}
            onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
          />
          <Input
            label="New password"
            type="password"
            required
            minLength={8}
            value={pwForm.newPassword}
            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
          />
          <Button type="submit" disabled={pwSaving}>{pwSaving ? "Updating…" : "Update password"}</Button>
        </form>
      </div>
    </div>
  );
}
