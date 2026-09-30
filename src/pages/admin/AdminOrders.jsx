import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrder } from "../../api/orderApi";

function AdminOrders() {
  const queryClient = useQueryClient();

  // Get orders
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const orders = ordersData?.data || [];

  // Update order status
  const mutation = useMutation({
    mutationFn: ({ id, order }) => updateOrder(id, order),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: () => {
      alert("Failed to update order.");
    },
  });

  // Accept order
  function handleAccept(order) {
    const updatedOrder = {
      ...order,
      status: "Processing",
    };

    mutation.mutate({
      id: order.id,
      order: updatedOrder,
    });
  }

  // Reject order
  function handleReject(order) {
    const updatedOrder = {
      ...order,
      status: "Cancelled",
    };

    mutation.mutate({
      id: order.id,
      order: updatedOrder,
    });
  }

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading orders...
        </p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">
          Failed to load orders.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-16 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm">

        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-6">
           <h2 className="text-4xl font-bold text-green-900">
            Manage <span className="text-pink-500">Orders</span>
          </h2>

            <p className="mt-2 text-gray-700">
              View and manage customer orders.
            </p>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-2xl bg-white/95 backdrop-blur-md shadow-lg">

            <table className="w-full text-left">

              {/* Table Header */}
              <thead className="bg-gradient-to-r from-[#6d4ca3] to-[#b3a3ec] text-white">
                <tr>
                  <th className="px-5 py-4">
                    Order ID
                  </th>

                  <th className="px-5 py-4">
                    Customer
                  </th>

                  <th className="px-5 py-4">
                    City
                  </th>

                  <th className="px-5 py-4">
                    Items
                  </th>

                  <th className="px-5 py-4">
                    Total
                  </th>

                  <th className="px-5 py-4">
                    Payment
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>

                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No orders found 🌸
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-[#f8c8dc] transition duration-300"
                    >

                      {/* Order ID */}
                      <td className="px-5 py-4 font-semibold text-gray-800">
                        #{order.id}
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">
                          {order.customerName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.email}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.phone}
                        </p>
                      </td>

                      {/* City */}
                      <td className="px-5 py-4 text-gray-700">
                        {order.city}
                      </td>

                      {/* Items */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">

                          {order.items?.map((item, index) => (
                            <p
                              key={index}
                              className="text-sm text-gray-700"
                            >
                              🌸 {item.name} × {item.quantity}
                            </p>
                          ))}

                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-4 font-bold text-green-700">
                        ${order.total}
                      </td>

                      {/* Payment */}
                      <td className="px-5 py-4 text-gray-700">
                        {order.payment}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">

                        {order.status === "Pending" ? (
                          <div className="flex gap-2">

                            {/* Accept */}
                            <button
                              onClick={() => handleAccept(order)}
                              disabled={mutation.isPending}
                              className="rounded-lg bg-[#6d4ca3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b3a3ec] transition duration-300 disabled:opacity-50"
                            >
                              ✓ Accept
                            </button>

                            {/* Reject */}
                            <button
                              onClick={() => handleReject(order)}
                              disabled={mutation.isPending}
                              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition duration-300 disabled:opacity-50"
                            >
                              ✕ Reject
                            </button>

                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No actions
                          </span>
                        )}

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminOrders;