import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../Services/api';

interface Vendor {
    user_id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    product_count: number;
    created_at: string;
    is_verified: boolean;
}

const AdminVendors: React.FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await api.get('/admin/vendors');
                setVendors(response.data.data);
            } catch (err) {
                console.error('Failed to load vendors:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-blue-shade mb-6">Vendor Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                    <div key={vendor.user_id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">{vendor.username}</h3>
                                <p className="text-gray-500 text-sm">{vendor.email}</p>
                                <p className="text-gray-500 text-sm">{vendor.first_name} {vendor.last_name}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                vendor.is_verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {vendor.is_verified ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Products</p>
                                <p className="font-bold">{vendor.product_count}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Joined</p>
                                <p className="text-sm">{new Date(vendor.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link
                                to={`/admin/vendors/${vendor.user_id}`}
                                className="block w-full text-center bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminVendors;