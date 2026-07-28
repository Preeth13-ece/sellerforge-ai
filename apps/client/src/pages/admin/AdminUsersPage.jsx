import { useEffect, useState } from "react";
import UsersTable from "../../components/admin/UsersTable.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { axiosClient } from "../../services/api/axiosClient.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    axiosClient.get("/admin/users").then(({ data }) => setUsers(data.data.users)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleRoleChange(id, role) {
    await axiosClient.patch(`/admin/users/${id}/role`, { role });
    showToast("Role updated", "success");
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Users</h1>
      {loading ? <Skeleton className="h-64" /> : <UsersTable users={users} onRoleChange={handleRoleChange} />}
    </div>
  );
}
