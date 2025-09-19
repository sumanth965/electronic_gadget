import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-black text-gray-300 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center font-bold text-black">
              EG
            </div>
            <h2 className="text-xl font-bold">E-Gadgets</h2>
          </div>
          <p className="text-sm text-gray-400">
            Your one-stop shop for the latest and greatest in electronic
            gadgets. Find exclusive deals and top tech at unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-amber-400">Home</a></li>
            <li><a href="/deals" className="hover:text-amber-400">Top Deals</a></li>
            <li><a href="/categories" className="hover:text-amber-400">Categories</a></li>
            <li><a href="/about" className="hover:text-amber-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-amber-400">Contact</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-amber-400">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-amber-400">Shipping Info</a></li>
            <li><a href="/returns" className="hover:text-amber-400">Returns & Refunds</a></li>
            <li><a href="/privacy" className="hover:text-amber-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-amber-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe to our newsletter for the latest deals and tech news.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg bg-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="px-4 py-2 bg-amber-500 text-black font-bold rounded-r-lg flex items-center gap-1 hover:bg-amber-400 transition">
              <Send size={16} /> Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 my-6" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} E-Gadgets. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-blue-500"><Facebook size={18} /></a>
          <a href="#" className="hover:text-sky-400"><Twitter size={18} /></a>
          <a href="#" className="hover:text-pink-500"><Instagram size={18} /></a>
          <a href="#" className="hover:text-blue-700"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-red-600"><Youtube size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
