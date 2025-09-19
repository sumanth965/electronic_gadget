import React, { useState, useEffect } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import CategoryCard from "../components/CategoryCard/CategoryCard";

const categoriesData = [
  {
    id: 1,
    name: "Smartphones",
    description: "Latest Android & iOS smartphones with cutting-edge features and premium design.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop",
    price: "From $299",
    rating: 4.8,
    products: 156,
    trending: true,
  },
  {
    id: 2,
    name: "Laptops",
    description: "High-performance laptops engineered for professionals and gaming enthusiasts.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop",
    price: "From $799",
    rating: 4.7,
    products: 89,
    trending: false,
  },
  {
    id: 3,
    name: "Headphones",
    description: "Premium wireless & noise-cancelling headphones for audiophiles.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop",
    price: "From $149",
    rating: 4.9,
    products: 67,
    trending: true,
  },
  {
    id: 4,
    name: "Smartwatches",
    description: "Advanced fitness tracking and seamless connectivity on your wrist.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop",
    price: "From $249",
    rating: 4.6,
    products: 43,
    trending: false,
  },
  {
    id: 5,
    name: "Gaming Consoles",
    description: "Next-generation gaming consoles and premium accessories.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop",
    price: "From $399",
    rating: 4.8,
    products: 32,
    trending: true,
  },
  {
    id: 6,
    name: "Cameras",
    description: "Professional DSLR, mirrorless & action cameras for creators.",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop",
    price: "From $599",
    rating: 4.7,
    products: 78,
    trending: false,
  },
];

export default function Categories() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("trending");
  const [viewMode, setViewMode] = useState("grid");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filtering + Sorting
  const filteredCategories = categoriesData
    .filter((cat) => 
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "trending":
          return b.trending - a.trending || b.rating - a.rating;
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
        case "price-high":
          return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-900/30 to-black" />
        <div className="relative py-32 text-center px-6">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight">
            Explore Categories
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover premium gadgets and cutting-edge technology curated for innovators and enthusiasts
          </p>
        </div>
      </div>

      {/* Search + Controls */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 transition-all duration-300"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-8 py-3 text-white focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer"
              >
                <option value="trending">Trending</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="az">Name: A-Z</option>
                <option value="za">Name: Z-A</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid" ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "list" ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredCategories.length}</span> categories
            {search && (
              <span> for "<span className="text-purple-400">{search}</span>"</span>
            )}
          </p>
        </div>

        {/* Category Cards */}
        <div className={`grid gap-8 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`}>
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}
