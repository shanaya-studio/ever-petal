import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFlowers } from "../../api/flowerApi";

function AdminFlowers() {
  const {
    data: flowersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flowers"],
    queryFn: getFlowers,
  });

  // Axios response -> actual flowers array
  const flowers = flowersData?.data || [];

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-gray-600">Loading flowers...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-red-600">Failed to load flowers.</p>
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
      {/* Background Overlay */}
      <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-green-900">
                Manage <span className="text-pink-500">Flowers</span>
              </h2>

              <p className="mt-2 text-gray-600">
                Add, edit and manage your flowers.
              </p>
            </div>

            {/* Add Flower Button */}
            <Link
              to="/admin/flowers/add"
              className="rounded-lg bg-[#6d4ca3] px-5 py-3 font-semibold text-white hover:bg-[#b3a3ec] hover:text-white transition duration-300"
            >
              + Add Flower
            </Link>
          </div>

          {/* Flowers Table */}
          <div className="overflow-x-auto rounded-2xl bg-white/95 backdrop-blur-md shadow-lg">
            <table className="w-full text-left">
              {/* TABLE HEADER */}
              <thead className="bg-gradient-to-r from-[#6d4ca3] to-[#b3a3ec] text-white">
                <tr>
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {flowers.map((flower) => (
                  <tr
                    key={flower.id}
                    className="border-b border-gray-200 hover:bg-[#f8c8dc] transition duration-300"
                  >
                    {/* Image */}
                    <td className="px-5 py-4">
                      <img
                        src={flower.image}
                        alt={flower.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {flower.name}
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4 text-gray-600">{flower.type}</td>

                    {/* Price */}
                    <td className="px-5 py-4 font-semibold text-green-700">
                      ${flower.price}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {/* Edit */}
                        <Link
                          to={`/admin/flowers/edit/${flower.id}`}
                          className="rounded-lg bg-[#6d4ca3] px-4 py-2 text-sm text-white hover:bg-[#b3a3ec] transition duration-300"
                        >
                          Edit
                        </Link>

                        {/* Delete */}
                        <Link
                          to={`/admin/flowers/delete/${flower.id}`}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <Link
              to="/admin"
              className="text-green-900 font-semibold hover:text-[#6d4ca3] hover:underline transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFlowers;
