import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}) {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
      />
    </div>
  );
}