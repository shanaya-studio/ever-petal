import { Link } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validate form
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function Register() {
 //Get Theme
  const theme = useThemeStore((state) => state.theme);

  // Form data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Submit form
  const onSubmit = (data) => {
    console.log("submit", data);
    alert("Register successful!");
  };

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-12"
          : "min-h-screen bg-pink-50 flex items-center justify-center px-6 py-12"
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          theme === "dark"
            ? "w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700"
            : "w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-pink-100"
        }
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🌸</div>

          <h1 className="text-2xl font-bold text-green-700">
            Ever <span className="text-pink-500">Petal</span>
          </h1>

          <p
            className={
              theme === "dark"
                ? "text-white text-sm mt-1"
                : "text-gray-500 text-sm mt-1"
            }
          >
            Create your account
          </p>
        </div>

        {/* Heading */}
        <h2
          className={
            theme === "dark"
              ? "text-2xl font-bold text-white text-center mb-6"
              : "text-2xl font-bold text-gray-800 text-center mb-6"
          }
        >
          Register
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label
            className={
              theme === "dark"
                ? "block text-white font-medium mb-2"
                : "block text-gray-700 font-medium mb-2"
            }
          >
            Name
          </label>

          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name"
            className={
              theme === "dark"
                ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-gray-300"
                : "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            }
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className={
              theme === "dark"
                ? "block text-white font-medium mb-2"
                : "block text-gray-700 font-medium mb-2"
            }
          >
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={
              theme === "dark"
                ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-gray-300"
                : "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            }
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            className={
              theme === "dark"
                ? "block text-white font-medium mb-2"
                : "block text-gray-700 font-medium mb-2"
            }
          >
            Password
          </label>

          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className={
              theme === "dark"
                ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-gray-300"
                : "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            }
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            className={
              theme === "dark"
                ? "block text-white font-medium mb-2"
                : "block text-gray-700 font-medium mb-2"
            }
          >
            Confirm Password
          </label>

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm your password"
            className={
              theme === "dark"
                ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-gray-300"
                : "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            }
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 hover:scale-[1.02] transition duration-300 shadow-md"
        >
          Create Account 🌸
        </button>

        {/* Login Link */}
        <p
          className={
            theme === "dark"
              ? "text-center text-white text-sm mt-6"
              : "text-center text-gray-600 text-sm mt-6"
          }
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-500 font-semibold hover:text-pink-600"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
