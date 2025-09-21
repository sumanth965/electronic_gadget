import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Product components
import { Header, HeroSection, SearchFilters, ProductList, Pagination, categoryProducts } from "../components/CategoryDetailsPage/ProductCard";

// Cart components
import { CartSidebar, Toast } from "../components/CategoryDetailsPage/CartSidebar";

export default function CategoryDetails() {
  const { id } = useParams();
  const products = categoryProducts[id] || [];

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState(new Set());
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: prev[product.id] ? { ...prev[product.id], qty: prev[product.id].qty + 1 } : { ...product, qty: 1 }
    }));
    showToast(`${product.name} added to cart!`);
    setShowCart(true);
  };

  const updateCartQty = (id, qty) => {
    if (qty <= 0) {
      const { [id]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart(prev => ({ ...prev, [id]: { ...prev[id], qty } }));
    }
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const brands = [...new Set(products.map(p => p.brand))];

  const filteredProducts = products
    .filter(p =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())) &&
      (selectedBrand === "all" || p.brand === selectedBrand) &&
      (p.price >= priceRange[0] && p.price <= priceRange[1])
    )
    .sort((a, b) => {
      switch (sort) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "newest": return b.id - a.id;
        case "discount": return (b.discount || 0) - (a.discount || 0);
        default: return b.rating - a.rating;
      }
    });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const cartTotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white">
      <Header cartItemCount={cartItemCount} wishlist={wishlist} setShowCart={setShowCart} />
      <HeroSection category={id} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <SearchFilters
          search={search} setSearch={setSearch}
          selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
          priceRange={priceRange} setPriceRange={setPriceRange}
          sort={sort} setSort={setSort}
          viewMode={viewMode} setViewMode={setViewMode}
          brands={brands} showFilters={showFilters} setShowFilters={setShowFilters}
          formatPrice={formatPrice}
        />

        <ProductList
          products={currentProducts}
          viewMode={viewMode}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
          formatPrice={formatPrice}
        />

        {totalPages > 1 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        updateCartQty={updateCartQty}
        cartTotal={cartTotal}
        formatPrice={formatPrice}
      />

      {/* Toast Notification */}
      {toast && <Toast toast={toast} />}
    </div>
  );
}
