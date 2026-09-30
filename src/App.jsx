import { Routes, Route } from "react-router-dom";
import useThemeStore from "./store/themeStore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Home from "./pages/Home";
import Flower from "./pages/Flowers";
import FlowerDetails from "./pages/FlowerDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./pages/admin/adminlogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFlowers from "./pages/admin/AdminFlowers";
import AddFlower from "./pages/admin/AddFlower";
import EditFlower from "./pages/admin/EditFlower";
import DeleteFlower from "./pages/admin/DeleteFlower";
import AdminOrders from "./pages/admin/AdminOrders";
function App() {
  // Get theme from Context
  // const { theme } = useContext(ThemeContext);
  // Get theme from Zustand
  const theme = useThemeStore((state) => state.theme);
  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-white text-gray-900 min-h-screen"
      }
    >
      {/* Pages */}
      <Routes>
        {/* ==================== USER WEBSITE ==================== */}{" "}
        <Route
          path="/login"
          element={
            <>
              {" "}
              <Header /> <Login /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/register"
          element={
            <>
              {" "}
              <Header /> <Register /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/"
          element={
            <>
              {" "}
              <Header /> <Home /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/flowers"
          element={
            <>
              {" "}
              <Header /> <Flower /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/flowers/:id"
          element={
            <>
              {" "}
              <Header /> <FlowerDetails /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/cart"
          element={
            <>
              {" "}
              <Header /> <Cart /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/checkout"
          element={
            <>
              {" "}
              <Header /> <Checkout /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/about"
          element={
            <>
              {" "}
              <Header /> <About /> <Footer />{" "}
            </>
          }
        />{" "}
        <Route
          path="/contact"
          element={
            <>
              {" "}
              <Header /> <Contact /> <Footer />{" "}
            </>
          }
        />
        {/* ================= ADMIN LOGIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

        {/* ==================== ADMIN PANEL ==================== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="flowers" element={<AdminFlowers />} />
          <Route path="flowers/add" element={<AddFlower />} />
          <Route path="flowers/edit/:id" element={<EditFlower />} />
          <Route path="flowers/delete/:id" element={<DeleteFlower />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
