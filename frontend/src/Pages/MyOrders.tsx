import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../Services/api';

interface OrderItem {
    order_item_id: number;
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    subtotal: number;
    image_url?: string;
}

interface Order {
    order_id: number;
    order_number: string;
    total_amount: number;
    status: string;
    payment_method: string;
    shipping_address: string;
    created_at: string;
    items: OrderItem[];
}

const MyOrders: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            
            try {
                setLoading(true);
                
                const response = await api.get(`/orders/user/${user.user_id}`);
                setOrders(response.data.data || []);
            } catch (err: any) {
                console.error('Failed to fetch orders:', err);
                setError(err.response?.data?.error || 'Failed to load your orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-purple-100 text-purple-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-blue-shade mb-2">My Orders</h1>
            <p className="text-gray-500 mb-6">View your purchase history</p>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-6xl mb-4">🛍️</div>
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                    <Link
                        to="/products"
                        className="inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.order_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            
                            <div className="p-4 border-b bg-gray-50">
                                <div className="flex justify-between items-center flex-wrap gap-4">
                                    <div>
                                        <p className="font-bold text-lg">#{order.order_number}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-pink-500">
                                            ${formatPrice(order.total_amount)}
                                        </p>
                                        <p className="text-xs text-gray-500">{order.items?.length || 0} item(s)</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <div className="flex gap-3 items-center">
                                        <Link
                                            to={`/order-details/${order.order_id}`}
                                            className="text-pink-500 hover:underline text-sm font-medium"
                                        >
                                            Full Details →
                                        </Link>
                                        <button
                                            onClick={() => setExpandedOrder(expandedOrder === order.order_id ? null : order.order_id)}
                                            className="text-gray-500 hover:underline text-sm"
                                        >
                                            {expandedOrder === order.order_id ? 'Hide ▲' : 'Show ▼'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            
                            {expandedOrder === order.order_id && (
                                <div className="p-4">
                                  
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 uppercase mb-2">Items</p>
                                        <div className="space-y-2">
                                            {order.items?.map((item) => (
                                                <div key={item.order_item_id} className="flex items-center gap-3 p-2 border rounded">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm">{item.product_name}</p>
                                                        <p className="text-xs text-gray-500">
                                                            Qty: {item.quantity} × ${formatPrice(item.product_price)}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-sm">${formatPrice(item.subtotal)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-1">Shipping Address</p>
                                            <p>{order.shipping_address || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-1">Payment Method</p>
                                            <p className="capitalize">{order.payment_method || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;