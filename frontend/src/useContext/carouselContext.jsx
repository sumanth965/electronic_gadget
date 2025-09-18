import React, { createContext } from "react";

// Create the context
export const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
    // Products array in context
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
        },
        {
            id: 6,
            name: "XXXXXXX",
            brand: "vvvvv",
            price: 1299,
            originalPrice: 1399,
            image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop&q=80",
            rating: 4.6,
            reviews: 4231,
            badge: "Limited Edition",
            features: ["200MP Camera", "S Pen Built-in", "AI-Powered"],
            category: "Smartphones",
            description: "The most advanced Galaxy smartphone with AI-powered features and professional-grade camera system."
        },
        {
            id: 7,
            name: "BBBBBB",
            brand: "SSSS",
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

    return (
        <CarouselContext.Provider value={{ products }}>
            {children}
        </CarouselContext.Provider>
    );
};
