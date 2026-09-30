import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Flower2,
  ShoppingBag,
  LogOut,
} from "lucide-react";

export default function AdminSideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin login data here later if you add authentication
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#6d4ca3] via-[#8d70c4] to-[#b3a3ec] text-white p-5">
      
      {/* Navigation */}
      <nav className="space-y-3">

        <br />

        {/* Dashboard */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300 ${
              isActive
                ? "bg-purple-900 text-white"
                : "text-white hover:bg-purple-900"
            }`
          }
        >
          <LayoutDashboard size={21} />
          <span>Dashboard</span>
        </NavLink>

        <br />
        <hr />
        <br />

        {/* Flowers */}
        <NavLink
          to="/admin/flowers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300 ${
              isActive
                ? "bg-[#b3a3ec] text-white"
                : "text-white hover:bg-[#b3a3ec]"
            }`
          }
        >
          <Flower2 size={21} />
          <span>Manage Flowers</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300 ${
              isActive
                ? "bg-[#b3a3ec] text-white"
                : "text-white hover:bg-[#b3a3ec]"
            }`
          }
        >
          <ShoppingBag size={21} />
          <span>Manage Orders</span>
        </NavLink>

        <br />
        <hr />
        <br />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-pink-500 transition duration-300"
        >
          <LogOut size={21} />
          <span>Logout</span>
        </button>

      </nav>
    </aside>
  );
}