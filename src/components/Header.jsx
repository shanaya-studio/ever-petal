import { NavLink } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import useCartStore from "../store/cartStore";

function Header() {
  //old theme
  // const { theme, toggleTheme } = useContext(ThemeContext);
  //theme 
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  //cart
  const cartItems = useCartStore((state) => state.cartItems);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`w-full shadow-md ${
        theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-700">
          🌸 Ever <span className="text-pink-500">Petal</span>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-7 text-lg font-medium">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-pink-500" : "hover:text-pink-500"
                }
              >
                Home
              </NavLink>
            </li>

            {/* Flowers */}
            <li>
              <NavLink
                to="/Flowers"
                className={({ isActive }) =>
                  isActive ? "text-pink-500" : "hover:text-pink-500"
                }
              >
                Flowers
              </NavLink>
            </li>

            {/* About */}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-pink-500" : "hover:text-pink-500"
                }
              >
                About Us
              </NavLink>
            </li>

            {/* Contact */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-pink-500" : "hover:text-pink-500"
                }
              >
                Contact
              </NavLink>
            </li>

            {/* Sign In */}
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `border border-pink-500 px-4 py-2 rounded-full ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "text-pink-500 hover:bg-pink-500 hover:text-white"
                  }`
                }
              >
                Sign In
              </NavLink>
            </li>

            {/* Theme Toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className="px-3 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>

            {/* Cart */}
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative inline-flex items-center px-4 py-2 rounded-full ${
                    isActive
                      ? "bg-pink-600 text-white"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`
                }
              >
                <span className="text-lg">🛒</span>

                <span className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center bg-green-500 text-white text-xs font-bold rounded-full px-1">
                  {cartCount}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        <details className="md:hidden relative">
          <summary className="cursor-pointer text-2xl list-none">☰</summary>

          <nav
            className={`absolute right-0 top-12 w-56 shadow-lg rounded-lg p-5 ${
              theme === "light"
                ? "bg-white text-gray-800"
                : "bg-gray-800 text-white"
            }`}
          >
            <ul className="flex flex-col gap-4 text-lg font-medium">
              {/* Home */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-pink-500" : "hover:text-pink-500"
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* Flowers */}
              <li>
                <NavLink
                  to="/flowers"
                  className={({ isActive }) =>
                    isActive ? "text-pink-500" : "hover:text-pink-500"
                  }
                >
                  Flowers
                </NavLink>
              </li>

              {/* About */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-pink-500" : "hover:text-pink-500"
                  }
                >
                  About Us
                </NavLink>
              </li>

              {/* Contact */}
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-pink-500" : "hover:text-pink-500"
                  }
                >
                  Contact
                </NavLink>
              </li>

              {/* Sign In */}
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block border border-pink-500 px-4 py-2 rounded-full text-center ${
                      isActive ? "bg-pink-500 text-white" : "text-pink-500"
                    }`
                  }
                >
                  Sign In
                </NavLink>
              </li>

              {/* Theme Toggle */}
              <li>
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </li>

              {/* Cart */}
              <li className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-full text-center ${
                      isActive
                        ? "bg-pink-600 text-white"
                        : "bg-pink-500 text-white"
                    }`
                  }
                >
                  🛒
                  <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}

export default Header;
