import React from "react";
import { ShoppingCart, Heart, Truck, Shield, Award, Search, Grid, List, Star, Filter } from "lucide-react";

// ================= SAMPLE DATA =================
export const categoryProducts = {
    smartphones: [
        { id: 1, name: "iPhone 15", brand: "Apple", price: 99999, rating: 4.5, description: "Latest Apple iPhone", image: "/images/iphone15.jpg" },
        { id: 2, name: "Galaxy S24", brand: "Samsung", price: 89999, rating: 4.3, description: "Latest Samsung Galaxy", image: "/images/galaxy-s24.jpg" },
    ],
    laptops: [
        { id: 3, name: "MacBook Pro", brand: "Apple", price: 199999, rating: 4.7, description: "Apple Laptop", image: "/images/macbook-pro.jpg" },
    ],
};

// ================= HEADER =================
export const Header = ({ cartItemCount, wishlist, setShowCart }) => (
    <div className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold">EG</div>
                <div>
                    <h1 className="text-xl font-bold">E-Gadgets</h1>
                    <p className="text-xs text-gray-400">Premium Electronics</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={() => setShowCart(true)} className="relative p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <ShoppingCart size={20} />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-purple-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </button>
                <button className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <Heart size={20} className={wishlist.size > 0 ? "text-red-400" : ""} />
                </button>
            </div>
        </div>
    </div>
);

// ================= HERO SECTION =================
export const HeroSection = ({ category }) => (
    <div className="relative py-16 text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 capitalize bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {category?.replace("-", " ")}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                Discover premium {category} with cutting-edge technology and innovative design.
            </p>
            <div className="flex justify-center gap-8 mt-8">
                <div className="text-center">
                    <div className="flex items-center gap-1 text-green-400 mb-1">
                        <Truck size={16} />
                        <span className="text-sm">Fast Delivery</span>
                    </div>
                    <p className="text-xs text-gray-400">Free shipping on orders above ₹999</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center gap-1 text-blue-400 mb-1">
                        <Shield size={16} />
                        <span className="text-sm">Warranty</span>
                    </div>
                    <p className="text-xs text-gray-400">1-year manufacturer warranty</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center gap-1 text-purple-400 mb-1">
                        <Award size={16} />
                        <span className="text-sm">Authentic</span>
                    </div>
                    <p className="text-xs text-gray-400">100% genuine products</p>
                </div>
            </div>
        </div>
    </div>
);

// ================= SEARCH FILTERS =================
export const SearchFilters = ({ search, setSearch, selectedBrand, setSelectedBrand, priceRange, setPriceRange, sort, setSort, viewMode, setViewMode, brands, showFilters, setShowFilters, formatPrice }) => (
    <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 mb-8">
        {/* ... your search, filter, sort JSX ... */}
    </div>
);

// ================= PRODUCT LIST =================
export const ProductList = ({ products, viewMode, addToCart, toggleWishlist, wishlist, formatPrice }) => (
    <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {products.map(product => (
            <div key={product.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex flex-col">
                <div className="relative">
                    <img src={product.image} alt={product.name} className="rounded-xl w-full h-48 object-cover mb-4" />
                    <button onClick={() => toggleWishlist(product.id)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60 transition-colors">
                        <Heart size={20} className={wishlist.has(product.id) ? "text-red-400" : "text-gray-400"} />
                    </button>
                </div>
                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{product.description}</p>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 font-bold">{formatPrice(product.price)}</span>
                </div>
                <div className="flex gap-2 mt-auto">
                    <button onClick={() => addToCart(product)} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl transition-colors">Add to Cart</button>
                </div>
            </div>
        ))}
    </div>
);

// ================= PAGINATION =================
export const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex justify-center mt-8 gap-2">
            {pages.map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg ${page === currentPage ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700/50"}`}>{page}</button>
            ))}
        </div>
    );
};
