import React, { useState, useEffect, useRef, useContext } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { CarouselContext } from "../useContext/carouselContext";
import ProductSlide from "../components/Carousel/ProductSlide";

const ElectronicsCarousel = () => {
  const { products } = useContext(CarouselContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);

  // Auto-play
  useEffect(() => {
    if (isAutoPlay && products.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay, products.length]);

  // Swipe handlers
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Navigation
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  const goToSlide = (index) => setCurrentIndex(index);

  // Favorites
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFav = new Set(prev);
      newFav.has(id) ? newFav.delete(id) : newFav.add(id);
      return newFav;
    });
  };

  return (
    <div className="relative w-full max-w-8xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden shadow-2xl ">
      {/* Controls Header */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="p-2 bg-slate-700/80 rounded-full text-white hover:bg-slate-600 transition"
          aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      {/* Carousel */}
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
            <ProductSlide
              key={product.id}
              product={product}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        {products.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {products.length > 1 && (
        <div className="flex justify-center gap-2 p-4">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 h-3 bg-blue-600"
                  : "w-3 h-3 bg-gray-500 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectronicsCarousel;
