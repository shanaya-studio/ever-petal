import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCounter from "../hooks/useCounter";
import { getFlower } from "../api/flowerApi";
import useCartStore from "../store/cartStore";
import useThemeStore from "../store/themeStore";

export default function FlowerDetails() {
  const { id } = useParams();
  // Get theme
  const theme = useThemeStore((state) => state.theme);

  //call Add to Cart
  const addToCart = useCartStore((state) => state.addToCart);
  const {
    data: flower,
    isPending,
    error,
  } = useQuery({
    queryKey: ["flower", id],

    queryFn: async () => {
      const response = await getFlower(id);
      return response.data;
    },
  });
  // Quantity
  const { count: quantity, increment, decrement } = useCounter(1);

  // Loading
  if (isPending) {
    return (
      <div
        className={
          theme === "dark"
            ? "min-h-screen bg-gray-900 text-white flex items-center justify-center"
            : "min-h-screen bg-pink-50 text-gray-900 flex items-center justify-center"
        }
      >
        <h2 className="text-2xl font-semibold">Loading flower... 🌸</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div
        className={
          theme === "dark"
            ? "min-h-screen bg-gray-900 text-white flex items-center justify-center"
            : "min-h-screen bg-pink-50 text-gray-900 flex items-center justify-center"
        }
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Error loading flower ❌
          </h2>

          <Link
            to="/flowers"
            className="bg-pink-500 text-white px-6 py-3 rounded-full"
          >
            Back to Flowers
          </Link>
        </div>
      </div>
    );
  }

  // Add selected quantity or new flower to cart
  const handleAddToCart = () => {
    addToCart(flower, quantity);
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
        {/* Back Button */}
        <Link
          to="/flowers"
          className="inline-block mb-8 text-green-700 font-semibold hover:text-pink-500"
        >
          ← Back to Flowers
        </Link>

        {/* Details Card */}
        <div
          className={
            theme === "dark"
              ? "bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
              : "bg-white rounded-3xl shadow-xl overflow-hidden"
          }
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="h-full">
              <img
                src={flower.image}
                alt={flower.name}
                className="w-full h-[400px] md:h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-8 md:p-12">
              {/* Type */}
              <p className="text-pink-500 font-semibold uppercase tracking-wide mb-3">
                {flower.type}
              </p>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
                {flower.name}
              </h1>

              {/* Price */}
              <p className="text-3xl font-bold text-pink-500 mb-6">
                ${flower.price}
              </p>

              {/* Description */}
              <p
                className={
                  theme === "dark"
                    ? "text-white leading-7 mb-8"
                    : "text-gray-600 leading-7 mb-8"
                }
              >
                {flower.description}
              </p>

              {/* Quantity */}
              <div className="mb-6">
                <label
                  className={
                    theme === "dark"
                      ? "block text-white font-semibold mb-2"
                      : "block text-gray-700 font-semibold mb-2"
                  }
                >
                  Quantity
                </label>

                <div className="flex items-center gap-4">
                  {/* Minus */}
                  <button
                    onClick={decrement}
                    className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200"
                  >
                    -
                  </button>

                  {/* Quantity */}
                  <span
                    className={
                      theme === "dark"
                        ? "font-semibold text-lg min-w-6 text-center text-white"
                        : "font-semibold text-lg min-w-6 text-center"
                    }
                  >
                    {quantity}
                  </span>

                  {/* Plus */}
                  <button
                    onClick={increment}
                    className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <p
                className={
                  theme === "dark"
                    ? "text-lg font-semibold text-white mb-5"
                    : "text-lg font-semibold text-gray-700 mb-5"
                }
              >
                Total{" "}
                <span className="text-green-600">
                  ${flower.price * quantity}
                </span>
              </p>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition"
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
