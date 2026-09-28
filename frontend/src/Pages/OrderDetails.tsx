import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import Layout from '../Components/layout';
import api from '../Services/api';
import { getImageUrl } from '../Services/productService';

interface OrderItem {
    order_item_id: number;
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    subtotal: number;
    image_url?: string;
    sku?: string;
}

interface Order {
    order_id: number;
    order_number: string;
    user_id: number;
    total_amount: number;
    status: string;
    payment_method: string;
    shipping_address: string;
    created_at: string;
    updated_at: string;
    username?: string;
    email?: string;
    items: OrderItem[];
}

const OrderDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) {
                setError('No order ID provided');
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/orders/${id}`);
                setOrder(response.data.data);
            } catch (err: any) {
                console.error('Failed to fetch order:', err);
                setError(err.response?.data?.message || 'Failed to load order');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'shipped':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'processing':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <FaCheckCircle />;
            case 'shipped':
                return <FaTruck />;
            case 'cancelled':
                return <FaTimesCircle />;
            case 'processing':
                return <FaBox />;
            default:
                return <FaClock />;
        }
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

    
    if (error || !order) {
        return (
            <Layout>
                <div className="max-w-3xl mx-auto py-20 px-4 text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-blue-shade mb-4">
                        {error || 'Order not found'}
                    </h2>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/my-orders')}
                            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                        >
                            Back to My Orders
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="border border-pink-500 text-pink-500 px-6 py-2 rounded-lg hover:bg-pink-50"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    
    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-8 px-4">
               
                <button
                    onClick={() => navigate(-1)}
                    className="text-pink-500 hover:underline mb-4 flex items-center gap-2"
                >
                    ← Back
                </button>

                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-blue-shade">
                                Order #{order.order_number}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Placed on {formatDate(order.created_at)}
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border-2 flex items-center gap-2 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                        </span>
                    </div>

                  
                    {order.username && (
                        <div className="border-t pt-4 mt-4">
                            <p className="text-xs text-gray-500 uppercase mb-1">Customer</p>
                            <p className="font-medium">{order.username}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                    )}
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <FaTruck className="text-pink-500" />
                            Shipping Address
                        </h3>
                        <p className="text-gray-800 leading-relaxed">
                            {order.shipping_address || 'No address provided'}
                        </p>
                    </div>

                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <FaBox className="text-pink-500" />
                            Payment Method
                        </h3>
                        <p className="text-gray-800 capitalize">
                            {order.payment_method || 'N/A'}
                        </p>
                    </div>
                </div>

                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-blue-shade mb-4">
                        Order Items ({order.items?.length || 0})
                    </h2>

                    <div className="space-y-3">
                        {order.items?.map((item) => (
                            <div
                                key={item.order_item_id}
                                className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                
                                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                    {item.image_url ? (
                                        <img
                                            src={getImageUrl(item.image_url)}
                                            alt={item.product_name}
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                            }}
                                        />
                                    ) : (
                                        <FaBox className="text-gray-400 text-2xl" />
                                    )}
                                </div>

                                
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">
                                        {item.product_name}
                                    </p>
                                    {item.sku && (
                                        <p className="text-xs text-gray-500">
                                            SKU: {item.sku}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                        Qty: {item.quantity} × ${formatPrice(item.product_price)}
                                    </p>
                                </div>

                               
                                <p className="font-bold text-pink-500">
                                    ${formatPrice(item.subtotal)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-2 max-w-md ml-auto">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${formatPrice(order.total_amount)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between items-center">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-bold text-pink-500">
                                ${formatPrice(order.total_amount)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderDetails;