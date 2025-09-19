import React from "react";
import DealCard from "../components/TopDeals/DealCard";


export default function TopDeals() {
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
            badge: "-40%",
            img: "https://via.placeholder.com/200x140?text=Headphones",
            title: "Sony WH-1000XM5",
            desc: "Premium noise-cancelling headphones.",
            price: "₹14,999",
            oldPrice: "₹24,999",
        },
        {
            id: 4,
            badge: "-50%",
            img: "https://via.placeholder.com/200x140?text=Power+Bank",
            title: "Mi Power Bank 20000mAh",
            desc: "Fast charging, slim design.",
            price: "₹999",
            oldPrice: "₹1,999",
        },
    ];


    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#0f1724] to-[#071023] text-[#e6eef6] p-6 flex justify-center">
            <div className="w-full max-w-[1200px]">
                {/* Header */}
                <header className="flex items-center justify-between p-4 rounded-xl bg-white/5 shadow-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center font-bold text-black">
                            EG
                        </div>
                        <h1 className="text-xl font-semibold">Top Deals</h1>
                    </div>
                    <nav>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-red-500 font-bold text-black shadow-md">
                            View All Products
                        </button>
                    </nav>
                </header>


                {/* Hero */}
                <section className="my-7 text-center">
                    <h2 className="text-3xl font-bold mb-2">🔥 Exclusive Top Gadget Deals</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Grab the hottest discounts on smartphones, laptops, audio gear, and
                        accessories. Limited stock, limited time!
                    </p>
                </section>


                {/* Deals Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
                    {deals.map((deal) => (
                        <DealCard key={deal.id} {...deal} />
                    ))}
                </section>


                {/* Footer */}
                <footer className="mt-8 text-center text-gray-400">
                    <p>
                        © {new Date().getFullYear()} E-Gadgets • Exclusive Deals • Terms &
                        Privacy
                    </p>
                </footer>
            </div>
        </div>
    );
}