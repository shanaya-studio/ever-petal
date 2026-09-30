import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { addFlower } from "../../api/flowerApi";

// ZOD VALIDATION SCHEMA
const schema = z.object({
  name: z
    .string()
    .min(1, "Flower name is required")
    .min(3, "Flower name must be at least 3 characters"),

  type: z
    .string()
    .min(1, "Flower type is required")
    .min(3, "Flower type must be at least 3 characters"),

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

function AddFlower() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // REACT HOOK FORM
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
  });

  // ADD FLOWER MUTATION
  const mutation = useMutation({
    mutationFn: addFlower,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flowers"],
      });
      navigate("/admin/flowers");
    },
  });

  // FORM SUBMIT

  function onSubmit(data) {
    const flower = {
      name: data.name,
      type: data.type,
      price: Number(data.price),
      image: data.image,
    };

    mutation.mutate(flower);
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
        <div className="max-w-2xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            🌸 Add Flower
          </h1>

          <p className="text-gray-600 mb-8">Add a new flower to Ever Petal.</p>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block font-semibold text-green-900 mb-2">
                  Flower Name
                </label>

                <input
                  type="text"
                  placeholder="Enter flower name"
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
                  placeholder="e.g. Romantic Flower"
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
                  placeholder="Enter price"
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
                  placeholder="Enter image URL"
                  {...register("image")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b3a3ec]"
                />

                {errors.image && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* =========================
                  API ERROR
              ========================= */}

              {mutation.isError && (
                <p className="text-red-600">Failed to add flower.</p>
              )}
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-[#6d4ca3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b3a3ec] transition duration-300 disabled:opacity-50"
                >
                  {mutation.isPending ? "Adding..." : "Add Flower"}
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
        </div>
      </div>
    </div>
  );
}

export default AddFlower;
