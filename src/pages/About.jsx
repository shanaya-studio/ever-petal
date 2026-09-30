import useThemeStore from "../store/themeStore";
import { useNavigate } from "react-router-dom";

function About() {
  const theme = useThemeStore((state) => state.theme);
  const navigate = useNavigate();

  return (
    <section
      className={
        theme === "dark"
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-pink-50 text-gray-900"
      }
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <br /><br />
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            About <span className="text-pink-500">Ever Petal</span>
          </h1>

          <p
            className={
              theme === "dark"
                ? "mt-4 text-white text-lg max-w-2xl mx-auto"
                : "mt-4 text-gray-600 text-lg max-w-2xl mx-auto"
            }
          >
            Bringing beauty, freshness, and happiness to every special moment
            with beautiful flowers.
          </p>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1660549071381-d1e8e9b5cc42?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Beautiful flowers"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Who We Are
            </h2>

            <p
              className={
                theme === "dark"
                  ? "text-white leading-7 mb-4"
                  : "text-gray-600 leading-7 mb-4"
              }
            >
              Ever Petal is a flower shop created for people who love flowers
              and want to make their special moments more beautiful. We offer a
              variety of fresh and beautiful flowers for different occasions.
            </p>

            <p
              className={
                theme === "dark"
                  ? "text-white leading-7 mb-6"
                  : "text-gray-600 leading-7 mb-6"
              }
            >
              Whether you want to surprise someone, celebrate a birthday,
              decorate your home, or simply brighten someone's day, Ever Petal
              is here to help you choose the perfect flowers.
            </p>

            {/* Explore Flowers Button */}
            <button
              onClick={() => navigate("/flowers")}
              className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
            >
              Explore Our Flowers
            </button>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
            Why Choose <span className="text-pink-500">Ever Petal?</span>
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              className={
                theme === "dark"
                  ? "bg-gray-800 p-6 rounded-2xl shadow-md text-center"
                  : "bg-white p-6 rounded-2xl shadow-md text-center"
              }
            >
              <div className="text-4xl mb-4">🌸</div>

              <h3 className="text-xl font-bold text-green-700 mb-2">
                Beautiful Flowers
              </h3>

              <p className={theme === "dark" ? "text-white" : "text-gray-600"}>
                Carefully selected flowers to make every occasion special.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className={
                theme === "dark"
                  ? "bg-gray-800 p-6 rounded-2xl shadow-md text-center"
                  : "bg-white p-6 rounded-2xl shadow-md text-center"
              }
            >
              <div className="text-4xl mb-4">💐</div>

              <h3 className="text-xl font-bold text-green-700 mb-2">
                Lovely Bouquets
              </h3>

              <p className={theme === "dark" ? "text-white" : "text-gray-600"}>
                Beautifully arranged bouquets made with love and creativity.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className={
                theme === "dark"
                  ? "bg-gray-800 p-6 rounded-2xl shadow-md text-center"
                  : "bg-white p-6 rounded-2xl shadow-md text-center"
              }
            >
              <div className="text-4xl mb-4">💖</div>

              <h3 className="text-xl font-bold text-green-700 mb-2">
                Made With Love
              </h3>

              <p className={theme === "dark" ? "text-white" : "text-gray-600"}>
                We believe every flower should carry a beautiful feeling.
              </p>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
