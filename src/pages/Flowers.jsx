import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FlowerCard from "../components/FlowerCard";
import SearchBar from "../components/SearchBar";
import { getFlowers } from "../api/flowerApi";
import useThemeStore from "../store/themeStore";
import { SlidersHorizontal } from "lucide-react";

export default function Flower() {
  // TanStack Query
  const {
    data: flowers = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["flowers"],

    queryFn: async () => {
      const response = await getFlowers();
      return response.data;
    },
  });

  // React Router Hook
  const [searchParams, setSearchParams] = useSearchParams();

  // Get theme
  const theme = useThemeStore((state) => state.theme);

  // URL parameters
  const searchTerm = searchParams.get("search") || "";
  const filterType = searchParams.get("type") || "All";
  const maxPrice = searchParams.get("maxPrice") || "All";

  // Search
  function handleSearch(value) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }

  // Type filter
  function handleTypeChange(value) {
    const params = new URLSearchParams(searchParams);

    if (value === "All") {
      params.delete("type");
    } else {
      params.set("type", value);
    }

    setSearchParams(params);
  }

  // Price filter
  function handlePriceChange(value) {
    const params = new URLSearchParams(searchParams);

    if (value === "All") {
      params.delete("maxPrice");
    } else {
      params.set("maxPrice", value);
    }

    setSearchParams(params);
  }

  // Loading
  if (isPending) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading flowers... 🌸</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Error loading flowers ❌
        </h2>
      </div>
    );
  }

  // Filtering
  const filteredFlowers = flowers.filter((flower) => {
    const searchMatch = flower.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const filterMatch = filterType === "All" || flower.type === filterType;

    const priceMatch = maxPrice === "All" || flower.price <= Number(maxPrice);

    return searchMatch && filterMatch && priceMatch;
  });

  return (
    <div>
      <div
        className={
          theme === "dark"
            ? "min-h-screen bg-gray-900 text-white py-16 px-6"
            : "min-h-screen bg-pink-50 text-gray-900 py-16 px-6"
        }
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            Flowers
            <span className="text-pink-500"> Collection</span>
          </h1>
        </div>

        {/* Search + Filters */}
        <div className="w-full max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            {/* Search */}
            <div className="w-full md:flex-1">
              <SearchBar
                placeholder="Search flowers..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Filter Icon */}
              <div
                className={
                  theme === "dark"
                    ? "w-12 h-12 shrink-0 flex items-center justify-center border border-gray-600 rounded-full shadow-sm bg-gray-700 text-white"
                    : "w-12 h-12 shrink-0 flex items-center justify-center border border-gray-300 rounded-full shadow-sm bg-white text-gray-900"
                }
              >
                <SlidersHorizontal size={20} />
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className={
                  theme === "dark"
                    ? "flex-1 md:w-48 md:flex-none min-w-0 px-4 py-3 border border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
                    : "flex-1 md:w-48 md:flex-none min-w-0 px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                }
              >
                <option value="All">All Types</option>
                <option value="Spring Flower">Spring Flower</option>
                <option value="Summer Flower">Summer Flower</option>
                <option value="Elegant Flower">Elegant Flower</option>
                <option value="Aromatic Flower">Aromatic Flower</option>
                <option value="Luxury Flower">Luxury Flower</option>
                <option value="Romantic Flower">Romantic Flower</option>
                <option value="Cheerful Flower">Cheerful Flower</option>
                <option value="Garden Flower">Garden Flower</option>
                <option value="Festival Flower">Festival Flower</option>
                <option value="Wild Flower">Wild Flower</option>
                <option value="Classic Flower">Classic Flower</option>
                <option value="Exotic Flower">Exotic Flower</option>
                <option value="Spring Blossom">Spring Blossom</option>
                <option value="Tropical Flower">Tropical Flower</option>
                <option value="Bright Flower">Bright Flower</option>
                <option value="Fragrant Flower">Fragrant Flower</option>
              </select>

              {/* Price Filter */}
              <select
                value={maxPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                className={
                  theme === "dark"
                    ? "flex-1 md:w-48 md:flex-none min-w-0 px-4 py-3 border border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
                    : "flex-1 md:w-48 md:flex-none min-w-0 px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                }
              >
                <option value="All">All Prices</option>
                <option value="10">$10 or less</option>
                <option value="15">$15 or less</option>
                <option value="20">$20 or less</option>
                <option value="25">$25 or less</option>
                <option value="30">$30 or less</option>
              </select>
            </div>
          </div>
        </div>
        <br />

        {/* Flowers */}
        <div className="flex flex-wrap justify-center gap-8">
          {filteredFlowers.map((flower) => (
            <FlowerCard
              key={flower.id}
              id={flower.id}
              name={flower.name}
              price={flower.price}
              type={flower.type}
              image={flower.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
