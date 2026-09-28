import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../Services/api';

interface DashboardStats {
    stats: {
        totalUsers: number;
        totalVendors: number;
        totalProducts: number;
        totalOrders: number;
        totalRevenue: number;
    };
    recentOrders: any[];
    recentUsers: any[];
}

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('/admin/stats');
                setData(response.data.data);
            } catch (err) {
                setError('Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

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

    if (!data) return null;

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-blue-shade mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 mb-6">Welcome back, {user?.username}!</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold">{data.stats.totalUsers}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                    <p className="text-gray-500 text-sm">Vendors</p>
                    <p className="text-2xl font-bold">{data.stats.totalVendors}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                    <p className="text-gray-500 text-sm">Products</p>
                    <p className="text-2xl font-bold">{data.stats.totalProducts}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
                    <p className="text-gray-500 text-sm">Orders</p>
                    <p className="text-2xl font-bold">{data.stats.totalOrders}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-pink-500">
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <p className="text-2xl font-bold">${data.stats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="text-3xl mb-2">👥</div>
                    <h3 className="font-semibold text-lg">Manage Users</h3>
                    <p className="text-gray-500 text-sm">View, edit, and manage user accounts</p>
                </Link>
                <Link to="/admin/products" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="text-3xl mb-2">📦</div>
                    <h3 className="font-semibold text-lg">All Products</h3>
                    <p className="text-gray-500 text-sm">Manage all products from all vendors</p>
                </Link>
                <Link to="/admin/orders" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="text-3xl mb-2">📋</div>
                    <h3 className="font-semibold text-lg">All Orders</h3>
                    <p className="text-gray-500 text-sm">View and manage all customer orders</p>
                </Link>
                <Link to="/admin/vendors" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="text-3xl mb-2">🛒</div>
                    <h3 className="font-semibold text-lg">Vendors</h3>
                    <p className="text-gray-500 text-sm">Manage vendor accounts and products</p>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
                    {data.recentOrders.length === 0 ? (
                        <p className="text-gray-500">No recent orders</p>
                    ) : (
                        <div className="space-y-3">
                            {data.recentOrders.map((order) => (
                                <div key={order.order_id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="font-medium">{order.username}</p>
                                        <p className="text-sm text-gray-500">${order.total_amount}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Users</h3>
                    {data.recentUsers.length === 0 ? (
                        <p className="text-gray-500">No recent users</p>
                    ) : (
                        <div className="space-y-3">
                            {data.recentUsers.map((user) => (
                                <div key={user.user_id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="font-medium">{user.username}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        user.user_type === 'admin' ? 'bg-purple-100 text-purple-800' :
                                        user.user_type === 'vendor' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.user_type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;