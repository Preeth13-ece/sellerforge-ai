import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-forge-bg">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 max-w-6xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
