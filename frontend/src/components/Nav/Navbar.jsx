import React, { useState } from "react";
import { ShoppingCart, Heart, User, Menu, X, Search } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center font-bold text-black">
                            EG
                        </div>
                        <span className="font-bold text-xl tracking-wide">E-Gadgets</span>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex space-x-6">
                        <a href="/" className="hover:text-amber-400 transition">Home</a>
                        <a href="/deals" className="hover:text-amber-400 transition">Top Deals</a>
                        <a href="/categories" className="hover:text-amber-400 transition">Categories</a>
                        <a href="/contact" className="hover:text-amber-400 transition">Contact</a>
                    </div>

                    {/* Search + Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search gadgets..."
                                className="w-48 px-3 py-1 rounded-lg bg-slate-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <Search className="absolute right-2 top-1.5 text-gray-400" size={18} />
                        </div>

                        {/* Favorites */}
                        <button className="relative p-2 rounded-full hover:bg-slate-700 transition">
                            <Heart size={20} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold px-1.5 rounded-full">
                                3
                            </span>
                        </button>

                        {/* Cart */}
                        <button className="relative p-2 rounded-full hover:bg-slate-700 transition">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-xs font-bold px-1.5 rounded-full">
                                2
                            </span>
                        </button>

                        {/* User */}
                        <button className="p-2 rounded-full hover:bg-slate-700 transition">
                            <User size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-slate-700 transition"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-800 px-4 py-3 space-y-2">
                    <a href="/" className="block hover:text-amber-400">Home</a>
                    <a href="/deals" className="block hover:text-amber-400">Top Deals</a>
                    <a href="/categories" className="block hover:text-amber-400">Categories</a>
                    <a href="/contact" className="block hover:text-amber-400">Contact</a>

                    {/* Mobile Search */}
                    <div className="relative mt-3">
                        <input
                            type="text"
                            placeholder="Search gadgets..."
                            className="w-full px-3 py-2 rounded-lg bg-slate-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex gap-4 mt-3">
                        <button className="flex-1 px-4 py-2 rounded-lg bg-amber-500 text-black font-bold">
                            Login
                        </button>
                        <button className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-bold">
                            Sign Up
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
