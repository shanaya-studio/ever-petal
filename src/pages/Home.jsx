import Flower from "./Flowers";
import About from "./About";
import Contact from "./Contact";
export default function Home({ onAddToCart }) {
  return (
    <main>
      {" "}
      {/* ================= HERO / HOME SECTION ================= */}{" "}
      <section
        id="home"
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {" "}
        {/* Dark Overlay */}{" "}
        <div className="absolute inset-0 bg-black/35"></div>{" "}
        {/* Main Content */}{" "}
        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          {" "}
          {/* Left Side */}{" "}
          <div className="text-white text-center md:text-left">
            {" "}
            <p className="text-green-400 uppercase tracking-[4px] text-sm font-semibold mb-4">
              {" "}
              Welcome to Ever Petal{" "}
            </p>{" "}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              {" "}
              Where Every <br /> <span className="text-green-400">
                Petal
              </span>{" "}
              Tells a Story 🌸{" "}
            </h1>{" "}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-xl">
              {" "}
              Discover the beauty of nature with our collection of beautiful
              flowers, floral arrangements, and timeless creations.{" "}
            </p>{" "}
            {/* Buttons */}{" "}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {" "}
              {/* Scroll to Flowers */}{" "}
              <a
                href="#flowers"
                className="bg-green-500 text-white px-7 py-3 rounded-full font-semibold hover:bg-green-600 hover:scale-105 transition duration-300 shadow-lg"
              >
                {" "}
                Explore Flowers{" "}
              </a>{" "}
              {/* Scroll to About */}{" "}
              <a
                href="#about"
                className="border border-white text-white px-7 py-3 rounded-full hover:bg-white hover:text-black transition duration-300"
              >
                {" "}
                Learn More{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
          {/* Right Side */}{" "}
          <div className="flex justify-center items-center">
            {" "}
            <div className="text-center text-white">
              {" "}
              <div className="text-7xl mb-5"> 🌷 </div>{" "}
              <h2 className="text-3xl md:text-5xl font-semibold">
                {" "}
                Beautifully <br />{" "}
                <span className="text-green-400">Natural</span>{" "}
              </h2>{" "}
              <p className="text-gray-200 mt-4">
                {" "}
                Fresh • Elegant • Timeless{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ================= FLOWERS SECTION ================= */}{" "}
      <section id="flowers">
        {" "}
        <Flower onAddToCart={onAddToCart} />{" "}
      </section>{" "}
      {/* ================= ABOUT SECTION ================= */}{" "}
      <section id="about">
        {" "}
        <About />{" "}
      </section>{" "}
      {/* ================= CONTACT SECTION ================= */}{" "}
      <section id="contact">
        {" "}
        <Contact />{" "}
      </section>{" "}
    </main>
  );
}
