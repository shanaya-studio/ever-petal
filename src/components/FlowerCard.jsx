import { Link } from "react-router-dom";
import useThemeStore from "../store/themeStore";

// import Button from "./Button";

function FlowerCard({
  id,
  name,
  price,
  image,
  type,
  // onAddToCart,
}) {
   // Get theme
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-800 text-white shadow-md rounded-lg p-6 w-72"
          : "bg-white text-gray-900 shadow-md rounded-lg p-6 w-72"
      }
    >

      {/* Flower Image */}
      <Link to={`/flowers/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Flower Name */}
      <Link to={`/flowers/${id}`}>
        <h2 className="text-xl font-bold mt-4 hover:text-pink-500 cursor-pointer">
          {name}
        </h2>
      </Link>

      {/* Flower Type */}
      <p
        className={
          theme === "dark"
            ? "text-white mt-1"
            : "text-gray-600 mt-1"
        }
      >
        {type}
      </p>

      {/* Price */}
      <p className="text-green-600 font-semibold text-lg mt-2">
        ${price}
      </p>

      {/* Add to Cart */}
      {/* <div className="mt-4">
        <Button
          text="Add to Cart"
          variant="success"
          disabled={false}
          onClick={onAddToCart}
        />
      </div> */}

    </div>
  );
}

export default FlowerCard;