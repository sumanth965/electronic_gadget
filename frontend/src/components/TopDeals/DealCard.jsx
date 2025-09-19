import React from "react";


export default function DealCard({ badge, img, title, desc, price, oldPrice }) {
  return (
    <article className="relative bg-white/5 p-4 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
      <div className="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-md text-xs font-bold">
        {badge}
      </div>
      <div className="h-44 flex items-center justify-center bg-white/5 rounded-lg">
        <img src={img} alt={title} className="max-h-40 object-contain" />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm mb-3">{desc}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-amber-500">{price}</span>
          <span className="line-through text-gray-500 text-sm">{oldPrice}</span>
        </div>
        <button className="mt-3 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-red-500 font-bold text-black shadow-md">
          Buy Now
        </button>
      </div>
    </article>
  );
}