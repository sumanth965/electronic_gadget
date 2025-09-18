import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Zap, Play, Pause, Menu, X } from 'lucide-react';

const ElectronicsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const intervalRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop&q=80",
      rating: 4.9,
      reviews: 2847,
      badge: "New Arrival",
      features: ["A17 Pro Chip", "48MP Camera", "Titanium Design"],
      category: "Smartphones",
      description: "The most advanced iPhone ever, featuring the powerful A17 Pro chip and revolutionary camera system."
    },
    {
      id: 2,
      name: "MacBook Pro 16\"",
      brand: "Apple",
      price: 2399,
      originalPrice: 2599,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&q=80",
      rating: 4.8,
      reviews: 1923,
      badge: "Best Seller",
      features: ["M3 Max Chip", "18-Hour Battery", "Liquid Retina XDR"],
      category: "Laptops",
      description: "Pro performance meets pro capability. Built for creators and professionals who demand the best."
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      brand: "Sony",
      price: 349,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&q=80",
      rating: 4.7,
      reviews: 5642,
      badge: "Editor's Choice",
      features: ["Industry-Leading Noise Canceling", "30-Hour Battery", "Hi-Res Audio"],
      category: "Audio",
      description: "Premium wireless headphones with industry-leading noise cancellation and exceptional sound quality."
    },
    {
      id: 4,
      name: "iPad Pro 12.9\"",
      brand: "Apple",
      price: 1099,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&q=80",
      rating: 4.8,
      reviews: 3156,
      badge: "Hot Deal",
      features: ["M2 Chip", "Liquid Retina XDR", "Apple Pencil Support"],
      category: "Tablets",
      description: "The ultimate iPad experience with the power of M2 and stunning Liquid Retina XDR display."
    },
    {
      id: 5,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 1299,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop&q=80",
      rating: 4.6,
      reviews: 4231,
      badge: "Limited Edition",
      features: ["200MP Camera", "S Pen Built-in", "AI-Powered"],
      category: "Smartphones",
      description: "The most advanced Galaxy smartphone with AI-powered features and professional-grade camera system."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay, products.length]);

  // Touch handlers with improved sensitivity
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(0);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      newFavs.has(productId) ? newFavs.delete(productId) : newFavs.add(productId);
      return newFavs;
    });
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600',
      'Best Seller': 'bg-gradient-to-r from-orange-500 to-amber-600',
      'Editor\'s Choice': 'bg-gradient-to-r from-purple-600 to-indigo-600',
      'Hot Deal': 'bg-gradient-to-r from-pink-600 to-rose-600',
      'Limited Edition': 'bg-gradient-to-r from-blue-600 to-cyan-600'
    };
    return colors[badge] || 'bg-gradient-to-r from-gray-600 to-slate-600';
  };

  const currentProduct = products[currentIndex];
  const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);

  return (
    <div className="relative w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.02)_50%,transparent_70%)] animate-pulse"></div>

      {/* Header */}
      <header className="relative flex justify-between items-center p-4 lg:p-6 border-b border-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Featured Electronics
            </h1>
            <p className="text-sm text-slate-400 mt-1">Premium tech at unbeatable prices</p>
          </div>
          <div className="md:hidden">
            <h1 className="text-lg font-bold text-white">Electronics</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <span className="px-3 py-1.5 bg-slate-800/60 text-slate-300 rounded-full text-sm font-medium border border-slate-700/50">
              {currentIndex + 1} of {products.length}
            </span>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 text-white rounded-lg transition-all duration-200 border border-slate-700/50 hover:border-slate-600/50"
            >
              {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              <span className="hidden lg:inline">{isAutoPlay ? 'Pause' : 'Play'}</span>
            </button>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white rounded-lg bg-slate-800/60"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 right-4 z-50 bg-slate-900/95 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 shadow-xl">
          <div className="flex flex-col gap-3">
            <span className="px-3 py-1.5 bg-slate-800/60 text-slate-300 rounded-full text-sm font-medium text-center">
              {currentIndex + 1} of {products.length}
            </span>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 text-white rounded-lg transition-all duration-200"
            >
              {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              {isAutoPlay ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              {/* Desktop Layout */}
              <div className="hidden lg:flex min-h-[600px]">
                {/* Left - Image */}
                <div className="w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  
                  <div className={`absolute top-6 left-6 z-20 px-4 py-2 ${getBadgeColor(product.badge)} text-white text-sm font-semibold rounded-full shadow-lg`}>
                    {product.badge}
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-6 right-6 z-20 p-3 bg-black/20 backdrop-blur-sm hover:bg-black/40 rounded-full transition-all duration-200 border border-white/20"
                  >
                    <Heart
                      size={20}
                      className={favorites.has(product.id) ? 'text-red-500 fill-red-500' : 'text-white'}
                    />
                  </button>

                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white rounded-lg border border-white/20">
                      <span className="text-sm font-medium">{product.category}</span>
                    </div>
                  </div>
                </div>

                {/* Right - Details */}
                <div className="w-1/2 p-8 xl:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                  <div className="space-y-6">
                    <div>
                      <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">{product.brand}</p>
                      <h2 className="text-3xl xl:text-4xl font-bold text-white mt-2 leading-tight">{product.name}</h2>
                      <p className="text-slate-300 mt-3 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
                          />
                        ))}
                      </div>
                      <span className="text-white font-semibold">{product.rating}</span>
                      <span className="text-slate-400">({product.reviews.toLocaleString()})</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300">
                          <Zap size={16} className="text-blue-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-4">
                        <span className="text-4xl font-bold text-white">${product.price.toLocaleString()}</span>
                        <span className="text-lg text-slate-400 line-through">${product.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30">
                        <span>{discount}% OFF</span>
                        <span>•</span>
                        <span>Save ${(product.originalPrice - product.price).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                        <ShoppingCart size={20} />
                        Add to Cart
                      </button>
                      <button className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold rounded-xl transition-all duration-200 border border-slate-700/50 hover:border-slate-600/50">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile & Tablet Layout */}
              <div className="lg:hidden">
                {/* Image */}
                <div className="relative h-64 sm:h-80 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                  
                  <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 ${getBadgeColor(product.badge)} text-white text-xs font-semibold rounded-full`}>
                    {product.badge}
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 z-20 p-2.5 bg-black/30 backdrop-blur-sm rounded-full"
                  >
                    <Heart
                      size={18}
                      className={favorites.has(product.id) ? 'text-red-500 fill-red-500' : 'text-white'}
                    />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs font-medium">{product.brand}</p>
                      <h2 className="text-white text-xl sm:text-2xl font-bold">{product.name}</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-white">${product.price.toLocaleString()}</div>
                      <div className="text-sm text-white/60 line-through">${product.originalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-slate-800/60 text-slate-300 text-sm rounded-full">{product.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
                            />
                          ))}
                        </div>
                        <span className="text-white text-sm font-medium">{product.rating}</span>
                        <span className="text-slate-400 text-sm">({product.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{product.description}</p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                        <Zap size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
                      {discount}% OFF • Save ${(product.originalPrice - product.price).toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button className="px-6 py-3.5 bg-slate-800/60 hover:bg-slate-700/60 text-white font-semibold rounded-xl transition-all duration-200 border border-slate-700/50">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 z-30"
        >
          <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 z-30"
        >
          <ChevronRight size={20} className="lg:w-6 lg:h-6" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 p-6 bg-gradient-to-t from-slate-900/50 to-transparent">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' 
                : 'w-3 h-3 bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ElectronicsCarousel;