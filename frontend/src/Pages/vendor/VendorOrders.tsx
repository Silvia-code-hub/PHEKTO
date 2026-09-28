import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../Services/api';

interface OrderItem {
    order_item_id: number;
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    subtotal: number;
    image_url: string;
}

interface VendorOrder {
    order_id: number;
    order_number: string;
    total_amount: number;
    vendor_total: number;
    status: string;
    payment_method: string;
    shipping_address: string;
    created_at: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    items: OrderItem[];
}

const VendorOrders: React.FC = () => {
    const [orders, setOrders] = useState<VendorOrder[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<VendorOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/vendor/orders');
                setOrders(response.data.data);
                setFilteredOrders(response.data.data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        if (statusFilter === 'all') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(o => o.status === statusFilter));
        }
    }, [statusFilter, orders]);

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const handleStatusUpdate = async (orderId: number, newStatus: string) => {
        if (!window.confirm(`Mark this order as ${newStatus}?`)) return;
        
        try {
            await api.put(`/vendor/orders/${orderId}/status`, { status: newStatus });
            setOrders(orders.map(o => 
                o.order_id === orderId ? { ...o, status: newStatus } : o
            ));
            alert('Order status updated!');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to update status');
        }
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
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-blue-shade mb-2">Vendor Orders</h1>
                <p className="text-gray-500">View and manage orders containing your products</p>
            </div>

            
            <div className="flex gap-3 mb-6 flex-wrap">
                {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                            statusFilter === status
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-500">No orders found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.order_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Order Header */}
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
                                            ${formatPrice(order.vendor_total)}
                                        </p>
                                        <p className="text-xs text-gray-500">Your items total</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <button
                                        onClick={() => setExpandedOrder(expandedOrder === order.order_id ? null : order.order_id)}
                                        className="text-pink-500 hover:underline text-sm"
                                    >
                                        {expandedOrder === order.order_id ? 'Hide Details ▲' : 'View Details ▼'}
                                    </button>
                                </div>
                            </div>

                            
                            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Customer</p>
                                    <p className="font-medium">{order.customer_name}</p>
                                    <p className="text-sm text-gray-500">{order.customer_email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Items</p>
                                    <p className="font-medium">{order.items.length} item(s)</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Payment</p>
                                    <p className="font-medium capitalize">{order.payment_method || 'N/A'}</p>
                                </div>
                            </div>

                           
                            {expandedOrder === order.order_id && (
                                <div className="p-4 border-t bg-gray-50">
                                    
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 uppercase mb-1">Shipping Address</p>
                                        <p className="text-sm">{order.shipping_address}</p>
                                        <p className="text-sm text-gray-500">Phone: {order.customer_phone}</p>
                                    </div>

                                    
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 uppercase mb-2">Items to Fulfill</p>
                                        <div className="space-y-2">
                                            {order.items.map(item => (
                                                <div key={item.order_item_id} className="flex items-center gap-3 bg-white p-3 rounded border">
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.product_name}
                                                        className="w-12 h-12 object-cover rounded"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                                        }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm">{item.product_name}</p>
                                                        <p className="text-xs text-gray-500">
                                                            Qty: {item.quantity} × ${formatPrice(item.product_price)}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold">${formatPrice(item.subtotal)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    
                                    <div className="flex gap-2 flex-wrap">
                                        {order.status === 'pending' && (
                                            <button
                                                onClick={() => handleStatusUpdate(order.order_id, 'processing')}
                                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm"
                                            >
                                                Start Processing
                                            </button>
                                        )}
                                        {order.status === 'processing' && (
                                            <button
                                                onClick={() => handleStatusUpdate(order.order_id, 'shipped')}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                                            >
                                                Mark as Shipped
                                            </button>
                                        )}
                                        {order.status === 'shipped' && (
                                            <p className="text-sm text-gray-500 italic">
                                                ✅ Shipped - waiting for delivery confirmation by customer
                                            </p>
                                        )}
                                        {order.status === 'delivered' && (
                                            <p className="text-sm text-green-600">✅ Order delivered</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
                Total: {filteredOrders.length} order(s) found
            </div>
        </div>
    );
};

export default VendorOrders;