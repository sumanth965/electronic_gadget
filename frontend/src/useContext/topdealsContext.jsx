import React, { createContext } from "react";

// Create the context
export const TopdealsContext = createContext();

// Context Provider
export const TopdealsProvider = ({ children }) => {
  // Deals array in context
  const deals = [
    {
      id: 1,
      badge: "-40%",
      img: "https://via.placeholder.com/200x140?text=Headphones",
      title: "Sony WH-1000XM5",
      desc: "Premium noise-cancelling headphones.",
      price: "₹14,999",
      oldPrice: "₹24,999",
    },
    {
      id: 2,
      badge: "-50%",
      img: "https://via.placeholder.com/200x140?text=Power+Bank",
      title: "Mi Power Bank 20000mAh",
      desc: "Fast charging, slim design.",
      price: "₹999",
      oldPrice: "₹1,999",
    },
    {
      id: 3,
      badge: "-30%",
      img: "https://via.placeholder.com/200x140?text=Smartwatch",
      title: "Apple Watch SE",
      desc: "Track fitness & stay connected.",
      price: "₹19,999",
      oldPrice: "₹28,999",
    },
    {
      id: 4,
      badge: "-25%",
      img: "https://via.placeholder.com/200x140?text=Laptop",
      title: "Dell Inspiron 15",
      desc: "Powerful laptop for work & play.",
      price: "₹42,999",
      oldPrice: "₹56,999",
    },
  ];

  return (
    <TopdealsContext.Provider value={{ deals }}>
      {children}
    </TopdealsContext.Provider>
  );
};
