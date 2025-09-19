import React, { useState } from "react";
import { Star, ArrowRight, ShoppingCart } from "lucide-react";

export default function CategoryCard({ name, description, image, price, rating, products, trending }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 hover:bg-gray-900/70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Trending Badge */}
      {trending && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          Trending
        </div>
      )}

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
            <ShoppingCart size={18} />
            Quick View
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
          <Star size={14} fill="#fbbf24" className="text-yellow-400" />
          {rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            {name}
          </h3>
          <span className="text-purple-400 font-semibold">{price}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{products} products</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>In Stock</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 group/btn">
          Explore Category
          <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
    </div>
  );
}
