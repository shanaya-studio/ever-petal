import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useThemeStore from "../store/themeStore";
import useCartStore from "../store/cartStore";
import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../api/orderApi";

// Validation Schema
const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().min(1, "Email is required").email("Enter a valid email"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 characters"),

  address: z.string().min(1, "Address is required"),

  city: z.string().min(1, "City is required"),

  payment: z.string().min(1, "Please select a payment method"),
});

export default function Checkout() {
  // Get theme from Zustand
  const theme = useThemeStore((state) => state.theme);

  // Get cart data from Zustand and clear cart so that cart is empty after successfully order
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Delivery charges
  const delivery = cartItems.length > 0 ? 5 : 0;

  // Calculate total
  const total = subtotal + delivery;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      payment: "Cash on Delivery",
    },
  });
  const mutation = useMutation({
    mutationFn: addOrder,

    onSuccess: () => {
      clearCart();

      alert("Order placed successfully! 🌸");
    },

    onError: () => {
      alert("Failed to place order. Please try again.");
    },
  });
  const onSubmit = (data) => {
    // Check if cart is empty
    if (cartItems.length === 0) {
      alert(
        "Your cart is empty! Please add flowers before placing an order. 🌸",
      );
      return;
    }

    const order = {
      customerName: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,

      items: cartItems.map((item) => ({
        flowerId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

      subtotal: subtotal,
      delivery: delivery,
      total: total,

      payment: data.payment,

      status: "Pending",

      orderDate: new Date().toISOString(),
    };

    mutation.mutate(order);
  };

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-gray-900 text-white py-12 px-6"
          : "min-h-screen bg-pink-50 text-gray-900 py-12 px-6"
      }
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            Checkout <span className="text-pink-500">🌸</span>
          </h1>

          <p
            className={
              theme === "dark" ? "text-white mt-2" : "text-gray-500 mt-2"
            }
          >
            Enter your delivery information
          </p>
        </div>

        {/* Main Checkout Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div
            className={
              theme === "dark"
                ? "lg:col-span-2 bg-gray-800 text-white rounded-2xl shadow-md p-8"
                : "lg:col-span-2 bg-white text-gray-900 rounded-2xl shadow-md p-8"
            }
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-medium mb-2">Full Name</label>

                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className={
                    theme === "dark"
                      ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      : "w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  }
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-2">Email</label>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={
                    theme === "dark"
                      ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      : "w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  }
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium mb-2">Phone Number</label>

                <input
                  type="text"
                  {...register("phone")}
                  placeholder="03XX-XXXXXXX"
                  className={
                    theme === "dark"
                      ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      : "w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  }
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block font-medium mb-2">
                  Delivery Address
                </label>

                <textarea
                  {...register("address")}
                  placeholder="Enter your complete address"
                  rows="4"
                  className={
                    theme === "dark"
                      ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      : "w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  }
                />

                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block font-medium mb-2">City</label>

                <input
                  type="text"
                  {...register("city")}
                  placeholder="Enter your city"
                  className={
                    theme === "dark"
                      ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      : "w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  }
                />

                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Payment */}
              <div>
                <label className="block font-medium mb-2">Payment Method</label>

                <select
                  {...register("payment")}
                  className={
                    theme === "dark"
                      ? "w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3"
                      : "w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3"
                  }
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>

                  <option value="Credit/Debit Card">Credit / Debit Card</option>
                </select>

                {errors.payment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.payment.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition disabled:opacity-50"
              >
                {mutation.isPending ? "Placing Order..." : "Place Order 💐"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div
            className={
              theme === "dark"
                ? "bg-gray-800 text-white rounded-2xl shadow-md p-6 h-fit"
                : "bg-white text-gray-900 rounded-2xl shadow-md p-6 h-fit"
            }
          >
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Order Summary 🛒
            </h2>

            {/* Selected Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={
                    theme === "dark"
                      ? "flex items-center gap-3 border-b border-gray-600 pb-4"
                      : "flex items-center gap-3 border-b border-gray-200 pb-4"
                  }
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  {/* Name and Quantity */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-700">
                      {item.name}
                    </h3>

                    <p
                      className={
                        theme === "dark"
                          ? "text-sm text-gray-300"
                          : "text-sm text-gray-500"
                      }
                    >
                      Quantity: {item.quantity}
                    </p>

                    <p
                      className={
                        theme === "dark"
                          ? "text-sm text-gray-300"
                          : "text-sm text-gray-500"
                      }
                    >
                      ${item.price} each
                    </p>
                  </div>

                  {/* Item Total */}
                  <p className="font-bold text-pink-500">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div
              className={
                theme === "dark"
                  ? "flex justify-between text-gray-300 mb-4"
                  : "flex justify-between text-gray-600 mb-4"
              }
            >
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            {/* Delivery */}
            <div
              className={
                theme === "dark"
                  ? "flex justify-between text-gray-300 mb-4"
                  : "flex justify-between text-gray-600 mb-4"
              }
            >
              <span>Delivery</span>
              <span>${delivery}</span>
            </div>

            {/* Total */}
            <div
              className={
                theme === "dark"
                  ? "border-t border-gray-600 pt-4"
                  : "border-t border-gray-200 pt-4"
              }
            >
              <div className="flex justify-between">
                <span
                  className={
                    theme === "dark"
                      ? "text-lg font-bold text-white"
                      : "text-lg font-bold text-gray-800"
                  }
                >
                  Total
                </span>

                <span className="text-2xl font-bold text-pink-500">
                  ${total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
