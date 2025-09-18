import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Zap, Play, Pause } from 'lucide-react';

const ElectronicsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 2847,
      badge: "New Arrival",
      features: ["A17 Pro Chip", "48MP Camera", "Titanium Design"],
      category: "Smartphones"
    },
    {
      id: 2,
      name: "MacBook Pro 16\"",
      brand: "Apple",
      price: 2399,
      originalPrice: 2599,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 1923,
      badge: "Best Seller",
      features: ["M3 Max Chip", "18-Hour Battery", "Liquid Retina XDR"],
      category: "Laptops"
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      brand: "Sony",
      price: 349,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 5642,
      badge: "Editor's Choice",
      features: ["Industry-Leading Noise Canceling", "30-Hour Battery", "Hi-Res Audio"],
      category: "Audio"
    },
    {
      id: 4,
      name: "iPad Pro 12.9\"",
      brand: "Apple",
      price: 1099,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 3156,
      badge: "Hot Deal",
      features: ["M2 Chip", "Liquid Retina XDR", "Apple Pencil Support"],
      category: "Tablets"
    },
    {
      id: 5,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 1299,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop",
      rating: 4.6,
      reviews: 4231,
      badge: "Limited Edition",
      features: ["200MP Camera", "S Pen Built-in", "AI-Powered"],
      category: "Smartphones"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay, products.length]);

  // Touch handlers
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  const goToSlide = (index) => setCurrentIndex(index);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      newFavs.has(productId) ? newFavs.delete(productId) : newFavs.add(productId);
      return newFavs;
    });
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'New Arrival': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'Best Seller': 'bg-gradient-to-r from-orange-500 to-red-500',
      'Editor\'s Choice': 'bg-gradient-to-r from-purple-500 to-indigo-500',
      'Hot Deal': 'bg-gradient-to-r from-pink-500 to-rose-500',
      'Limited Edition': 'bg-gradient-to-r from-blue-500 to-cyan-500'
    };
    return colors[badge] || 'bg-gradient-to-r from-gray-500 to-slate-500';
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_50%)]"></div>

      {/* Header */}
      <div className="relative flex justify-between items-center p-6 border-b border-slate-700/50">
        <h2 className="text-2xl font-bold text-white">Featured Electronics</h2>
        <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm font-medium">
          {currentIndex + 1} of {products.length}
        </span>
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg"
        >
          {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
          {isAutoPlay ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Carousel */}
      <div
        className="relative h-[500px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0 flex">
              {/* Left - Image */}
              <div className="w-1/2 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className={`absolute top-6 left-6 px-3 py-1 ${getBadgeColor(product.badge)} text-white text-sm font-semibold rounded-full`}>
                  {product.badge}
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-6 right-6 p-3 bg-white/10 rounded-full"
                >
                  <Heart
                    size={20}
                    className={favorites.has(product.id) ? 'text-red-500 fill-red-500' : 'text-white'}
                  />
                </button>
              </div>

              {/* Right - Details */}
              <div className="w-1/2 p-8 flex flex-col justify-center">
                <p className="text-slate-400 text-sm">{product.brand}</p>
                <h3 className="text-3xl font-bold text-white">{product.name}</h3>
                <p className="text-slate-300 text-sm mb-4">{product.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
                    />
                  ))}
                  <span className="text-white">{product.rating}</span>
                  <span className="text-slate-400">({product.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Features */}
                <ul className="mb-6">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Zap size={14} className="text-blue-400" /> {f}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-white">${product.price}</span>
                  <span className="line-through text-slate-400">${product.originalPrice}</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">
                    Save ${product.originalPrice - product.price}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                  <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 p-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-600'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ElectronicsCarousel;
