import React, { useState, useEffect, useRef } from 'react';
import CarouselHeader from '../components/Carousel/CarouselHeader';
import CarouselSlide from '../components/Carousel/CarouselSlide';
import CarouselDots from '../components/Carousel/CarouselDots';
import ProgressBar from '../components/Carousel/ProgressBar';
import CarouselArrows from '../components/Carousel/CarouselArrows';

const ElectronicsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const intervalRef = useRef(null);

  const products = [
    // Example products (replace with your actual data)
    { id: 1, name: 'Smartphone X1', price: '$799', image: '/images/phone1.jpg' },
    { id: 2, name: 'Laptop Pro 15', price: '$1299', image: '/images/laptop1.jpg' },
    { id: 3, name: 'Wireless Earbuds', price: '$199', image: '/images/earbuds.jpg' },
    { id: 4, name: 'Smartwatch Z', price: '$249', image: '/images/watch1.jpg' },
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

  // Navigation
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const goToSlide = (index) => setCurrentIndex(index);

  // Toggle favorites
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      newFavs.has(id) ? newFavs.delete(id) : newFavs.add(id);
      return newFavs;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4">
      <div className="relative w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <CarouselHeader
          isAutoPlay={isAutoPlay}
          setIsAutoPlay={setIsAutoPlay}
          currentIndex={currentIndex}
          total={products.length}
        />

        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, index) => (
            <CarouselSlide
              key={product.id}
              product={product}
              isActive={index === currentIndex}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ))}
        </div>

        {/* Arrows */}
        <CarouselArrows prevSlide={prevSlide} nextSlide={nextSlide} />

        {/* Dots */}
        <CarouselDots
          currentIndex={currentIndex}
          total={products.length}
          goToSlide={goToSlide}
        />

        {/* Progress Bar */}
        <ProgressBar currentIndex={currentIndex} total={products.length} />
      </div>
    </div>
  );
};

export default ElectronicsCarousel;
