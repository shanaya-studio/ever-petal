import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSideNav from "../../components/admin/AdminSideNav";
import AdminFooter from "../../components/admin/AdminFooter";

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <AdminHeader />

      <div className="flex flex-1">

        <AdminSideNav />

        <main className="flex-1">
          <Outlet />
        </main>

      </div>

      <AdminFooter />

    </div>
  );
}

export default AdminLayout;