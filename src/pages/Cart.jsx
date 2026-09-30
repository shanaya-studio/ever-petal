import { Link } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import useCartStore from "../store/cartStore";

export default function Cart() {
  const theme = useThemeStore((state) => state.theme);
  const cartItems = useCartStore((state) => state.cartItems);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeItem = useCartStore((state) => state.removeItem);
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Delivery charges
  const delivery = cartItems.length > 0 ? 5 : 0;

  // Calculate total
  const total = subtotal + delivery;

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-gray-900 text-white py-12 px-6"
          : "min-h-screen bg-pink-50 py-12 px-6"
      }
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            Your <span className="text-pink-500">Cart</span> 🛒
          </h1>

          <p
            className={
              theme === "dark" ? "text-white mt-3" : "text-gray-600 mt-3"
            }
          >
            Review your beautiful flowers before checkout.
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div
            className={
              theme === "dark"
                ? "bg-gray-800 text-white rounded-2xl shadow-md p-10 text-center"
                : "bg-white rounded-2xl shadow-md p-10 text-center"
            }
          >
            <div className="text-6xl mb-4">🛒</div>

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Your Cart is Empty
            </h2>

            <p
              className={
                theme === "dark" ? "text-white mb-6" : "text-gray-500 mb-6"
              }
            >
              Add some beautiful flowers to your cart.
            </p>

            <Link
              to="/flowers"
              className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
            >
              Explore Flowers 🌸
            </Link>
          </div>
        ) : (
          /* Cart */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={
                    theme === "dark"
                      ? "bg-gray-800 text-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row items-center gap-5"
                      : "bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row items-center gap-5"
                  }
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  {/* Product Information */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-xl font-bold text-green-700">
                      {item.name}
                    </h2>

                    <p
                      className={
                        theme === "dark"
                          ? "text-white mt-1"
                          : "text-gray-500 mt-1"
                      }
                    >
                      ${item.price} each
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                      {/* Minus */}
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition"
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
                        {item.quantity}
                      </span>

                      {/* Plus */}
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center sm:text-right">
                    <p className="text-xl font-bold text-pink-500">
                      ${item.price * item.quantity}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-500 mt-2 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div
              className={
                theme === "dark"
                  ? "bg-gray-800 text-white rounded-2xl shadow-md p-6 h-fit"
                  : "bg-white rounded-2xl shadow-md p-6 h-fit"
              }
            >
              <h2 className="text-2xl font-bold text-green-700 mb-6">
                Order Summary
              </h2>

              {/* Subtotal */}
              <div
                className={
                  theme === "dark"
                    ? "flex justify-between text-white mb-4"
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
                    ? "flex justify-between text-white mb-4"
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
                    ? "border-t border-gray-600 pt-4 mb-6"
                    : "border-t border-gray-200 pt-4 mb-6"
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

              {/* Checkout */}
              <Link
                to="/checkout"
                className="block text-center w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300"
              >
                Proceed to Checkout 💐
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/flowers"
                className="block text-center mt-4 text-green-700 font-medium hover:text-pink-500"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
