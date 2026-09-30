import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFlower, updateFlower } from "../../api/flowerApi";
import { Link, useNavigate, useParams } from "react-router-dom";

// Zod Validation Schema
const schema = z.object({
  name: z
    .string()
    .min(1, "Flower name is required")
    .min(2, "Flower name must be at least 2 characters"),

  type: z
    .string()
    .min(1, "Flower type is required")
    .min(2, "Flower type must be at least 2 characters"),

  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => Number(value) > 0, {
      message: "Price must be greater than 0",
    }),

  image: z
    .string()
    .min(1, "Image URL is required")
    .url("Please enter a valid image URL"),
});

function EditFlower() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Get Single Flower
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

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",
      type: "",
      price: "",
      image: "",
    },

    // TanStack Query data fills the form
    values: flower
      ? {
          name: flower.name,
          type: flower.type,
          price: String(flower.price),
          image: flower.image,
        }
      : undefined,
  });

  // Update Flower Mutation
  const mutation = useMutation({
    mutationFn: ({ id, flower }) => updateFlower(id, flower),

    onSuccess: () => {
      // Refresh flowers list
      queryClient.invalidateQueries({
        queryKey: ["flowers"],
      });

      // Refresh single flower
      queryClient.invalidateQueries({
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
            "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 text-center">
            <p className="text-lg text-red-600 mb-4">Failed to load flower.</p>

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

  function onSubmit(data) {
    const updatedFlower = {
      name: data.name,
      type: data.type,
      price: Number(data.price),
      image: data.image,
    };

    mutation.mutate({
      id: id,
      flower: updatedFlower,
    });
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-16 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Background Overlay */}

      <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          {/* Page Heading */}

          <h1 className="text-4xl font-bold text-green-900 mb-2">
            ✏️ Edit Flower
          </h1>

          <p className="text-gray-600 mb-8">Update flower information.</p>

          {/* Form Card */}

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block font-semibold text-green-900 mb-2">
                  Flower Name
                </label>

                <input
                  type="text"
                  {...register("name")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b3a3ec]"
                />

                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-green-900 mb-2">
                  Flower Type
                </label>

                <input
                  type="text"
                  {...register("type")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b3a3ec]"
                />

                {errors.type && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-green-900 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  {...register("price")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b3a3ec]"
                />

                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-green-900 mb-2">
                  Image URL
                </label>

                <input
                  type="text"
                  {...register("image")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b3a3ec]"
                />

                {errors.image && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* ===============================
                  Mutation Error
              =============================== */}

              {mutation.isError && (
                <p className="text-red-600">Failed to update flower.</p>
              )}
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-[#6d4ca3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b3a3ec] transition duration-300 disabled:opacity-50"
                >
                  {mutation.isPending ? "Updating..." : "Update Flower"}
                </button>

                <Link
                  to="/admin/flowers"
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <div className="mt-6">
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

export default EditFlower;
