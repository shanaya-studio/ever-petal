import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <header className="bg-gradient-to-r from-[#6d4ca3] to-[#b3a3ec] text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/admin" className="text-2xl font-bold text-white">
          Admin Panel
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">

          <Link
            to="/admin"
            className="text-white hover:text-[#f8c8dc] transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/flowers"
            className="text-white hover:text-[#f8c8dc] transition"
          >
            Flowers
          </Link>

          {/* <Link
            to="/admin/users"
            className="text-white hover:text-[#f8c8dc] transition"
          >
            Users
          </Link> */}

          <Link
            to="/admin/orders"
            className="text-white hover:text-[#f8c8dc] transition"
          >
            Orders
          </Link>

          {/* View Website */}
          <Link
            to="/"
            className="rounded-lg bg-white px-4 py-2 text-[#6d4ca3] hover:bg-[#f8c8dc] transition"
          >
            View Website
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;