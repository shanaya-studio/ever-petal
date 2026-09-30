import { Flower, ShoppingBag } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getFlowers } from "../../api/flowerApi";
import { getOrders } from "../../api/orderApi";

export default function AdminDashboard() {
  // Get Flowers
  const { data: flowersData } = useQuery({
    queryKey: ["flowers"],
    queryFn: getFlowers,
  });

  const flowers = flowersData?.data || [];

  // Get Orders
  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const orders = ordersData?.data || [];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-16 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Background Overlay */}
      <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm">

        {/* PAGE HEADING */}
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-green-900">
            Admin <span className="text-pink-500">Dashboard</span>
          </h2>

          <p className="text-gray-600 mt-2 mb-8 text-lg">
            Manage your Ever Petal flower shop
          </p>

          {/* DASHBOARD CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* TOTAL FLOWERS */}
            <div className="bg-white/90 backdrop-blur-md p-7 rounded-2xl shadow-lg hover:bg-[#b3a3ec] hover:text-white transition duration-300">

              <p className="text-gray-500 text-lg">
                Total Flowers
              </p>

              <h3 className="text-5xl font-bold mt-2 text-green-900">
                {flowers.length}
              </h3>

              <p className="mt-4 text-pink-450">
                <Flower size={48} strokeWidth={1.8} />
              </p>

            </div>

            {/* TOTAL ORDERS */}
            <div className="bg-white/90 backdrop-blur-md p-7 rounded-2xl shadow-lg hover:bg-[#b3a3ec] hover:text-white transition duration-300">

              <p className="text-gray-500 text-lg">
                Total Orders
              </p>

              <h3 className="text-5xl font-bold mt-2 text-green-900">
                {orders.length}
              </h3>

              <p className="mt-4 text-pink-450">
                <ShoppingBag size={48} strokeWidth={1.8} />
              </p>

            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-7">

            <h3 className="text-2xl font-bold mb-5 text-green-900">
              Quick Actions
            </h3>

            <div className="flex flex-wrap gap-4">

              {/* MANAGE FLOWERS */}
              <NavLink
                to="/admin/flowers"
                className="inline-flex items-center gap-2 bg-pink-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
              >
                <Flower size={20} />
                Manage Flowers
              </NavLink>

              {/* MANAGE ORDERS */}
              <NavLink
                to="/admin/orders"
                className="inline-flex items-center gap-2 bg-[#6d4ca3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b3a3ec] transition"
              >
                <ShoppingBag size={20} />
                Manage Orders
              </NavLink>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}