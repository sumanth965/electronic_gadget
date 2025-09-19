import React, { useState, useRef } from "react";
import {
    ShoppingCart,
    Heart,
    Star,
    Zap,
    Share2,
    ArrowRight,
    Check,
    Plus,
    Minus,
    Pause,
    Play,
} from "lucide-react";

const ProductSlide = ({
    product,
    favorites,
    toggleFavorite,
    onAddToCart,
    onViewDetails,
    isAutoPlay,
    setIsAutoPlay,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const imageRef = useRef(null);

    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
    const isFavorite = favorites.has(product.id);

    // Handle add to cart with loading state
    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call
        onAddToCart && onAddToCart(product, quantity);
        setIsAddingToCart(false);
    };

    // Generate star rating with half stars
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400 transition-colors"
                    />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star size={16} className="text-slate-600" />
                        <Star
                            size={16}
                            className="absolute inset-0 text-yellow-400 fill-yellow-400 transition-colors"
                            style={{ clipPath: "inset(0 50% 0 0)" }}
                        />
                    </div>
                );
            } else {
                stars.push(
                    <Star
                        key={i}
                        size={16}
                        className="text-slate-600 transition-colors"
                    />
                );
            }
        }
        return stars;
    };

    return (
        <div className="w-full flex-shrink-0 group">
            <div className="flex flex-col xl:flex-row min-h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                {/* Image Section */}
                <div
                    className="xl:w-1/2 relative overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {!isImageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse" />
                    )}

                    <img
                        ref={imageRef}
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"
                            } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setIsImageLoaded(true)}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">

                        {/* Pause/Play */}
                        <button
                            onClick={() => setIsAutoPlay(!isAutoPlay)}
                            className="p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-all duration-300 transform hover:scale-110"
                            aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
                        >
                            {isAutoPlay ? (
                                <Pause size={20} className="text-white" />
                            ) : (
                                <Play size={20} className="text-white" />
                            )}
                        </button>
                        {/* Favorite */}
                        <button
                            onClick={() => toggleFavorite(product.id)}
                            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${isFavorite
                                ? "bg-red-500/20 border border-red-500/50"
                                : "bg-black/40 hover:bg-black/60"
                                }`}
                        >
                            <Heart
                                size={20}
                                className={`transition-colors ${isFavorite
                                    ? "text-red-500 fill-red-500"
                                    : "text-white hover:text-red-300"
                                    }`}
                            />
                        </button>

                        {/* Share */}
                        <button className="p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-all duration-300 transform hover:scale-110">
                            <Share2 size={20} className="text-white" />
                        </button>


                    </div>

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <div className="absolute top-4 left-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                -{discount}% OFF
                            </div>
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="xl:w-1/2 p-6 sm:p-8 flex flex-col justify-center space-y-4">
                    {/* Brand & Availability */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                            {product.brand}
                        </p>
                        <span className="flex items-center gap-1 text-green-400 text-xs">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            In Stock
                        </span>
                    </div>

                    {/* Product Name */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        {product.name}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">{renderStars()}</div>
                        <span className="text-white font-medium">{product.rating}</span>
                        <span className="text-slate-400 text-sm">
                            ({product.reviews || 0} reviews)
                        </span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features?.slice(0, 4).map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center text-slate-300 text-sm group/feature"
                            >
                                <Zap
                                    size={14}
                                    className="text-blue-400 mr-2 group-hover/feature:text-blue-300 transition-colors"
                                />
                                <span className="group-hover/feature:text-white transition-colors">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4 py-2">
                        <span className="text-3xl sm:text-4xl font-bold text-white">
                            ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                            <>
                                <span className="line-through text-slate-400 text-lg">
                                    ${product.originalPrice}
                                </span>
                                <span className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
                                    Save ${(product.originalPrice - product.price).toFixed(2)}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                        <span className="text-slate-300 text-sm">Quantity:</span>
                        <div className="flex items-center bg-slate-700/50 rounded-lg p-1">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-2 hover:bg-slate-600 rounded transition-colors"
                                disabled={quantity <= 1}
                            >
                                <Minus size={16} className="text-white" />
                            </button>
                            <span className="px-4 py-2 text-white font-medium min-w-[3rem] text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 hover:bg-slate-600 rounded transition-colors"
                            >
                                <Plus size={16} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            className="flex-1 bg-gradient-to-r from-amber-600 to-red-500 hover:from-amber-500 hover:to-red-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group/cart"
                        >
                            {isAddingToCart ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <ShoppingCart
                                        size={18}
                                        className="group-hover/cart:scale-110 transition-transform"
                                    />
                                    Add to Cart
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => onViewDetails && onViewDetails(product)}
                            className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 group/details"
                        >
                            View Details
                            <ArrowRight
                                size={16}
                                className="group-hover/details:translate-x-1 transition-transform"
                            />
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                            <Check size={14} className="text-green-400" />
                            Free Shipping
                        </div>
                        <div className="flex items-center gap-1">
                            <Check size={14} className="text-green-400" />
                            30-Day Returns
                        </div>
                        <div className="flex items-center gap-1">
                            <Check size={14} className="text-green-400" />
                            2-Year Warranty
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSlide;
