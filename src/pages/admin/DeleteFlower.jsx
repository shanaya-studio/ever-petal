import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFlower, getFlower } from "../../api/flowerApi";
import { Link, useNavigate, useParams } from "react-router-dom";

function DeleteFlower() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Get single flower
  const {
    data: flowerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flower", id],
    queryFn: () => getFlower(id),
  });

  // Axios response -> actual flower
  const flower = flowerData?.data;

  // Delete Flower Mutation
  const mutation = useMutation({
    mutationFn: deleteFlower,

    onSuccess: () => {
      // Refresh flowers list
      queryClient.invalidateQueries({
        queryKey: ["flowers"],
      });

      // Remove deleted flower from cache
      queryClient.removeQueries({
        queryKey: ["flower", id],
      });

      // Go back to flowers page
      navigate("/admin/flowers");
    },
  });

  // Loading
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-fixed py-16 px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <p className="text-lg text-green-900 font-semibold">
            Loading flower...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (isError || !flower) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-fixed py-16 px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 text-center">
            <p className="text-lg text-red-600 mb-4">Flower not found.</p>

            <Link
              to="/admin/flowers"
              className="text-green-900 font-semibold hover:text-[#6d4ca3] hover:underline"
            >
              ← Back to Flowers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleDelete() {
    mutation.mutate(id);
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
        <div className="max-w-lg mx-auto">
          {/* Delete Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center">
            {/* Icon */}
            <div className="text-5xl mb-5">🗑️</div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-green-900">Delete Flower</h1>

            <p className="text-gray-600 mt-3">
              Are you sure you want to delete this flower?
            </p>

            {/* Flower Information */}
            <div className="mt-6 bg-[#f8c8dc]/50 rounded-xl p-5">
              <img
                src={flower.image}
                alt={flower.name}
                className="w-32 h-32 object-cover rounded-xl mx-auto shadow"
              />

              <h2 className="text-xl font-bold text-green-900 mt-4">
                {flower.name}
              </h2>

              <p className="text-gray-600">{flower.type}</p>

              <p className="text-[#6d4ca3] font-bold mt-2">${flower.price}</p>
            </div>

            {/* Error */}
            {mutation.isError && (
              <p className="text-red-600 mt-4">Failed to delete flower.</p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 justify-center mt-6">
              {/* Delete */}
              <button
                onClick={handleDelete}
                disabled={mutation.isPending}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 disabled:opacity-50"
              >
                {mutation.isPending ? "Deleting..." : "Delete Flower"}
              </button>

              {/* Cancel */}
              <Link
                to="/admin/flowers"
                className="bg-[#6d4ca3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b3a3ec] transition duration-300"
              >
                Cancel
              </Link>
            </div>
          </div>

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              to="/admin/flowers"
              className="text-green-900 font-semibold hover:text-[#6d4ca3] hover:underline"
            >
              ← Back to Flowers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteFlower;
