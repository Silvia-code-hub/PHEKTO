import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../Services/api';

const OrderComplete: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, cartTotal, refreshCart } = useCart();

    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderPlaced, setOrderPlaced] = useState<any>(null);

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!user) {
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return;
        }

        if (!shippingAddress.trim()) {
            setError('Shipping address is required');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/orders', {
                user_id: user.user_id,
                payment_method: paymentMethod,
                shipping_address: shippingAddress
            });

            setOrderPlaced(response.data.data);
            await refreshCart();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    // ============================================
    // SUCCESS SCREEN (after order is placed)
    // ============================================
    if (orderPlaced) {
        return (
            <Layout>
                <div className="max-w-3xl mx-auto py-16 px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-blue-shade mb-2">
                        Your Order Is Completed!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your order! Your order is being processed and will be
                        delivered soon. You will receive an email confirmation.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                        <h2 className="font-bold mb-4">Order Summary</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Order Number</p>
                                <p className="font-semibold">{orderPlaced.order.order_number}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Total Amount</p>
                                <p className="font-semibold text-pink-500">
                                    ${formatPrice(orderPlaced.order.total_amount)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Status</p>
                                <p className="font-semibold capitalize">{orderPlaced.order.status}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Payment</p>
                                <p className="font-semibold capitalize">{orderPlaced.order.payment_method}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/my-orders')}
                            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
                        >
                            View My Orders
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-50"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    // ============================================
    // CHECKOUT FORM (before order is placed)
    // ============================================
    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-blue-shade mb-6">Checkout</h1>

                {error && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-gray-500 mb-4">Your cart is empty</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-pink-500 text-white px-6 py-2 rounded-lg"
                        >
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Shipping Address *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        placeholder="Street address, city, postal code, country..."
                                        className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                                    />
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    {[
                                        { value: 'cash', label: '💵 Cash on Delivery' },
                                        { value: 'credit_card', label: '💳 Credit Card' },
                                        { value: 'mpesa', label: '📱 M-Pesa' },
                                        { value: 'paypal', label: '🅿️ PayPal' }
                                    ].map((method) => (
                                        <label key={method.value} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value={method.value}
                                                checked={paymentMethod === method.value}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="text-pink-500"
                                            />
                                            <span>{method.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.cart_id} className="flex justify-between text-sm">
                                            <span className="flex-1 truncate mr-2">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span>${formatPrice(parseFloat(String(item.price)) * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-3 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-pink-500">${formatPrice(cartTotal)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-6 w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </Layout>
    );
};

export default OrderComplete;