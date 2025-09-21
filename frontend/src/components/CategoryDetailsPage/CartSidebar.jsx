import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart, X, Plus, Minus, ChevronDown, ChevronUp, Trash2, ShoppingBag, CreditCard } from "lucide-react";

// ================= CART SIDEBAR =================
export const CartSidebar = ({ showCart, setShowCart, cart, updateCartQty, removeFromCart, cartTotal, formatPrice }) => {
    const [visible, setVisible] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [animatingItem, setAnimatingItem] = useState(null);
    const autoMinimizeTimer = useRef(null);
    const restoreTimer = useRef(null);

    // Auto-minimize after 3 seconds of inactivity
    useEffect(() => {
        if (showCart && visible && !minimized && !isHovered) {
            autoMinimizeTimer.current = setTimeout(() => {
                setMinimized(true);
            }, 3000);
        }

        return () => {
            if (autoMinimizeTimer.current) {
                clearTimeout(autoMinimizeTimer.current);
            }
        };
    }, [showCart, visible, minimized, isHovered]);

    useEffect(() => {
        if (showCart) {
            setVisible(true);
            setMinimized(false);
        }
    }, [showCart]);

    const handleMinimize = () => {
        setMinimized(true);
        if (autoMinimizeTimer.current) {
            clearTimeout(autoMinimizeTimer.current);
        }
    };

    const handleRestore = () => {
        setMinimized(false);
        if (restoreTimer.current) {
            clearTimeout(restoreTimer.current);
        }
    };

    const handleClose = () => {
        setVisible(false);
        setMinimized(false);
        setShowCart(false);
        if (autoMinimizeTimer.current) {
            clearTimeout(autoMinimizeTimer.current);
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (autoMinimizeTimer.current) {
            clearTimeout(autoMinimizeTimer.current);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleRemoveItem = (itemId) => {
        setAnimatingItem(itemId);
        setTimeout(() => {
            removeFromCart(itemId);
            setAnimatingItem(null);
        }, 300);
    };

    const handleQuantityChange = (itemId, newQty) => {
        if (newQty <= 0) {
            handleRemoveItem(itemId);
        } else {
            updateCartQty(itemId, newQty);
        }
    };

    const cartItemCount = Object.keys(cart).length;
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

    return (
        <div
            className={`fixed top-0 right-0 h-full ${minimized ? "w-20" : "w-96"
                } bg-gray-900/95 ${minimized ? "" : "backdrop-blur-md"} border-l border-gray-800 transform transition-all duration-300 ease-in-out z-50 ${visible ? "translate-x-0" : "translate-x-full"
                }`}

            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    {!minimized && <h2 className="text-xl font-bold text-white">Your Cart</h2>}
                    <div className="flex items-center gap-2">
                        {!minimized && (
                            <button
                                onClick={handleMinimize}
                                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                                title="Minimize cart"
                            >
                                <ChevronDown size={20} className="text-gray-300" />
                            </button>
                        )}
                        {minimized && (
                            <button
                                onClick={handleRestore}
                                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                                title="Restore cart"
                            >
                                <ChevronUp size={20} className="text-gray-300" />
                            </button>
                        )}
                        <button
                            onClick={handleClose}
                            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                            title="Close cart"
                        >
                            <X size={20} className="text-gray-300" />
                        </button>
                    </div>
                </div>

                {/* Full Cart View */}
                {!minimized && (
                    <>
                        {/* Cart Summary */}
                        <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Items: {totalItems}</span>
                                <span className="text-lg font-bold text-white">{formatPrice(cartTotal)}</span>
                            </div>
                            {cartItemCount > 0 && (
                                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${Math.min((cartTotal / 1000) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {cartItemCount === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag size={48} className="text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
                                    <p className="text-gray-500 text-sm">Add some items to get started</p>
                                </div>
                            ) : (
                                Object.values(cart).map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex gap-4 items-center bg-gray-800/50 rounded-xl p-3 transition-all duration-300 ${animatingItem === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                                            } hover:bg-gray-800/70 group`}
                                    >
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                            {item.qty > 1 && (
                                                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {item.qty}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white truncate" title={item.name}>
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-400">{formatPrice(item.price)} each</p>

                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                                                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                                                        title="Decrease quantity"
                                                    >
                                                        <Minus size={12} className="text-gray-300" />
                                                    </button>
                                                    <span className="text-white font-medium w-8 text-center">{item.qty}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                                                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                                                        title="Increase quantity"
                                                    >
                                                        <Plus size={12} className="text-gray-300" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <span className="font-bold text-white">{formatPrice(item.price * item.qty)}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Checkout Section */}
                        {cartItemCount > 0 && (
                            <div className="mt-6 border-t border-gray-800 pt-4 space-y-3">
                                <div className="flex justify-between items-center text-lg font-bold text-white">
                                    <span>Total:</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>

                                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25">
                                    <CreditCard size={20} />
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={() => {
                                        Object.keys(cart).forEach(id => removeFromCart(id));
                                    }}
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 rounded-xl transition-colors text-sm"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Minimized Sidebar */}
                {minimized && (
                    <div className="flex flex-col items-center space-y-4">
                        <div
                            className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-xl cursor-pointer hover:bg-gray-800/70 transition-colors group"
                            onClick={handleRestore}
                            title="Click to restore cart"
                        >
                            <div className="relative">
                                <ShoppingCart size={24} className="text-purple-400 group-hover:text-purple-300" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-400 mt-2 text-center">
                                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                            </span>
                            {cartTotal > 0 && (
                                <span className="text-xs font-bold text-purple-400">
                                    {formatPrice(cartTotal)}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Auto-minimize indicator */}
            {!minimized && !isHovered && visible && (
                <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                    Auto-minimizes in 3s
                </div>
            )}
        </div>
    );
};

// ================= ENHANCED TOAST =================
export const Toast = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!toast) return null;

    return (
        <div className="fixed bottom-6 right-6 px-4 py-3 rounded-xl text-white bg-purple-600 shadow-lg z-50 animate-fade border border-purple-500/20">
            <div className="flex items-center gap-2">
                <ShoppingCart size={16} />
                <span>{toast.message}</span>
                {onClose && (
                    <button onClick={onClose} className="ml-2 hover:bg-purple-500/30 rounded p-1">
                        <X size={14} />
                    </button>
                )}
            </div>
            <div className="w-full bg-purple-400/30 rounded-full h-1 mt-2">
                <div className="bg-purple-300 h-1 rounded-full animate-toast-progress"></div>
            </div>
        </div>
    );
};

