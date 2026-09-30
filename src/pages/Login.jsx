import { Link } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Validate form
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Minimum 8 characters"),
});
export default function Form() {
  //Get Theme
  const theme = useThemeStore((state) => state.theme);

  // Form data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  // Submit form
  const onSubmit = (data) => {
    console.log("submit", data);
    alert("Login successful!");
  };
  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12"
          : "min-h-screen flex items-center justify-center bg-pink-50 px-4 py-12"
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          theme === "dark"
            ? "w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-white"
            : "w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-pink-100"
        }
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">
            🌸 Ever <span className="text-pink-500">Petal</span>
          </h1>

          <p
            className={
              theme === "dark" ? "text-white mt-2" : "text-gray-500 mt-2"
            }
          >
            Welcome back! Please login to your account.
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
          Login
        </h2>

        {/* Email */}
        <div className="mb-5">
          <label
            className={
              theme === "dark"
                ? "block font-medium text-white mb-2"
                : "block font-medium text-gray-700 mb-2"
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
                ? "w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition placeholder-gray-300"
                : "w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
            }
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className={
              theme === "dark"
                ? "block font-medium text-white mb-2"
                : "block font-medium text-gray-700 mb-2"
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
                ? "w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition placeholder-gray-300"
                : "w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
            }
          />
          <br />
          <br />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md"
        >
          Login
        </button>

        {/* Register Link */}
        <p
          className={
            theme === "dark"
              ? "text-center text-white mt-6"
              : "text-center text-gray-600 mt-6"
          }
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-500 font-semibold hover:text-pink-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
