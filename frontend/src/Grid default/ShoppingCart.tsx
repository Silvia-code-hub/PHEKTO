import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Layout from '../Components/layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getImageUrl } from '../Services/productService';

const ShoppingCart: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, cartTotal, updateQuantity, removeItem, clearCart, loading } = useCart();

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-blue-shade mb-6">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-gray-500 mb-4">Your cart is empty</p>
                        <Link
                            to="/products"
                            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.cart_id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={getImageUrl(item.image_url)}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-blue-shade">{item.name}</h3>
                                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                                        <p className="text-pink-500 font-bold mt-2">
                                            ${formatPrice(item.price)}
                                        </p>
                                    </div>

                                    <div className="flex flex-col justify-between items-end">
                                        <button
                                            onClick={() => removeItem(item.cart_id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>

                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => updateQuantity(item.cart_id, Math.max(1, item.quantity - 1))}
                                                className="px-2 py-1 hover:bg-gray-100"
                                            >
                                                <FaMinus size={10} />
                                            </button>
                                            <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                            >
                                                <FaPlus size={10} />
                                            </button>
                                        </div>

                                        <p className="text-sm font-semibold">
                                            ${formatPrice(parseFloat(String(item.price)) * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-red-500 hover:underline text-sm"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span>Items ({cartItems.length})</span>
                                        <span>${formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-pink-500">${formatPrice(cartTotal)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!user) {
                                            navigate('/login');
                                            return;
                                        }
                                        navigate('/order-complete');
                                    }}
                                    className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 font-medium"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ShoppingCart;