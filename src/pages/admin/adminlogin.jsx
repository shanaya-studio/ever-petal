import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Zod validation schema
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLogin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Admin Login Data:", data);

    // Navigate to Admin Dashboard
    navigate("/admin");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-16 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Background Overlay */}
      <div className="min-h-screen -m-6 -my-16 py-16 px-6 bg-white/30 backdrop-blur-sm flex items-center justify-center">
        {/* Login Card */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">
              <br />
            </div>

            <h1 className="text-3xl font-bold text-purple-900">Admin Login</h1>

            <p className="text-gray-600 mt-2">Login to manage Ever Petal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <br />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
            >
              Login as Admin
            </button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}
